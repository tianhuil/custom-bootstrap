'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
// sourcemaps usage from
// https://blog.yipl.com.np/using-gulp-browser-sync-and-source-maps-ef14e0903982
var sourcemaps  = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function (err) {
        console.log(err.toString());
        browserSync.notify(err);
        this.emit('end');
    })
    .pipe(sourcemaps.write('./src/out/maps'))
    .pipe(gulp.dest('./src/out/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(["src/js/*.js"])
    .pipe(gulp.dest("src/out/js"))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);
