const gulp = require('gulp');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('copy-html',() => {
    gulp.src('./*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

gulp.task('copy-css',() => {
    gulp.src('./scss/**/*')
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task('copy-js',() => {
    gulp.src('./js/**/*')
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})

gulp.task('copy-data',() => {
    gulp.src('./data/**/*')
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload())
})

gulp.task('copy-outside',() => {
    gulp.src('./outside/**/*')
        .pipe(gulp.dest('dist/outside'))
        .pipe(connect.reload())
})

gulp.task('watch',() => {
    gulp.watch('./*.html',['copy-html'])
    gulp.watch('./scss/**/*',['copy-css'])
    gulp.watch('./js/**/*',['copy-js'])
    gulp.watch('./data/**/*',['copy-data'])
    gulp.watch('./outside/**/*',['copy-outside'])
})

gulp.task('build',['copy-html','copy-css','copy-js','copy-data','copy-outside'],() => {
    console.log('success');
})

gulp.task('server',() => {
    connect.server({
        host: "0.0.0.0",
        port: 8080,
        root:'dist',
        livereload:true
    })
})

gulp.task('default',['build','server','watch'])