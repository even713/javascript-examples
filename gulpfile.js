var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var critical = require('critical');
var criticalCss = require('gulp-critical-css');
var insert = require('gulp-insert');

gulp.task('connect', function() {
    connect.server({
        port: 8888
    });
});

// gulp.task('uila-table', function(){
// 	return gulp.src('examples/angular-datatable/src/*.js')
// 	    .pipe(concat('uila-datatable.js'))
// 	    .pipe(gulp.dest('examples/angular-datatable/dist/'))
//         .pipe(insert.wrap('{', '}'));
// })
gulp.task('uila-table-core', function(){
    return gulp.src([
        'examples/angular-datatable/src/UilaTableDirective.js',
        'examples/angular-datatable/src/UilaColumnDirective.js',
        'examples/angular-datatable/src/uilaDataTable.js'])
        .pipe(concat('uila-datatable.src.js'))
        .pipe(insert.wrap('{' + '\n', '\n' + '}'))        
        .pipe(gulp.dest('examples/angular-datatable/src/'));
})

gulp.task('uila-table-helpers', function(){
    return gulp.src(['examples/angular-datatable/src/uila-datatable.src.js',
        'examples/angular-datatable/src/UilaColumnFormatterDirective.js',
        'examples/angular-datatable/src/Helpers.js'])
        .pipe(concat('uila-datatable.js'))
        .pipe(gulp.dest('examples/angular-datatable/dist/'));
});

gulp.task('uila-table', ['uila-table-core', 'uila-table-helpers']);

gulp.task('critical', function (cb) {
    critical.generate({
        inline: true,
        base: 'examples/ford/',
        src: 'ford.html',
        dest: 'dist/ford-critical.html',
        minify: true,
        width: 1300,
        height: 900
    });
});

gulp.task('criticalThis', function(){
    gulp.src('examples/ford/critical.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('examples/ford/dist'))
});

gulp.task('default', ['connect']);
