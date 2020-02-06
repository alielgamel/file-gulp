var     gulp = require('gulp');
        connect = require('gulp-connect'),
        notify = require("gulp-notify"),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        zip = require('gulp-zip');


sass.compiler = require('node-sass');


// task connect

gulp.task('connect', function() {
    connect.server({
        name: 'Dist App',
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

// task html
gulp.task('pug', function () {
    return  gulp.src('project-file/pug/*.pug')
        .pipe(pug({pretty: false}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
        .pipe(notify("Task Pug Is Done"));
});

// task css

gulp.task('scss', function () {
    return gulp.src('project-file/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("Task Sass Is Done"))
        .pipe(connect.reload());
});

// Task Js

gulp.task('js', function () {

    return gulp.src('project-file/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
        .pipe(notify("Task Js Is Done"));
});

// Task Compressed

gulp.task('compressed', () => {

    return gulp.src('dist/**/*.*')
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('.'))
        .pipe(notify("Task Compress Is Done"));
});


// task watch

gulp.task('watch', function () {

    gulp.watch('project-file/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('project-file/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('project-file/js/*.js', gulp.series('js'));
    gulp.watch('dist/**/*.*', gulp.series('compressed'));
});

// gulp default

gulp.task('default', gulp.parallel('watch','connect'));
