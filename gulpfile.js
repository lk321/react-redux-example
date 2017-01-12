var gulp = require('gulp');
var gulpif = require('gulp-if');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglifyjs');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
    'react',
    'react-dom'
];

gulp.task('browserify-vendor', function() {
    return browserify()
        .require(dependencies)
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify({ mangle: false, outSourceMap: true })))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserify', ['browserify-vendor'], function() {
    return browserify({ entries: 'src/index.js', debug: true })
        .external(dependencies)
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify({ mangle: false, outSourceMap: true })))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('styles', function() {
    return gulp.src('src/stylesheets/bundle.scss')
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(gulpif(production, cssmin()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/stylesheets/*.scss'], ['styles']);
    gulp.watch(['./src/**/*.js', './src/index.js'], ['browserify']);
});

gulp.task('webserver', function() {
    connect.server({
        port: 8001,
        livereload: true,
        root: 'dist',
        middleware: function(connect, opt) {
            return [historyApiFallback({})];
        }
    });
});

gulp.task('default', ['styles', 'browserify', 'webserver', 'watch']);