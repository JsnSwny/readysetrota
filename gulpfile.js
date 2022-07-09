var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
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
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config

function devStyles() {}

gulp.task("sass", function () {
  const tailwindcss = require("tailwindcss");
  return gulp
    .src("frontend/src/scss/main.scss")
    .pipe(sassGlob())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(
      postcss([tailwindcss("./tailwind.config.js"), require("autoprefixer")])
    )
    .pipe(concat("styles.css"))
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
