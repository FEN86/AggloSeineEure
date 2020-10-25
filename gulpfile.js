let {src, dest, series, parallel, watch} = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let fileinclude = require('gulp-file-include');
let del = require('del');
let scss = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let groupmedia = require('gulp-group-css-media-queries');
let cleancss = require('gulp-clean-css');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;
let svgsprite = require('gulp-svg-sprite');
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fonter = require('gulp-fonter');
let concat = require('gulp-concat');
let iconfontCss = require('gulp-iconfont-css');
let iconfont = require('gulp-iconfont');

let project_folder = 'dist';
let source_folder = 'src';

// Local Server
function browserSync() {
    browsersync.init({
        server:{
            baseDir: './' + source_folder + '/'
        },
        port: 3000,
        notify: false,
        online: true
    })
}

/*function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}*/

// Custom Styles
function styles() {
    return src(source_folder + '/scss/style.scss')
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(groupmedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true,
                grid: true
            })
        )
        .pipe(dest(source_folder + '/css/'))
        .pipe (cleancss(( { level: { 1: { specialComments: 0 } } } )))
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(source_folder + '/css/'))
        .pipe(browsersync.stream())
}

function cssLibs() {
    return src([
    ])
        .pipe(concat('_libs.scss'))
        .pipe(dest(source_folder + '/scss/'))
}

// Scripts & JS Libraries
function js() {
    return src([
        'node_modules/lazysizes/lazysizes.js',
        'node_modules/object-fit-images/dist/ofi.js',
        'node_modules/inputmask/dist/inputmask.js',
        'node_modules/just-validate/dist/js/just-validate.js',
        source_folder + '/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest(source_folder + '/js/'))
        .pipe(browsersync.stream())
}

// converting ttf to woff&woff2
function fonts() {
    src(source_folder + '/fonts/**/*.ttf')
        .pipe(ttf2woff())
        .pipe(dest(source_folder + '/fonts/'))
    return src(source_folder + '/fonts/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest(source_folder + '/fonts/'))
}

// converting otf to ttf
function otf2ttf() {
    return src([source_folder + '/fonts/!*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts'))
}

// create SVG Sprite
function svgSprite() {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg', // sprite file name
                    example: true // создает html файл с примерами иконок
                }
            }
        }))
        .pipe(dest(source_folder + '/images/'))
}

// converting SVG to icon fonts
let fontName = 'icons';
// add svg icons to the folder "icons" and use 'iconfont' task for generating icon font
function svg2iconfont() {
    return src(source_folder + '/icons/*.svg')
        .pipe(iconfontCss({
            // где будет наш scss файл
            targetPath: '../scss/_icons.scss',
            // пути подлючения шрифтов см. в _icons.scss
            fontPath: '../iconfonts/',
            fontName: fontName

        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        // куда выбрасываем нашу папку с шрифтами
        .pipe(dest(source_folder + '/iconfonts'))
}

function watchFiles() {
    watch([source_folder + '/js/**/*.js', '!' + source_folder + '/js/**/*.min.js'], js);
    watch(source_folder + '/scss/**/*.scss', styles);
    watch(source_folder + '/**/*.html').on('change', browsersync.reload)
}

function buildProject() {
    return src([
        source_folder + '/css/**/*.min.css',
        source_folder + '/js/**/*.min.js',
        source_folder + '/**/*.html', '!' + source_folder + '/_*.html',
        source_folder + '/iconfonts/**/*.{woff,eot,svg,ttf}',
        source_folder + '/fonts/**/*.{woff,woff2}',
        source_folder + '/images/**/*.{jpg,png,svg,gif,ico,webp,avif}',
    ], { base: source_folder })
        .pipe(dest(project_folder))
}

function clean() {
    return del('./' + project_folder + '/');
}

exports.clean = clean;
exports.fonts = fonts;
exports.styles = styles;
exports.js = js;
exports.otf2ttf = otf2ttf;
exports.svgSprite = svgSprite;
exports.svg2iconfont = svg2iconfont;
exports.browserSync = browserSync;
// exports.cssLibs = cssLibs;

exports.build = series(clean, fonts, styles, js, buildProject) ;
exports.default = series(fonts, styles, parallel(js, browserSync, watchFiles));