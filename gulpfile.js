const child             = require('child_process');
const browserSync       = require('browser-sync').create();

const gulp              = require('gulp');
const autoprefixer      = require('gulp-autoprefixer');
const concat            = require('gulp-concat');
const css_minify        = require('gulp-cssnano');
const gutil             = require('gulp-util');
const scss              = require('gulp-sass');
var header              = require('gulp-header');
var cleanCSS            = require('gulp-clean-css');
var rename              = require("gulp-rename");
var uglify              = require('gulp-uglify');
var imagemin            = require('gulp-imagemin');
var del                 = require('del');
var pkg                 = require('./package.json');

const siteRoot          = '_site';
const cssFiles          = '_assets/sass/**/*.?(s)css';

// Set the banner content
var banner = ['/*!\n',
    ' * Code Bee - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');


// Deletes CSS.
gulp.task('clean:css', function(callback) {
    del(['_assets/css/main.css',
        'css/main.min.css'
    ]);
    callback();
});

// Deletes js.
gulp.task('clean:js', function(callback) {
    del(['_assets/js/*.js',
        'js/*.js'
    ]);
    callback();
});

// Deletes vendor folder.
gulp.task('clean:vendor', function(callback) {
    del('vendor');
    callback();
});

// Deletes vendor folder.
gulp.task('clean:site', function(callback) {
    del('_site');
    callback();
});

// Compile SCSS files from /_sass into /css
gulp.task('sass', function() {
    return gulp.src('_assets/sass/main.scss')
        .pipe(scss())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('_assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// // Optimizes jpg.
// gulp.task('build:jpg', function() {
//     return gulp.src('img/*.jpg')
//     .pipe(imagemin({ progressive: true }))
//     .pipe(gulp.dest('images'));
// });

// // Optimizes png.
// gulp.task('build:png', function() {
//     return gulp.src('img/*.png')
//     .pipe(imagemin({ progressive: true }))
//     .pipe(gulp.dest('images'));
// });

// // Optimizes postimg png.
// gulp.task('build:postpng', function() {
//     return gulp.src('img/posts/*.png')
//     .pipe(imagemin({ progressive: true }))
//     .pipe(gulp.dest('images/posts'));
// });

// // Optimizes postimg png.
// gulp.task('build:postjpg', function() {
//     return gulp.src('img/posts/*.jpg')
//     .pipe(imagemin({ progressive: true }))
//     .pipe(gulp.dest('images/posts'));
// });

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('_assets/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('_assets/js/main.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Build the Jekyll Site
gulp.task('build', () => {
  const jekyll = child.spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--incremental', '--drafts']);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

//Reload Browser
gulp.task('reload', () => {
  browserSync.reload();
});

//Serve Jekyll Site
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    notify: false,
    open: false,
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['sass']);
});

// cleans all.
gulp.task('clean:all', ['clean:css', 'clean:js', 'clean:vendor', 'clean:site']);

// minifies all.
gulp.task('clean:all', ['clean:css', 'clean:js', 'clean:vendor', 'clean:site']);

//Default task for dev
gulp.task('default', [ 'clean:all', 'sass', 'minify-css', 'minify-js', 'copy', 'build', 'serve', 'reload']);