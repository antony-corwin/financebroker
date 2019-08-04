const gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    rigger = require('gulp-rigger'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    svgo = require('gulp-svgo'),
    svgSprite = require('gulp-svg-sprite'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();


const path = {
    build: {
        html: './build/',
        css: './build/css/',
        js: './build/js/',
        fonts: './build/fonts/',
        images: './build/img/',
        spritesvg: './build/img/'
    },
    src: {
        html: './src/pug/*.pug',
        sass: ['./src/sass/vendor.sass', './src/sass/main.sass'],
        js: './src/js/main.js',
        js_vendor: './src/js/vendor.js',
        fonts: './src/fonts/**/*.*',
        images: ['./src/img/**/*.*', './src/img/**/*.svg', '!./src/img/sprite/**/*.*'],
        spritesvg: './src/img/sprite/svg/*.svg',
    },
    watch: {
        html: ['./src/pug/**/*.*'],
        js: ['./src/js/custom/*.js'],
        js_vendor: ['./src/js/vendor.js', './src/js/vendor/*.js'],
        sass: ['./src/sass/main.sass', './src/sass/custom/**/*.sass'],
        sass_vendor: ['./src/sass/vendor.sass', './src/sass/vendor/**/*.sass', './src/sass/vendor/**/*.css'],
        images: ['./src/img/**/*.*'],
        fonts: ['./src/fonts/**/*.*'],
        spritesvg: ['./src/img/sprite/svg/*.svg']
      },
    clean: {}
}


//HTML build===============================================>

const compile_html = () => {
    return gulp.src(path.src.html)
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest(path.build.html))
            .pipe(browserSync.stream());
} 

gulp.task('html:build', compile_html);
//SASS build==============================================>

const compile_sass = () => {
    return gulp.src(path.src.sass)
            .pipe(sass())
            .pipe(concat('main.css'))
            .pipe(autoprefixer())
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream());
}

gulp.task('sass:build', compile_sass);

//JS build==========================================>

const compile_js = () => {
    return gulp.src(path.src.js)
            .pipe(rigger())
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify({
                mangle: false
            }))
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.stream());
}

gulp.task('js:build', compile_js);


//JS vendor build==========================================>

const compile_js_vendor = () => {
    return gulp.src(path.src.js_vendor)
            .pipe(rigger())
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify({
                mangle: false
            }))
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.stream());
}

gulp.task('js_vendor:build', compile_js_vendor);


//IMAGES build==========================================>

const compile_images = () => {
    return gulp.src(path.src.images)
            .pipe(svgo())
            .pipe(gulp.dest(path.build.images))
            .pipe(browserSync.stream());
}

gulp.task('images:build', compile_images);


//SVG build==========================================>

const compile_svg = () => {
    return gulp.src(path.src.spritesvg)
            .pipe(svgo())
            .pipe(svgSprite({
                'mode': {
                    'symbol': {
                      'dimentions': true,
                      'sprite': '../sprite-inline.svg',
                      'bust': false,
                      example: false
                    }
                }
            }))
            .pipe(gulp.dest(path.build.spritesvg));
}

gulp.task('sprite-svg:build', compile_svg)


//OTHER build==========================================

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts));
})


//Files watching

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./build",
            index: 'index.html'
        },
        https: true,
        open: true,
        ghostMode: false,
    });

    watch(path.watch.html, compile_html);
    watch(path.watch.sass, compile_sass);
    watch(path.watch.sass_vendor, compile_sass);
    watch(path.watch.js, compile_js);
    watch(path.watch.js_vendor, compile_js_vendor);
    watch(path.watch.images, compile_images);
    watch(path.watch.spritesvg, compile_svg);
});



//========= Main command =========

gulp.task('build', gulp.series(
    'html:build',
    'sass:build',
    'js:build',
    'js_vendor:build', 
    'images:build', 
    'sprite-svg:build', 
    'fonts:build'
));

gulp.task('default', gulp.series('build', 'watch'));