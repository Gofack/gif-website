var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');

// process JS files and return the stream.
gulp.task('vendorJS', function () {
    return gulp.src([
                    './node_modules/jquery/dist/jquery.min.js',
                    ])
        .pipe(uglify())
        .pipe(concat({ path: 'vendor.min.js'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('mainJS', function () {
    return gulp.src([
                    './scripts/main.js',
                    ])
        .pipe(uglify())
        .pipe(concat({ path: 'main.min.js'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('allJS', ['vendorJS','mainJS'], function () {
    return gulp.src([
                    './dist/js/vendor.min.js',
                    './dist/js/main.min.js',
                    ])
        .pipe(uglify())
        .pipe(concat({ path: 'all.min.js'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', ['sass'], function(){
    return gulp.src([
                    './styles/layers-responsive.css',
                    './styles/layers.css',
                    './dist/css/all.min.css',
                    ])
    .pipe(minifyCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', function () {
  return gulp.src('./styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./dist/css'));
});


// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['allJS'], function (done) {
    browserSync.reload();
    done();
});

// create a task that ensures the `css` task is complete before
// reloading browsers
gulp.task('css-watch', ['styles'], function (done) {
    browserSync.reload();
    done();
});


// use default task to launch Browsersync and watch JS files
gulp.task('default', ['allJS','styles'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("scripts/*.js", ['js-watch']);
    gulp.watch("styles/sass/*.scss", ['css-watch']);
});