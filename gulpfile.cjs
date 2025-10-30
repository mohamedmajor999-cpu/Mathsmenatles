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

// création des dossiers ./public/css et ./public/js si inexistants
// create public/js directory if not exist
if (!fs.existsSync('./public/js')) {
  fs.mkdirSync('./public/js')
}
if (!fs.existsSync('./public/css')) {
  fs.mkdirSync('./public/css')
}

let cache
const builds = [ 'mathsmentales', 'cartesflash', 'ceinture', 'courseauxnombres', 'dominos', 'duel', 'editor', 'editoryaml', 'exam', 'exercices', 'wall', 'puzzle', 'diaporama', 'jaiquia', 'fichememo' ]

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
    // delete all public/js/lib.*.js
    fs.readdirSync('./public/js/').forEach(file => {
      if (file.startsWith('lib.' + module)) {
        fs.unlinkSync('./public/js/' + file);
      }
    })
    return rollupStream({
      input: 'src/js/lib.' + module + '.js',
      cache: cache,
      output: { format: 'iife'}
    }).on('error', err => {
      console.log('Error : '+ err.message)
    }).on('bundle', bundle => {
      cache = bundle
    }).pipe( source('lib.' + module + '-' + packageJson.version + '.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
  })
}

async function minifyCss() {
  builds.map(module => {
    // delete all src/js/module-xxx.css
    fs.readdirSync('./public/css/').forEach(file => {
      if (file.startsWith(module)) {
        fs.unlinkSync('./public/css/' + file);
      }
    })
    let listOfCss = ['src/css/'+ module + '.css']
    if(module === 'mathsmentales')
      listOfCss = ['src/css/sprites.css', 'src/css/knacssextract.css','src/css/bulma-steps.css','src/css/mathsmentales.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'diaporama')
      listOfCss = ['src/css/sprites.css', 'src/css/knacssextract.css','src/css/diaporama.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css', 'src/css/bulma-steps.css']
    else if(module === 'wall')
      listOfCss = ['src/css/knacssextract.css','src/css/wall.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'editor')
      listOfCss = ['src/css/editor.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'editoryaml')
      listOfCss = ['src/js/libs/JSXGraph1.11.1/jsxgraph.css','src/js/libs/codemirror/codemirror.css','src/css/editoryaml.css']
    return gulp.src(listOfCss)
    .pipe(cleanCSS())
    .pipe(concat(module+'-' + packageJson.version +'.css'))
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
    let updatedContent = htmlContent.replace(regex, `lib.${module}-${packageJson.version}.js`);
    updatedContent = updatedContent.replace('alllibs.js', 'alllibs.min.js')
    // css - à mettre à jour pour autres modules
    if(htmlPageName === 'index.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/sprites.css"><link rel="stylesheet" href="css/knacssextract.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/mathsmentales.css" type="text/css" media="screen" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" />', '<link rel="stylesheet" href="css/mathsmentales-' + packageJson.version + '.css?" />')
    } else if(htmlPageName === 'wall.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/knacssextract.css" type="text/css" /><link rel="stylesheet" href="css/wall.css?v=1" type="text/css" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css">', '<link rel="stylesheet" href="css/wall-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'diaporama.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/knacssextract.css" type="text/css" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" /><link rel="stylesheet" href="css/diaporama.css" type="text/css" /><link rel="stylesheet" href="css/sprites.css" type="text/css" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" />', '<link rel="stylesheet" href="css/diaporama-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'editor.html'){
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" /><link rel="stylesheet" href="css/editor.css">', '<link rel="stylesheet" href="css/editor-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'editoryaml.html'){
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" /><link rel="stylesheet" href="js/libs/codemirror/codemirror.css" /><link rel="stylesheet" href="css/editoryaml.css">', '<link rel="stylesheet" href="css/editoryaml-' + packageJson.version + '.css" />')
    } else {
      const regex2 = new RegExp(module+'\\.css\\?v=[\\d\\.]+')
      updatedContent = updatedContent.replace(regex2, module +'-' + packageJson.version + '.css');
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
    // delete lib.module
    fs.readdirSync('./public/js/').forEach(file => {
      if (file.startsWith('lib.' + module)) {
        fs.unlinkSync('./public/js/' + file);
      }
    })
    return rollupStream({
      input: 'src/js/lib.' + module + '.js',
      cache: cache,
      output: { format: 'iife'}
    }).on('error', err => {
      console.log('Error : '+ err.message)
    }).on('bundle', bundle => {
      cache = bundle
    }).pipe( source('lib.' + module + '-' + packageJson.version + '.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
  })
  gulp.task('minify-css-'+module, () => {
      // delete all src/js/module-xxx.css
      fs.readdirSync('./public/css/').forEach(file => {
        if (file.startsWith(module)) {
          fs.unlinkSync('./public/css/' + file);
        }
      })
    let listOfCss = ['src/css/'+module + '.css']
    if(module === 'mathsmentales')
      listOfCss = ['src/css/sprites.css', 'src/css/knacssextract.css','src/css/bulma-steps.css','src/css/mathsmentales.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'diaporama')
      listOfCss = ['src/css/sprites.css', 'src/css/knacssextract.css','src/css/diaporama.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css', 'src/css/bulma-steps.css']
    else if(module === 'wall')
      listOfCss = ['src/css/knacssextract.css','src/css/wall.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'editor')
      listOfCss = ['src/css/editor.css','src/js/libs/JSXGraph1.11.1/jsxgraph.css']
    else if(module === 'editoryaml')
      listOfCss = ['src/js/libs/JSXGraph1.11.1/jsxgraph.css','src/js/libs/codemirror/codemirror.css','src/css/editoryaml.css']
    return gulp.src(listOfCss)
    .pipe(cleanCSS())
    .pipe(concat(module + '-' + packageJson.version +'.css'))
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
    let updatedContent = htmlContent.replace(regex, `lib.${module}-${packageJson.version}.js`);
    updatedContent = updatedContent.replace('alllibs.js', 'alllibs.min.js')
    // css - à mettre à jour pour autres modules
    if(htmlPageName === 'index.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/sprites.css"><link rel="stylesheet" href="css/knacssextract.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" media="screen" /><link rel="stylesheet" href="css/mathsmentales.css" type="text/css" media="screen" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" />', '<link rel="stylesheet" href="css/mathsmentales-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'wall.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/knacssextract.css" type="text/css" /><link rel="stylesheet" href="css/wall.css?v=1" type="text/css" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css">', '<link rel="stylesheet" href="css/wall-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'diaporama.html') {
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="css/knacssextract.css" type="text/css" /><link rel="stylesheet" href="css/bulma-steps.css" type="text/css" /><link rel="stylesheet" href="css/diaporama.css" type="text/css" /><link rel="stylesheet" href="css/sprites.css" type="text/css" /><link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" />', '<link rel="stylesheet" href="css/diaporama-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'editor.html'){
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" /><link rel="stylesheet" href="css/editor.css">', '<link rel="stylesheet" href="css/editor-' + packageJson.version + '.css" />')
    } else if(htmlPageName === 'editoryaml.html'){
      updatedContent = updatedContent.replace('<link rel="stylesheet" href="js/libs/JSXGraph1.11.1/jsxgraph.css" type="text/css" /><link rel="stylesheet" href="js/libs/codemirror/codemirror.css" /><link rel="stylesheet" href="css/editoryaml.css">', '<link rel="stylesheet" href="css/editoryaml-' + packageJson.version + '.css" />')
    } else {
      const regex2 = new RegExp(module+'\\.css\\?v=[\\d\\.]+')
      updatedContent = updatedContent.replace(regex2, module +'-' + packageJson.version + '.css');
    }
    console.log(htmlPageName + ' mis à jour')
    fs.writeFileSync(destPath, updatedContent, 'utf8');
  })
  gulp.task('maj-'+module, gulp.series('minify-js-'+module, 'minify-css-'+module, 'update-version-'+module))
})

gulp.task('minify-css', minifyCss)
gulp.task('build', build);
gulp.task('update-version', updateVersion);
gulp.task('default', gulp.series('bump-patch', 'build', 'minify-css', 'update-version'));