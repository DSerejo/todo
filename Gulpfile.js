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
var scssFolder = './src/scss/*.scss';
var html = "./src/*.html";
var templates="./src/templates/*.html";
var vendor = [
    "./bower_components/angular/angular.js",
    "./bower_components/angular-route/angular-route.js",
    "./bower_components/angular-cookies/angular-cookies.js",
    "./bower_components/firebase/firebase.js",
    "./bower_components/angularfire/dist/angularfire.js",
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/bootstrap/dist/bootstrap.js"
    ];

var vendorCss=[
    "./bower_components/bootstrap/dist/css/bootstrap.css"
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
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {

    gulp.src(scssFolder)
        .pipe(sass())
        .pipe(gulp.dest('./build/css'));

    vendorCss.push('./build/css/*.css');
    gulp.src(vendorCss)
        .pipe(concat('./dist/css'))
        .pipe(rename('app.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'));
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

});

//Criamos uma tarefa 'default' que vai rodar quando rodamos `gulp` no projeto
gulp.task('watch', function () {
    gulp.watch(scssFolder, ['sass']);
    gulp.watch(html, ['html']);
    gulp.watch(scripts, ['script','lint']);

});
gulp.task('default', ['watch','html','script','lint']);
//gulp.task('default', function() {
//// Usamos o `gulp.run` para rodar as tarefas
//// E usamos o `gulp.watch` para o Gulp esperar mudanças nos arquivos para rodar novamente
//
////    gulp.run('lint', 'script','html','sass');
////    gulp.watch(scripts, function(evt) {
////        gulp.run('lint', 'script');
////    });
////    gulp.watch(html, function(evt) {
////        gulp.run('html');
////    });
////    gulp.watch('./scss/*.scss');
//});