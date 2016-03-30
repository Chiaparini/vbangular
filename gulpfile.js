var gulp 		= require('gulp')
  , gutil 		= require('gulp-util')
  , clean 		= require('gulp-clean')
  , copy		= require('gulp-copy')
  , watch		= require('gulp-watch')
  , uglify		= require('gulp-uglify')
  , compass		= require('gulp-compass')
  , minifyCSS	= require('gulp-minify-css')
  , cssPrefixer	= require('gulp-autoprefixer')
  , gif 		= require('gulp-if')
  , concat		= require('gulp-concat')
  , ngTemplate	= require('gulp-angular-templatecache')
  , runSequence = require('run-sequence')
  , vinylBuffer = require('vinyl-buffer')
  , vinylStream = require('vinyl-source-stream');


var bower_path = './bower_components/'
, npm_path = './node_modules/'
, src = {
	scss: './src/assets/scss/',
	js: './src/app/',
	img: './src/assets/img/'
}
, dest = {
	index: './dist/',
	css:   './dist/css/',
	js:    './dist/js/',
	img:   './dist/img/',
	fonts: './dist/fonts/'
};

var templates = [
	'src/views/*.html',
	'src/views/**/*.html'
];

var jsVendor = [
	bower_path + 'jquery/dist/jquery.js',
	bower_path + 'angular/angular.js',
	bower_path + 'angular-bootstrap/ui-bootstrap-tpls.js',
	bower_path + 'angular-route/angular-route.js',
	bower_path + 'angular-sanitize/angular-sanitize.js',
	bower_path + 'bootstrap/dist/js/bootstrap.js',
	bower_path + 'angular-ui-router/release/angular-ui-router.js',
];

var cssPath = [
	bower_path + 'angular-bootstrap/ui-bootstrap-csp.css',
	bower_path + 'bootstrap/dist/css/bootstrap.css',
];

var sassPath = [
	src.scss + '*.scss',
	src.scss + '**/*.scss',
	src.scss + '**/**/*.scss',
	src.scss + '**/**/*.scss'
];

var jsApp = [
	'src/app/app.js',
	'src/app/util/*.js',
	'src/app/config/*.js',
	'src/app/templates.js',
	'src/app/components/constants/*.js',
	'src/app/components/factories/*.js',
	'src/app/components/directives/*.js',
	'src/app/components/services/*.js',
	'src/app/components/controllers/*.js',
	'src/app/components/filters/*.js'
];

var indexFiles = [
	'src/index.html'
];

var minify = (0 <= process.argv.indexOf('--minify'))
  , clear  = (0 <= process.argv.indexOf('--clear'));

///////////
// TASKS //
///////////


gulp.task('default', function() {
	runSequence('setup', [
		'buildVendor', 'buildAngular'
	], [
		'sass'
	]);
});


gulp.task('watch', function() {
	//build vendor files
	gulp.watch(jsVendor, ['jsVendor']);

	//scss
	gulp.watch(sassPath, ['sass']);
	gulp.watch(src.scss + 'app.scss', ['sass']);

	//angular js
	gulp.watch(templates, ['templateCache']);
	gulp.watch(jsApp, ['buildAngular']);

});


/* Build Vendor
=============================================*/

gulp.task('cssVendor', function() {
	return gulp.src(cssPath)
		.pipe(concat('vendor.css'))
		.pipe(gif( minify, minifyCSS() ))
		.on('error', gutil.log)
		.pipe(gulp.dest(dest.css));
});

gulp.task('jsVendor', function() {
	return gulp.src(jsVendor)
		.pipe(concat('vendor.js'))
		.pipe(gif( minify, uglify() ))
		.on('error', gutil.log)
		.pipe(gulp.dest(dest.js));
});

gulp.task('buildVendor', ['jsVendor', 'cssVendor'], function() {});


/* Build Sass
=============================================*/

gulp.task('sass', function() {
	return gulp.src(src.scss + 'app.scss')
		.pipe(compass({
			css: dest.css,
			sass: src.scss,
			image: dest.css
		}))
		.pipe(cssPrefixer({
			browsers: ['last 3 versions', 'IE 10']
		}))
		.pipe(gif( minify, minifyCSS() ))
		.on('error', gutil.log)
		.pipe(gulp.dest(dest.css));
});



/* Setup Dist Directory
=============================================*/
gulp.task('copyIndex', function() {
	return gulp.src(indexFiles)
		.pipe(gulp.dest(dest.index));
});

gulp.task('clearDist', function() {
	return gulp.src('./dist/*', {read: false})
		.pipe(gif( clear, clean({force: true}) ));
});

gulp.task('setup', function() {
	runSequence('copyIndex');
});

/* Build Angular App
=============================================*/
gulp.task('jsApp', function(){
	return gulp.src(jsApp)
		.pipe(concat('app.js'))
		.pipe(gif( minify, uglify() ))
		.on('error', gutil.log)
		.pipe(gulp.dest(dest.js));
})

gulp.task('templateCache', function() {
	return gulp.src(templates)
		.pipe(ngTemplate({
			module: 'App'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('src/app/'));
});

gulp.task('buildAngular', ['jsApp', 'templateCache'],
 function() {});