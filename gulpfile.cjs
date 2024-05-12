const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rollupStream = require('@rollup/stream')
const source = require( 'vinyl-source-stream' )
const buffer = require( 'vinyl-buffer' )
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const fs = require('fs')
const path = require('path')
/*
à faire dans le terminal de VSC
lancer "gulp" pour une maj générale (modif d'un module touchant les autres, par exemple)
lancer "gulp maj-ceinture" lors d'une modif ne touchant que ceinture
lancer "gulp minify-js-ceinture" pour minifier uniquement le js de l'appli ceinture
lancer "gulp minify-css-ceinture" pour minifier uniquement le css de l'appli ceinture
lancer "gulp update-version-ceinture" pour modifier les version d'appel des fichiers css et js dans les fichiers html
// changement de version de MM
"gulp bump-major" pour une grosse mise à jour (gros changement du site)
"gulp bump-minor" pour une petite mise à jour (nouvelle fonctionnalité par exemple)
"gulp bump-patch" pour un patch (correction de bug, ajout d'activité)
*/
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

async function minifyCss() {
  builds.map(module => {
    let listOfCss = ['src/css/'+module+'.css']
    if(module === 'mathsmentales')
      listOfCss = ['src/css/sprites.css', 'src/css/knacss.css','src/css/bulma-steps.css','src/css/mathsmentales.css']
    return gulp.src(listOfCss)
    .pipe(cleanCSS())
    .pipe(concat(module+'.css'))
    .pipe(gulp.dest('./public/css/'))
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
gulp.task('bump-major', () => bumpVersion({ major: true }));
gulp.task('bump-minor', () => bumpVersion({ minor: true }));
gulp.task('bump-patch', () => bumpVersion({ patch: true }));

// création des modules de minification de js et css indépendants
builds.forEach(module => {
  gulp.task('minify-js-'+module, () => {
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
  gulp.task('minify-css-'+module, () => {
    let listOfCss = ['src/css/'+module+'.css']
    if(module === 'mathsmentales')
      listOfCss = ['src/css/sprites.css', 'src/css/knacss.css','src/css/bulma-steps.css','src/css/mathsmentales.css']
    return gulp.src(listOfCss)
    .pipe(cleanCSS())
    .pipe(concat(module+'.css'))
    .pipe(gulp.dest('./public/css/'))
  })
  gulp.task('update-version-'+module, async () => {
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
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/sprites.css"><link rel="stylesheet" href="css/knacss.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/mathsmentales.css" type="text/css" media="screen" />', '<link rel="stylesheet" href="css/mathsmentales.css?v='+packageJson.version+'" />')
    } else {
      const regex2 = new RegExp(module+'\\.css\\?v=[\\d\\.]+')
      updatedContent = updatedContent.replace(regex2, module+'.css?v='+packageJson.version);
    }
    console.log(htmlPageName + ' mis à jour')
    fs.writeFileSync(destPath, updatedContent, 'utf8');
  })
  gulp.task('maj-'+module, gulp.series('minify-js-'+module, 'minify-css-'+module, 'bump-patch', 'update-version-'+module))
})

gulp.task('minify-css', minifyCss)
gulp.task('build', build);
gulp.task('update-version', updateVersion);
gulp.task('default', gulp.series('build', 'minify-css', 'bump-patch', 'update-version'));