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
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");

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

gulp.task("scripts", (done) => {
  gulp
    .src(["frontend/static/frontend/main.js"])
    .pipe(concat("bundle.main.js"))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest("frontend/static/frontend"));
  done();
});

gulp.task("watch", () => {
  gulp.watch("frontend/src/scss/**/*.scss", gulp.series(["sass"]));
  gulp.watch("frontend/static/frontend/main.js", gulp.series("scripts"));
});
