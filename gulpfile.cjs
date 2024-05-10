const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rollupStream = require('@rollup/stream')
const source = require( 'vinyl-source-stream' )
const buffer = require( 'vinyl-buffer' )
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const fs = require('fs')
const path = require('path')

let cache
const builds = [ 'mathsmentales', 'cartesflash', 'ceinture', 'courseauxnombres', 'dominos', 'duel', 'editor', 'exam', 'exercices', 'wall', 'puzzle' ]

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

async function bumpVersion(options) {
    const versionParts = packageJson.version.split('.');
  
    let major = parseInt(versionParts[0]);
    let minor = parseInt(versionParts[1]);
    let patch = parseInt(versionParts[2]);
  
    if (options.major) {
      major++;
      minor = 0;
      patch = 0;
    } else if (options.minor) {
      minor++;
      patch = 0;
    } else if (options.patch) {
      patch++;
    }
  
    const newVersion = `${major}.${minor}.${patch}`;
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
    console.log(`Version augmentée à ${newVersion}`);
  }  

async function build() {
  builds.map((module) => {
    return rollupStream({
      input: 'src/js/lib.' + module + '.js',
      cache: cache,
      output: { format: 'iife'}
    }).on('error', err => {
      console.log('Error : '+ err.message)
    }).on('bundle', bundle => {
      cache = bundle
    }).pipe( source('lib.' + module + '.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
  })
}

async function updateVersion() {
  builds.map(module => {
    let htmlPageName = module + '.html'
    if (module === 'mathsmentales') htmlPageName = 'index.html'
    const htmlPath = path.join(__dirname, './src/' + htmlPageName);
    const destPath = path.join(__dirname, './public/' + htmlPageName)
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    // js
    const regex = new RegExp('lib\\.' +module+ '\\.js\\?v=[\\d\\.]+')
    let updatedContent = htmlContent.replace(regex, `lib.${module}.js?v=${packageJson.version}`);
    // css - à mettre à jour pour autres modules
    if(htmlPageName === 'index.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/sprites.css"><link rel="stylesheet" href="css/knacss.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/mathsmentales.css" type="text/css" media="screen" />', '<link rel="stylesheet" href="css/mathsmentales.min.css?v='+packageJson.version+'" />')
    }
    console.log(htmlPageName + ' mis à jour')
    fs.writeFileSync(destPath, updatedContent, 'utf8');
  })
}

gulp.task('minify-css', () => {
  return gulp.src(['src/css/sprites.css', 'src/css/knacss.css','src/css/bulma-steps.css','src/css/mathsmentales.css'])
  .pipe(cleanCSS())
  .pipe(concat('mathsmentales.min.css'))
  .pipe(gulp.dest('./public/css/'))
})

gulp.task('bump-major', () => bumpVersion({ major: true }));
gulp.task('bump-minor', () => bumpVersion({ minor: true }));
gulp.task('bump-patch', () => bumpVersion({ patch: true }));

gulp.task('build', build);
gulp.task('update-version', updateVersion);
gulp.task('default', gulp.series('build', 'minify-css', 'bump-patch', 'update-version'));