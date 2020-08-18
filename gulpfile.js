var gulp = require("gulp");
var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var useref = require("gulp-useref");
var concat = require("gulp-concat");
var sassGlob = require("gulp-sass-glob");
var cleanCSS = require("gulp-clean-css");
var wait = require("gulp-wait");

gulp.task("sass", function () {
  return gulp
    .src("frontend/src/scss/main.scss")
    .pipe(concat("styles.css"))
    .pipe(wait(1500))
    .pipe(sassGlob())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("frontend/src/css"));
});

gulp.task(
  "watch",
  gulp.series("sass", function () {
    gulp.watch("frontend/src/scss/**/*.scss", gulp.series(["sass"]));
    // Other watchers
  })
);
