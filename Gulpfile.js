/**
 * Created by dserejo on 1/21/2015.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss')

var scripts = "./src/js/*.js";
var scssFolder = './src/scss/*.css';
var html = "./src/*.html";
var templates="./src/templates/*.html";
var fonts = "./src/fonts/*.*";
var images = "./src/images/*.*";

var vendor = [
    "./bower_components/jquery/jquery.js",
    "./bower_components/jquery-ui/jquery-ui.js",
    "./bower_components/angular/angular.js",
    "./bower_components/angular-route/angular-route.js",
    "./bower_components/angular-cookies/angular-cookies.js",
    "./bower_components/firebase/firebase.js",
    "./bower_components/angularfire/dist/angularfire.js",
    "./bower_components/bootstrap/dist/js/bootstrap.js",
    "./bower_components/angular-bootstrap/ui-bootstrap.js",
    "./bower_components/bootstrap-timepicker/js/bootstrap-timepicker.js",
    "./bower_components/interact/interact.js",
    "./bower_components/angular-ui-date/src/date.js",
    "./bower_components/jquery-ui/jquery.ptTimeSelect.js",

    ];

var vendorCss=[

    "./bower_components/bootstrap/dist/css/bootstrap.css",
    "./bower_components/jquery-ui/themes/smoothness/jquery-ui.css",
    "./bower_components/bootstrap-timepicker/css/bootstrap-timepicker.css",
   "./bower_components/jquery-ui/jquery.ptTimeSelect.css",
];
//Aqui criamos uma nova tarefa através do ´gulp.task´ e damos a ela o nome 'lint'
gulp.task('lint', function() {

// Aqui carregamos os arquivos que a gente quer rodar as tarefas com o `gulp.src`
// E logo depois usamos o `pipe` para rodar a tarefa `jshint`
    gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Criamos outra tarefa com o nome 'dist'
gulp.task('script', function() {

// Carregamos os arquivos novamente
// E rodamos uma tarefa para concatenação
// Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
// E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build/
    vendor.push(scripts);
    gulp.src(vendor)
        .pipe(concat('./dist'))
        .pipe(rename('app.min.js'))
     //   .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {

    //gulp.src(scssFolder)
    //    .pipe(sass())
    //    .pipe(gulp.dest('./build/css'));


});

gulp.task('html', function() {

// Carregamos os arquivos novamente
// E rodamos uma tarefa para concatenação
// Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
// E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build/
    gulp.src(html)
        .pipe(gulp.dest('./dist'));
    gulp.src(templates)
        .pipe(gulp.dest('./dist/templates'));
    gulp.src(fonts)
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src(images)
        .pipe(gulp.dest('./dist/images'));
    vendorCss.push(scssFolder);
    gulp.src(vendorCss)
        .pipe(concat('./dist/css'))
        .pipe(rename('app.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'));

});

//Criamos uma tarefa 'default' que vai rodar quando rodamos `gulp` no projeto
gulp.task('watch', function () {
    //gulp.watch(scssFolder, ['html']);
    gulp.watch([html,templates,vendorCss,scssFolder], ['html']);
    gulp.watch(scripts, ['script','lint']);

});
gulp.task('default', ['watch','html','script','lint']);
