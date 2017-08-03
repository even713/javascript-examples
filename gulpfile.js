var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

gulp.task('connect', function() {
    connect.server({
        port: 8888
    });
});

gulp.task('uila-table', function(){
	return gulp.src('examples/angular-datatable/src/*.js')
	    .pipe(concat('uila-datatable.js'))
	    .pipe(gulp.dest('examples/angular-datatable/dist/'));
})

gulp.task('default', ['connect']);
