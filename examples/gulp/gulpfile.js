var gulp = require("gulp");
var minifyInline = require("gulp-minify-inline");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var usemin = require("gulp-usemin");

gulp.task('copy-my-file', function(){
	return gulp.src('webapp/src/js/*.js').pipe(gulp.dest('webapp/dist'));
})

gulp.task('minify-inline', function() {
  return gulp.src('webapp/src/index.html')
	    .pipe(minifyInline())
	    .pipe(gulp.dest('webapp/dist'))
});

gulp.task('concat-file', function(){
	return gulp.src('webapp/src/js/*.js')
		  .pipe(concat('all.js'))
		  .pipe(gulp.dest('webapp/dist/js'));
});

gulp.task('watch', function(){
	gulp.watch('webapp/src/js/*.js', ['concat-file']);
});

gulp.task('usemin-index', function () {
	  return gulp.src('webapp/src/index.html')
	      .pipe(usemin({
		    path: "webapp/",
		    jslib: ['concat'],
		    jsall: [uglify(), 'concat'],
	        cssplugin: [minifyCss(), 'concat'],
	        cssAll: [minifyCss(), 'concat']
	      }))
	      .pipe(gulp.dest('dist/'));
	});

//gulp.task('default', ['copy-my-file'])
//gulp.task('default', ['minify-inline']);
gulp.task('default', ['watch']);
//gulp.task('default', ['usemin-index'])

