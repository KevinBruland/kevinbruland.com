var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('tmp/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('tmp'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('tmp/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('tmp/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'tmp'
        },
    });
});

gulp.task('watch', ['browserSync', 'sass', 'html', 'js', 'images'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/images/**/*', ['images']);
});

/////////////////
//    BUILD    //
/////////////////

gulp.task('minify', ['sass'], function () {
    return gulp.src('tmp/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify', ['js'], function (cb) {
    pump([
        gulp.src('tmp/js/**/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
        cb
    );
});

gulp.task('b:html', ['html'], function () {
   return gulp.src('tmp/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('b:images', ['images'], function() {
    return gulp.src('tmp/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['minify', 'uglify', 'b:html', 'b:images']);