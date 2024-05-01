const gulp = require('gulp')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const rollupStream = require('@rollup/stream')
const source = require( 'vinyl-source-stream' )
const buffer = require( 'vinyl-buffer' )
const fs = require('fs')
const path = require('path')

let cache
const builds = [ 'mathsmentales', 'cartesflash', 'ceinture', 'courseauxnombres', 'dominos', 'duel', 'editor', 'exam', 'exercices', 'wall' ]

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
      //this.emit('end')
    }).on('bundle', bundle => {
      cache = bundle
    }).pipe( source('bundle.' + module + '.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
  })
}

async function updateVersion() {  
  builds.map(module => {
    let htmlPageName = module + '.html'
    if (module === 'mathsmentales') htmlPageName = 'index.html'
    const htmlPath = path.join(__dirname, htmlPageName);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const regex = new RegExp('bundle\\.' +module+ '\\.js\\?v=[\\d\\.]+')
    const updatedContent = htmlContent.replace(regex, `bundle.${module}.js?v=${packageJson.version}`);
    console.log(htmlPageName + ' mis à jour')
    fs.writeFileSync(htmlPath, updatedContent, 'utf8');  
  })
}

gulp.task('bump-major', () => bumpVersion({ major: true }));
gulp.task('bump-minor', () => bumpVersion({ minor: true }));
gulp.task('bump-patch', () => bumpVersion({ patch: true }));

gulp.task('build', build);
gulp.task('update-version', updateVersion);
gulp.task('default', gulp.series('bump-patch', 'build', 'update-version'));