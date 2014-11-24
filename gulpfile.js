/* --------------------
// Commond
* Install gulp globally : sudo npm install -g gulp
* Install gulp : npm install --save gulp

* Generate Build Package : gulp generate-build
* Remove Build Package : gulp clean-build
-------------------- */




/* --------------------
// Require Gulp Plugins
-------------------- */
var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var minifyCSS 	= require('gulp-minify-css');
var concat 		= require('gulp-concat');
var less 		= require('gulp-less');
var imagemin 	= require('gulp-imagemin'); // This Package has a sub plugin following 'imagemin-pngquant'
var replace 	= require('gulp-replace-task');
var clean 		= require('gulp-clean');
// var livereload 	= require('gulp-livereload');
// var bowerSrc 	= require('gulp-bower-src');
// var plumber 	= require('gulp-plumber');
// var wait 		= require('gulp-wait')

var pngquant 	= require('imagemin-pngquant'); // This Package working with 'gulp-imagemin'
var runSequence = require('run-sequence');
// var path 		= require('path');


/* --------------------
// Build Destination
-------------------- */
var buildPath = 'buildPackage';






/* --------------------
// Copy Bower Components
-------------------- */
gulp.task('bowerComponents', function(){

	// Option One by using 'gulp-bower-src'
	/*bowerSrc()
	.pipe(gulp.dest(buildPath + 'vendors'));
	console.log('bowerComponents Copied');*/
	
	// Option Two by using Gulp native method
	gulp.src('./bower_components/**')
	.pipe(gulp.dest(buildPath + '/vendors'));
	console.log('bowerComponents Copied by native method');

});


/* --------------------
// Compress and Copy Images
-------------------- */
gulp.task('compress-images', function(){
	
	// Option Two by using Gulp native method
	gulp.src('./assets/images/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(buildPath + '/assets/images'));
		console.log('Images Copied by native method');

});


/* --------------------
// Scriptes Task
-------------------- */
// Uglifies
gulp.task('scripts', function(){

	// JS Files Path
	var jsPath = './assets/js/';

	// JS Files Orders
	var selectedJS = [
			jsPath + '_variables.js',
			jsPath + '_tools.js',  
			jsPath + '_functions.js'
	];

	gulp.src(selectedJS)

		// Concat & Compress Files
		.pipe(concat('core-script.js'))

		// Push to Build assets/js
		.pipe(gulp.dest('assets/js'))

		// Push to Build assets/js
		.pipe(uglify())
		.pipe(gulp.dest(buildPath + '/assets/js'));

		console.log('runs scripts');

});



/* --------------------
// LESS Compile Task
-------------------- */
gulp.task('compile-less', function(){

	gulp.src('./assets/less/core-style.less')

		 // Push to local assets/css 
		.pipe(less(
			{compress: false}
		))
		.pipe(gulp.dest('./assets/css'))

		// Push to Build assets/css
		.pipe(less(
			{compress: true}
		))
		.pipe(gulp.dest( buildPath + '/assets/css'));

		console.log('runs LESS Compile');

});


/* --------------------
// Style Task
-------------------- */
// Minifies
gulp.task('styles', function(){

	gulp.src('./assets/css/*.css')
		.pipe(concat('core-style.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(buildPath + '/assets/css'));
		console.log('runs styles');

});


/* --------------------
// HTML Task
-------------------- */
// Replace 
gulp.task('htmls', function(){

	gulp.src('./*.html')
		.pipe(replace({
			patterns: [
				{
					match: /bower_components\//g, // Replace bower package path to verdors in build
					replacement: 'vendors/'
				}
			]
		}))
		.pipe(gulp.dest(buildPath));
		console.log('runs HTMLs');
});


/* --------------------
// Watch Task
-------------------- */
// Watching JS files
gulp.task('watch', function(){
	gulp.watch('./assets/js/*.js',['scripts']);
	gulp.watch('./assets/less/*.less',['compile-less']);
	gulp.watch('./assets/css/*.css',['styles']);
	gulp.watch('./*.html',['htmls']);
});


/* --------------------
// Clean Build Package
-------------------- */
gulp.task('clean-build', function(){

	console.log(buildPath + ' Cleaned');
	return	gulp.src(buildPath, {read: false})
			.pipe(clean());

});


/* --------------------
// Build Package
-------------------- */
gulp.task('generate-build', function(callback){
	runSequence(
		'clean-build', 
		[
			'bowerComponents', 
			'scripts', 
			'compile-less', 
			'htmls', 
			'compress-images'
		], 
		callback
	);
	console.log(buildPath + ' Generated');
});


/* --------------------
// Gulp Execution
-------------------- */
gulp.task('default', function(){
	console.log('****************** GULP Detected ******************');
});

