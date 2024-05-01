const gulp = require('gulp')
//const rollup = require('rollup')
//const commonjs = require('@rollup/plugin-commonjs')
//const terser = require('@rollup/plugin-terser')
const rollupStream = require('@rollup/stream')
const source = require( 'vinyl-source-stream' )
const buffer = require( 'vinyl-buffer' )
const fs = require('fs')
const path = require('path')

let cache

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
  return rollupStream({
    input: 'src/js/lib.mathsmentales.js',
    cache: cache,
    output: { format: 'iife'}
  }).on('error', err => {
    console.log('Error : '+ err.message)
    //this.emit('end')
  }).on('bundle', bundle => {
    cache = bundle
  }).pipe( source('bundle.mathsmentales.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./js/'))
}

async function updateVersion() {
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const updatedContent = htmlContent.replace(/bundle\.mathsmentales\.js\?v=[\d\.]+/g, `bundle.mathsmentales.js?v=${packageJson.version}`);
  console.log('Index.html mis à jour', packageJson.version)

  fs.writeFileSync(htmlPath, updatedContent, 'utf8');
}

gulp.task('bump-major', () => bumpVersion({ major: true }));
gulp.task('bump-minor', () => bumpVersion({ minor: true }));
gulp.task('bump-patch', () => bumpVersion({ patch: true }));

gulp.task('build', build);
gulp.task('update-version', updateVersion);
gulp.task('default', gulp.series('bump-patch', 'build', 'update-version'));