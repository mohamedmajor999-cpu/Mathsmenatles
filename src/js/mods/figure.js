import {utils,_} from "./utils.js";
import scratchblocks from "../libs/scratchblocks/scratchblocks.min.es.js";
import Chart from "../libs/chartjs/Chart.js";
import math from "./math.js";
import {
  BoxGeometry,
  DirectionalLight,
  EdgesGeometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  OrthographicCamera,
  Scene,
  WebGLRenderer, OrbitControls, LineMaterial, Wireframe, LineSegmentsGeometry  } from '../libs/threejs.bundle.min.js';

scratchblocks.loadLanguages({
    fr: {
        "commands": {
          "MOTION_MOVESTEPS": "avancer de %1 pas",
          "MOTION_TURNRIGHT": "tourner @turnRight de %1 degrés",
          "MOTION_TURNLEFT": "tourner @turnLeft de %1 degrés",
          "MOTION_POINTINDIRECTION": "s'orienter à %1",
          "MOTION_POINTTOWARDS": "s'orienter vers %1",
          "MOTION_GOTOXY": "aller à x: %1 y: %2",
          "MOTION_GOTO": "aller à %1",
          "MOTION_GLIDESECSTOXY": "glisser en %1 secondes à x: %2 y: %3",
          "MOTION_GLIDETO": "glisser en %1 secondes à %2",
          "MOTION_CHANGEXBY": "ajouter %1 à x",
          "MOTION_SETX": "mettre x à %1",
          "MOTION_CHANGEYBY": "ajouter %1 à y",
          "MOTION_SETY": "mettre y à %1",
          "MOTION_SETROTATIONSTYLE": "fixer le sens de rotation %1",
          "LOOKS_SAYFORSECS": "dire %1 pendant %2 secondes",
          "LOOKS_SAY": "dire %1",
          "LOOKS_THINKFORSECS": "penser à %1 pendant %2 secondes",
          "LOOKS_THINK": "penser à %1",
          "LOOKS_SHOW": "montrer",
          "LOOKS_HIDE": "cacher",
          "LOOKS_SWITCHCOSTUMETO": "basculer sur le costume %1",
          "LOOKS_NEXTCOSTUME": "costume suivant",
          "LOOKS_NEXTBACKDROP_BLOCK": "arrière-plan suivant",
          "LOOKS_SWITCHBACKDROPTO": "basculer sur l'arrière-plan %1",
          "LOOKS_SWITCHBACKDROPTOANDWAIT": "basculer sur l'arrière-plan %1 et attendre",
          "LOOKS_CHANGEEFFECTBY": "ajouter %2 à l'effet %1",
          "LOOKS_SETEFFECTTO": "mettre l'effet %1 à %2",
          "LOOKS_CLEARGRAPHICEFFECTS": "annuler les effets graphiques",
          "LOOKS_CHANGESIZEBY": "ajouter %1 à la taille",
          "LOOKS_SETSIZETO": "mettre la taille à %1 % de la taille initiale",
          "LOOKS_GOTOFRONTBACK": "aller à l'%1 plan",
          "LOOKS_GOFORWARDBACKWARDLAYERS": "déplacer de %2 plans vers l'%1",
          "SOUND_PLAY": "jouer le son %1",
          "SOUND_CHANGEEFFECTBY": "ajouter %2 à l'effet %1",
          "SOUND_SETEFFECTO": "mettre l'effet %1 à %2",
          "SOUND_CLEAREFFECTS": "annuler tous les effets sonores",
          "SOUND_PLAYUNTILDONE": "jouer le son %1 jusqu'au bout",
          "SOUND_STOPALLSOUNDS": "arrêter tous les sons",
          "music.playDrumForBeats": "jouer du tambour %1 pendant %2 temps",
          "music.restForBeats": "faire une pause pendant %1 temps",
          "music.playNoteForBeats": "jouer la note %1 pendant %2 temps",
          "music.setInstrument": "choisir l'instrument n° %1",
          "SOUND_CHANGEVOLUMEBY": "ajouter %1 au volume",
          "SOUND_SETVOLUMETO": "mettre le volume à %1%",
          "music.changeTempo": "ajouter %1 au tempo",
          "music.setTempo": "mettre le tempo à %1",
          "pen.clear": "effacer tout",
          "pen.stamp": "estampiller",
          "pen.penDown": "stylo en position d'écriture",
          "pen.penUp": "relever le stylo",
          "pen.setColor": "mettre la couleur du stylo à %1",
          "pen.changeHue": "ajouter %1 à la couleur du stylo",
          "pen.setColorParam": "mettre la %1 du stylo à %2",
          "pen.changeColorParam": "ajouter %2 à la %1 du stylo",
          "pen.setHue": "mettre la couleur du stylo à %1",
          "pen.changeShade": "ajouter %1 à l'intensité du stylo",
          "pen.setShade": "mettre l'intensité du stylo à %1",
          "pen.changeSize": "ajouter %1 à la taille du stylo",
          "pen.setSize": "mettre la taille du stylo à %1",
          "EVENT_WHENFLAGCLICKED": "quand @greenFlag est cliqué",
          "EVENT_WHENKEYPRESSED": "quand la touche %1 est pressée",
          "EVENT_WHENTHISSPRITECLICKED": "quand ce sprite est cliqué",
          "EVENT_WHENSTAGECLICKED": "quand la scène est cliquée",
          "EVENT_WHENBACKDROPSWITCHESTO": "quand l'arrière-plan bascule sur %1",
          "EVENT_WHENGREATERTHAN": "quand le %1 > %2",
          "EVENT_WHENBROADCASTRECEIVED": "quand je reçois %1",
          "EVENT_BROADCAST": "envoyer à tous %1",
          "EVENT_BROADCASTANDWAIT": "envoyer à tous %1 et attendre",
          "CONTROL_WAIT": "attendre %1 secondes",
          "CONTROL_REPEAT": "répéter %1 fois",
          "CONTROL_FOREVER": "répéter indéfiniment",
          "CONTROL_IF": "si %1 alors",
          "CONTROL_WAITUNTIL": "attendre jusqu'à ce que %1",
          "CONTROL_REPEATUNTIL": "répéter jusqu'à ce que %1",
          "CONTROL_STOP": "stop %1",
          "CONTROL_STARTASCLONE": "quand je commence comme un clone",
          "CONTROL_CREATECLONEOF": "créer un clone de %1",
          "CONTROL_DELETETHISCLONE": "supprimer ce clone",
          "SENSING_ASKANDWAIT": "demander %1 et attendre",
          "videoSensing.videoToggle": "%1 la vidéo",
          "videoSensing.setVideoTransparency": "mettre la transparence de la vidéo à %1",
          "videoSensing.whenMotionGreaterThan": "quand le mouvement de la vidéo > %1",
          "SENSING_RESETTIMER": "réinitialiser le chronomètre",
          "DATA_SETVARIABLETO": "mettre %1 à %2",
          "DATA_CHANGEVARIABLEBY": "ajouter %2 à %1",
          "DATA_SHOWVARIABLE": "montrer la variable %1",
          "DATA_HIDEVARIABLE": "cacher la variable %1",
          "DATA_ADDTOLIST": "ajouter %1 à %2",
          "DATA_DELETEOFLIST": "supprimer l'élément %1 de %2",
          "DATA_DELETEALLOFLIST": "supprimer tous les éléments de la liste %1",
          "MOTION_IFONEDGEBOUNCE": "rebondir si le bord est atteint",
          "DATA_INSERTATLIST": "insérer %1 en position %2 de %3",
          "DATA_REPLACEITEMOFLIST": "remplacer l'élément %1 de la liste %2 par %3",
          "DATA_SHOWLIST": "montrer la liste %1",
          "DATA_HIDELIST": "cacher la liste %1",
          "SENSING_OF_XPOSITION": "abscisse x",
          "SENSING_OF_YPOSITION": "ordonnée y",
          "SENSING_OF_DIRECTION": "direction",
          "SENSING_OF_COSTUMENUMBER": "numéro de costume",
          "LOOKS_COSTUMENUMBERNAME": "%1 du costume",
          "SENSING_OF_SIZE": "taille",
          "SENSING_OF_BACKDROPNAME": "nom de l'arrière-plan",
          "LOOKS_BACKDROPNUMBERNAME": "%1 de l'arrière-plan",
          "SENSING_OF_BACKDROPNUMBER": "numéro de l'arrière-plan",
          "SOUND_VOLUME": "volume",
          "music.getTempo": "tempo",
          "SENSING_TOUCHINGOBJECT": "touche le %1 ?",
          "SENSING_TOUCHINGCOLOR": "couleur %1 touchée ?",
          "SENSING_COLORISTOUCHINGCOLOR": "couleur %1 touche %2 ?",
          "SENSING_DISTANCETO": "distance de %1",
          "SENSING_ANSWER": "réponse",
          "SENSING_KEYPRESSED": "touche %1 pressée ?",
          "SENSING_MOUSEDOWN": "souris pressée ?",
          "SENSING_MOUSEX": "souris x",
          "SENSING_MOUSEY": "souris y",
          "SENSING_SETDRAGMODE": "mettre mode de glissement à %1",
          "SENSING_LOUDNESS": "volume sonore",
          "videoSensing.videoOn": "%1 de la vidéo de %2",
          "SENSING_TIMER": "chronomètre",
          "SENSING_OF": "%1 de %2",
          "SENSING_CURRENT": "%1 actuelle",
          "SENSING_DAYSSINCE2000": "jours depuis 2000",
          "SENSING_USERNAME": "nom d'utilisateur",
          "OPERATORS_ADD": "%1 + %2",
          "OPERATORS_SUBTRACT": "%1 - %2",
          "OPERATORS_MULTIPLY": "%1 * %2",
          "OPERATORS_DIVIDE": "%1 / %2",
          "OPERATORS_RANDOM": "nombre aléatoire entre %1 et %2",
          "OPERATORS_LT": "%1 < %2",
          "OPERATORS_EQUALS": "%1 = %2",
          "OPERATORS_GT": "%1 > %2",
          "OPERATORS_AND": "%1 et %2",
          "OPERATORS_OR": "%1 ou %2",
          "OPERATORS_NOT": "non %1",
          "OPERATORS_JOIN": "regrouper %1 et %2",
          "OPERATORS_LETTEROF": "lettre %1 de %2",
          "OPERATORS_LENGTH": "longueur de %1",
          "OPERATORS_MOD": "%1 modulo %2",
          "OPERATORS_ROUND": "arrondi de %1",
          "OPERATORS_MATHOP": "%1 de %2",
          "OPERATORS_CONTAINS": "%1 contient %2 ?",
          "DATA_ITEMOFLIST": "élément %1 de %2",
          "DATA_ITEMNUMOFLIST": "position de %1 dans %2",
          "DATA_LENGTHOFLIST": "longueur de %1",
          "DATA_LISTCONTAINSITEM": "%1 contient %2 ?",
          "CONTROL_ELSE": "sinon",
          "SENSING_USERID": "id de l'utilisateur",
          "SENSING_LOUD": "fort ?",
          "text2speech.speakAndWaitBlock": "prononcer %1",
          "text2speech.setVoiceBlock": "choisir la voix du %1",
          "text2speech.setLanguageBlock": "mettre la langue à %1",
          "translate.translateBlock": "traduire %1 en %2",
          "translate.viewerLanguage": "langue",
          "makeymakey.whenKeyPressed": "quand la touche %1 pressée",
          "makeymakey.whenKeysPressedInOrder": "quand %1 sont pressés dans l'ordre",
          "microbit.whenButtonPressed": "quand le bouton %1 est appuyé",
          "microbit.isButtonPressed": "bouton %1 appuyé ?",
          "microbit.whenGesture": "quand %1",
          "microbit.displaySymbol": "afficher %1",
          "microbit.displayText": "afficher le texte %1",
          "microbit.clearDisplay": "effacer l'écran",
          "microbit.whenTilted": "quand incliné %1",
          "microbit.isTilted": "incliné %1 ?",
          "microbit.tiltAngle": "angle d'inclinaison %1",
          "microbit.whenPinConnected": "quand la broche %1 est connectée",
          "ev3.motorTurnClockwise": "faire tourner le moteur %1 dans ce sens-ci pendant %2 secondes",
          "ev3.motorTurnCounterClockwise": "faire tourner le moteur %1 dans ce sens-là pendant %2 secondes",
          "ev3.motorSetPower": "mettre la puissance du moteur %1 à %2 %",
          "ev3.getMotorPosition": "position du moteur %1",
          "ev3.whenButtonPressed": "quand le bouton %1 est appuyé",
          "ev3.whenDistanceLessThan": "quand la distance < %1",
          "ev3.whenBrightnessLessThan": "quand la luminosité < %1",
          "ev3.buttonPressed": "bouton %1 appuyé ?",
          "ev3.getDistance": "distance",
          "ev3.getBrightness": "luminosité",
          "ev3.beepNote": "jouer la note %1 pendant %2 secondes",
          "wedo2.motorOn": "allumer %1",
          "wedo2.motorOff": "éteindre %1",
          "wedo2.startMotorPower": "set %1 power to %2",
          "wedo2.setMotorDirection": "mettre la direction de %1 à %2",
          "wedo2.whenDistance": "quand la distance %1 %2",
          "wedo2.getDistance": "distance",
          "wedo2.motorOnFor": "allumer %1 pendant %2 secondes",
          "wedo2.setLightHue": "mettre la couleur de la lampe à %1",
          "wedo2.playNoteFor": "jouer la note %1 pendant %2 secondes",
          "wedo2.whenTilted": "quand incliné %1",
          "wedo2.isTilted": "incliné %1 ?",
          "wedo2.getTiltAngle": "angle d'inclinaison %1",
          "gdxfor.whenGesture": "quand %1",
          "gdxfor.whenForcePushedOrPulled": "quand le capteur de force est %1",
          "gdxfor.getForce": "force",
          "gdxfor.whenTilted": "quand incliné %1",
          "gdxfor.isTilted": "incliné %1 ?",
          "gdxfor.getTilt": "angle d'inclinaison %1",
          "gdxfor.isFreeFalling": "tombe ?",
          "gdxfor.getSpin": "vitesse de rotation %1",
          "gdxfor.getAcceleration": "accélération %1",
          "boost.motorOnFor": "faire tourner le moteur %1 pendant %2 secondes",
          "boost.motorOnForRotation": "faire tourner le moteur %1 de %2 rotations",
          "boost.motorOn": "allumer le moteur %1",
          "boost.motorOff": "éteindre le moteur %1",
          "boost.setMotorPower": "mettre la vitesse du moteur %1 à %2 %",
          "boost.setMotorDirection": "mettre la direction du moteur %1 à %2",
          "boost.getMotorPosition": "position du moteur %1",
          "boost.whenColor": "quand une brique %1 est vue",
          "boost.seeingColor": "brique %1 vue ?",
          "boost.whenTilted": "quand incliné %1",
          "boost.getTiltAngle": "angle d'inclinaison %1",
          "boost.setLightHue": "mettre la couleur de la lampe à %1"
        },
        "dropdowns": {},
        "ignorelt": [],
        "soundEffects": [
          "hauteur",
          "stéréo gauche/droite"
        ],
        "microbitWhen": [
          "bougé",
          "secoué",
          "sauté"
        ],
        "osis": [
          "autres scripts dans sprite"
        ],
        "definePrefix": [
          "définir"
        ],
        "defineSuffix": [],
        "palette": {
          "Motion": "Mouvement",
          "Looks": "Apparence",
          "Sound": "Son",
          "Events": "Événements",
          "Control": "Contrôle",
          "Sensing": "Capteurs",
          "Operators": "Opérateurs",
          "Variables": "Variables",
          "My Blocks": "Mes Blocs"
        },
        "math": [
          "abs",
          "plancher",
          "plafond",
          "racine",
          "sin",
          "cos",
          "tan",
          "asin",
          "acos",
          "atan",
          "ln",
          "log",
          "e^",
          "10^"
        ],
        "aliases": {
          "tourner gauche de %1 degrés": "MOTION_TURNLEFT",
          "tourner droite de %1 degrés": "MOTION_TURNRIGHT",
          "quand le drapeau vert pressé": "EVENT_WHENFLAGCLICKED",
          "fin": "scratchblocks:end"
        },
        "name": "Français",
        "percentTranslated": 100
      } })

// Figures
/**
 * types : 'chart', 'graph', 'svg', 'scratch', 'threejscubes'
 */
export default class Figure {
    constructor(obj, id, target, size){
        this.type = obj.type;
        this.content = obj.content;
        this.options = (obj.options !== undefined)?obj.options:null;
        this.boundingbox = obj.boundingbox;
        this.axis = obj.axis;
        this.grid = obj.grid;
        this.scale = (obj.scale !== undefined)?obj.scale:1; // default scale is 1
        this.xscale = (obj.xscale !== undefined)?obj.xscale:1;
        this.id = id;
        this.keepAspect = (obj.keepAspect!==undefined)?obj.keepAspect:true;
        this.size = size!==undefined?size:obj.size!==undefined&&obj.size.length?obj.size:undefined;//[w,h]
        this.imgSrc = obj.imgSrc||false;
        this.figure = undefined;
        this.displayed = false;
        this.transformLayer = (obj.transformLayer!==false)?obj.transformLayer:false;
        this.create(target)
    }
    /**
     * construct de destination DOM element
     * @param {destination} destination DOMelement
     */
    async create(destination){
        if(this.type === "chart"){
            const div = utils.create("div",{id:"div-dest-canvas-"+this.id, style:'width:14em'});
            const canvas = document.createElement("canvas");
            canvas.id = this.id;
            if(this.size !== undefined){
                div.style.width = this.size[0]+"px";
                div.style.height = this.size[1]+"px";
            }
            div.appendChild(canvas);
            destination.appendChild(div);
        } else if(this.type === "graph"){
            const div = document.createElement("div");
            div.id=this.id;
            div.className = "fig";
            destination.appendChild(div);
            // create svg fixed container for jsxgraph temp construction
            this.div2 = document.createElement("div");
            this.div2.id = this.id + "-svgcontainer";
            const div3 = document.createElement("div");
            div3.id = this.id + "-svg";
            this.div2.appendChild(div3);
            div3.style.width = Math.abs(this.boundingbox[2] - this.boundingbox[0])*10*this.scale + "px";
            div3.style.height = Math.abs(this.boundingbox[3] - this.boundingbox[1])*10*this.scale + "px";
            this.div2.style.display = 'none';
            document.body.appendChild(this.div2);
        } else if(this.type === "svg"){
            let div = document.createElement("div");
            div.className = "fig";
            div.id=this.id;
            destination.appendChild(div);
        } else if(this.type === 'scratch') {
            let div = document.createElement("div");
            div.className = "scratchblocks";
            div.id=this.id;
            destination.appendChild(div);
        } else if(this.type === 'threecubes'){
            const div = document.createElement('div');
            div.id = this.id;
            div.className = 'threecubes';
            destination.appendChild(div);
            div.innerHTML = `<canvas id="${this.id}-canvas"></canvas>`
        }
        return false
    }
    /**
     * Crée une copie de la figure dans une nouvelle instance
     * @param {Figure} figure instance d'une figure
     * @returns false si figure n'est pas une instance de figure, sinon la nouvelle instance
     */
    static copyFig(figure, target){
        if(!figure instanceof Figure){
            return false;
        }
        return new this(
                figure,
                figure.id,
                target,
                figure.size
            );
    }
    /**
     * Affiche / cache le graphique dans le corrigé
     */
    toggle(){
        let elt;
        if(this.type ==="chart")
            elt = document.getElementById(this.id).parentNode;
        else if(['graph', 'svg', 'scratch', 'threecubes'].indexOf(this.type)>-1)
            elt = document.getElementById(this.id);
        let cln = elt.className; // div contenant
        if(cln.indexOf("visible")<0){
            utils.addClass(elt,"visible");
            this.display();
        } else {
            utils.removeClass(elt,"visible");
        }
    }
    setChartFontSize(target){
        const envFontSize = window.getComputedStyle(target.parentNode).fontSize
        const fontSizeValue = Number(envFontSize.substring(0, envFontSize.length - 2))
        const fontSize = String(fontSizeValue * 0.8) + 'px';
        Chart.defaults.font.size = fontSize;
    }
    /**
     * Crée la figure
     * @param {window object} destination 
     * @returns nothing if displayed yet
     */
    display(destination){
        if(this.displayed) return;
        else this.displayed = true;
        // destination is the window destination object if defined
        if(this.type === "svg"){
            let target;
            if(destination === undefined){
                target = document.getElementById(this.id);
            } else {
                target = destination.document.getElementById(this.id);
            }
            target.innerHTML = this.content;
        } else if(this.type === "chart"){ // Chart.js
            let target;
            if(destination === undefined){
                target = document.getElementById(this.id);
            } else {
                target = destination.document.getElementById(this.id);
            }
            this.setChartFontSize(target)
            this.figure = new Chart(target, this.content);
            
        } else if(this.type === 'threecubes'){
            const $scene = document.getElementById(this.id+'-canvas')
            const scene = new Scene()
            scene.background = null
            // Create spot lights
            //const color = 0xFFFFFF;
            const colors = ['red','orange','yellow'],light=[],light2=[]
            for (const [index, color] of colors.entries()) {
                let i=0, j=0, k=0
                if(index === 0)j=1
                else if (index === 2)k=1
                else i=1
                light[index] = new DirectionalLight( color, 4 );
                light[index].position.set( i, j, k );
                scene.add( light[index] );
                light2[index] = new DirectionalLight( color, 2)
                light2[index].position.set(-i, -j, -k)
                scene.add(light2[index])
            }            
            // Create a camera
            const fov = 35; // AKA Field of View
            if(this.size === undefined){
                this.size = [500,300]
            }
            const midWidth = 5
            const offset = 1
            const aspect = this.size[0] / this.size[1];
            const near = 0.1; // the near clipping plane
            const far = 100; // the far clipping plane

            //const camera = new PerspectiveCamera(fov, aspect, near, far);
            const camera = new OrthographicCamera(-midWidth, midWidth, midWidth/aspect+offset, -midWidth/aspect+offset, near, far)
            // every object is initially created at ( 0, 0, 0 )
            // move the camera back so we can view the scene
            const xyz = 30
            camera.position.set(xyz, xyz, xyz);
            camera.lookAt(0,0,0)

            // define a cube and his edges
            const geometry = new BoxGeometry();
            const edgesGeometry = new EdgesGeometry( geometry );
            const lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry( edgesGeometry );
            const matLine = new LineMaterial( {
                color: "black",
                linewidth: 3,
            } );

            // create a default (white) Basic material
            const material = new MeshPhongMaterial({color: "lightgrey"});

            function createCube({x=0,y=0,z=0},dir=undefined) {
                let deltax=0,deltaz=0
                if(dir ==='right'){deltax = 3;deltaz=-3}
                else if(dir === 'left'){deltax = -3;deltaz=3}
                // create a Mesh containing the geometry and material
                const cube = new Mesh(geometry, material);
                cube.position.x = x + deltax
                cube.position.y = y
                cube.position.z = z +deltaz
                // add the mesh to the scene
                scene.add(cube);
                // add edges
                const wireframe = new Wireframe( lineGeometry, matLine );
                wireframe.computeLineDistances();
                wireframe.scale.set( 1.02, 1.02, 1.02 );
                wireframe.position.x = x + deltax
                wireframe.position.y = y
                wireframe.position.z = z + deltaz
                scene.add( wireframe );
            }
            const controls = new OrbitControls(camera, $scene);
            controls.target.set(0, 0, 0);
            controls.update();
            // cubes selon les coordonnées passées en contents
            for(const content of this.content){
                if(content.camera !== undefined ){
                    let midWidth, offset=1
                    if(_.isArray(content.camera)){
                        midWidth = content.camera[0]
                        offset = content.camera[1]
                    } else {
                        midWidth = content.camera
                    }
                    camera.left = -midWidth
                    camera.right = midWidth
                    camera.bottom = -midWidth/aspect+offset
                    camera.top = midWidth/aspect+offset
                    camera.updateProjectionMatrix ()
                }
                if(content.colors !== undefined){ // array of 3 named colors
                    const rgb = [utils.colorNameToRBG(content.colors[0]),utils.colorNameToRBG(content.colors[1]),utils.colorNameToRBG(content.colors[2])]
                    for(let i=0;i<3;i++){
                        light[i].color.r=rgb[i].r
                        light[i].color.g=rgb[i].g
                        light[i].color.b=rgb[i].b
                        light2[i].color.r=rgb[i].r
                        light2[i].color.g=rgb[i].g
                        light2[i].color.b=rgb[i].b
                    }
                }
                if(content.cube > 0){
                    for(let x=0;x<content.cube;x++){
                        for(let y=0;y<content.cube;y++){
                            for(let z=0;z<content.cube;z++){
                                createCube({x,y,z})
                            }
                        }
                    }
                } else if (content.mur !== undefined) {
                    let x=0,z=0,xorz=math.aleaInt(0,1),translate
                    if(['left','right'].includes(content.mur[0])){
                        translate = content.mur[0]
                    }
                    for(const value of content.mur){
                        if(['left','right'].includes(value)) continue
                        for(let y=0;y<value;y++){
                            createCube({x,y,z},translate)
                        }
                        if(xorz)x++;
                        else z++
                    }
                } else if (content.doublemur !== undefined){
                    let translate,index=0
                    if(['left','right'].includes(content.doublemur[0])){
                        translate = content.doublemur[0]
                        index = 1
                    }
                    let z=0
                    for(const value of content.doublemur[0+index]){
                        for(let y=0;y<value;y++){
                            createCube({x:0,y,z},translate)
                        }
                        z++
                    }
                    let x=1
                    for(const value of content.doublemur[1+index]){
                        for(let y=0;y<value;y++){
                            createCube({x,y,z:0},translate)
                        }
                        x++
                    }
                } else if(content.cubeincomplet !== undefined){
                    if(_.isString(content.cubeincomplet) && content.cubeincomplet.indexOf(',')>0){
                        content.cubeincomplet = content.cubeincomplet.split(',')
                    }
                    /*
                    hauteur des colonnes données dans l'ordre suivant :
                    cube 3x3 :  cube 4x4
                    0 3 6       0 4 8  12
                    1 4 7       1 5 9  13
                    2 5 8       2 6 10 14
                                3 7 11 15
                    */
                    let index=0, translate
                    if(['left','right'].includes(content.cubeincomplet[0])){
                        translate = content.cubeincomplet[0]
                        index = 1
                    }
                    const size = Math.sqrt(content.cubeincomplet.length-index)
                    for(let x=0;x<size;x++){
                        for(let z=0;z<size;z++){
                            for(let y=0;y<content.cubeincomplet[index];y++){
                                createCube({x,y,z},translate)
                            }
                            index++
                        }
                    }
                }
            }
            // create the renderer
            const renderer = new WebGLRenderer({antialias: true, canvas:$scene, alpha: true,preserveDrawingBuffer:true});
            // renderer size
            const width = this.size[0]
            const height = this.size[1]
            renderer.setSize(width, height)
            // on change la taille ici maintenant que tout est ok
            $scene.style['width'] = '15em'
            $scene.style['height'] = String(math.round(15*this.size[1]/this.size[0],2))+'em'
            // finally, set the pixel ratio so that our scene will look good on HiDPI displays
            renderer.setPixelRatio(window.devicePixelRatio);
            let isRendering = true
            function render() {
                if(!isRendering) return
              // render, or 'create a still image', of the scene
              renderer.render(scene, camera);
            }
            controls.addEventListener('change',render)
            render()
        } else if(this.type === "graph"){ //JSXGraph
            this.div2.style.display = 'block';
            const target = document.getElementById(this.id)
            if (this.svg !== undefined){
                target.innerHTML = this.svg;
                return
            }
            try {
                JXG.Options.text.display = 'internal'
                if(destination === undefined){
                    this.figure = JXG.JSXGraph.initBoard(this.id + "-svg", {boundingbox:this.boundingbox, keepaspectratio: this.keepAspect, showNavigation: false, showCopyright: false,registerEvents:false, axis:this.axis, grid:this.grid});
                } else {
                    this.figure = destination.JXG.JSXGraph.initBoard(this.id + "-svg", {boundingbox:this.boundingbox, keepaspectratio: this.keepAspect, showNavigation: false, showCopyright: false,registerEvents:false, axis:this.axis, grid:this.grid});
                }
                let content = utils.clone(this.content);
                let elements = [];
                // content est un tableau de tableaux à 2, 3 ou 4 éléments
                // le premier contient le type d'élément à créer
                // le 2e contient la "commande", généralement un tableau de 2 coordonnées, ou éléments
                // le 3e contient les options pour la création (affichage, taille, ...)
                // le 4e contient la référence à un élément précédemment créé pour l'utiliser dans la commande.
                // pour ce 4e, il faut bien compter les contents en partant de zéro.
                for(let i=0,len=content.length;i<len;i++){
                    let type = content[i][0];
                    let commande = content[i][1];
                    let options = false;
                    let reference = false;
                    if(content[i][2] !== undefined)
                        options = content[i][2];
                    if(content[i][3] !== undefined){
                        reference = elements[content[i][3]];
                        // normalement, il faut remplacer la référence dans la commande
                        commande.forEach(function(elt,index){
                            if(typeof elt === "string")
                                if(elt.indexOf("ref")===0){
                                    commande[index] = elements[Number(elt.substr(3))];
                                }
                        })
                    }
                    if(type === "functiongraph"){
                        let formule = commande;
                        if(!options)
                            this.figure.create("functiongraph", [function(x){return eval(formule)}], {strokeWidth:2});
                        else
                            this.figure.create("functiongraph", [function(x){return eval(formule)}], options);
                    } else if(type==="jessiescript") {
                        if(this.figure.jc === undefined){
                            this.figure.jc = new JXG.JessieCode();
                            this.figure.jc.use(this.figure);
                        }
                        this.figure.jc.parse(commande);
                    } else if(["angle", "axis", "circle", "glider", "grid", "intersection", "line", "perpendicular", "point", "polygon", "transform", "segment", "text", "ticks", "foreignobject","sector"].indexOf(type)>-1){
                        if(!options)
                            elements[i] = this.figure.create(type, commande);
                        else {
                            elements[i] = this.figure.create(type,commande,options);
                        }
                    } else if (type === 'fillSquares') {
                        const squares = [];
                        const width = Number(options.width)
                        const height = Number(options.height)
                        const qty = Number(options.qty)
                        for (let h=0; h<width; h++) {
                            squares.push([].fill(0,0,height))
                        }
                        // places commande[2] 1 in the squares array randomly
                        const protectLoop = 1000
                        for (let h=0; h<qty; h++) {
                            let ii,jj
                            let test = 0;
                            do {
                                ii = math.aleaInt(0, width-1);
                                jj = math.aleaInt(0, height-1);
                                test++
                                if(test > protectLoop){
                                    console.log('erreur looping')
                                    break
                                }
                            } while (squares[ii][jj] === 1);
                            squares[ii][jj] = 1;
                        }
                        const left = Number(options.left);
                        const top = Number(options.top);
                        const scaleX = Number(options.scaleX ?? 1);
                        const scaleY = Number(options.scaleY ?? 1);
                        // create squares
                        for (let i=0; i<squares.length; i++) {
                            for (let j=0; j<squares[i].length; j++) {
                                if (squares[i][j] === 1) {
                                    let a = this.figure.create('point',[i*scaleX+left,j*scaleY+top],{face:'', label: {visible: false}})
                                    let b = this.figure.create('point',[(i+1)*scaleX+left,j*scaleY+top],{face:'', label: {visible: false}})
                                    let c = this.figure.create('point',[(i+1)*scaleX+left,(j+1)*scaleY+top],{face:'', label: {visible: false}})
                                    let d = this.figure.create('point',[i*scaleX+left,(j+1)*scaleY+top],{face:'', label: {visible: false}})
                                    this.figure.create('polygon', [a, b, c, d], {fillColor: 'black', withLines:false})
                                }
                            }
                        }
                    } else if(type === 'fillSectors'){
                        const sectors = []
                        const nbOfCircles = options.centers.length
                        const unitCut = Number(options.unitCut)
                        const qty = Number(options.qty)
                        const protectLoop = 300
                        const radius = Number(options.radius)
                        for (let i=0; i<nbOfCircles; i++) {
                            sectors.push([].fill(0,0,unitCut))
                        }
                        for (let h=0; h<qty; h++) {
                            let ii,jj
                            let test = 0;
                            do {
                                ii = math.aleaInt(0, nbOfCircles-1);
                                jj = math.aleaInt(0, unitCut-1);
                                test++
                                if(test > protectLoop){
                                    console.log('erreur looping')
                                    break
                                }
                            } while (sectors[ii][jj] === 1);
                            sectors[ii][jj] = 1;
                        }
                        for (let i=0; i<sectors.length; i++) {
                            for (let j=0; j<sectors[i].length; j++) {
                                if (sectors[i][j] === 1) {
                                    const center = options.centers[i]
                                    const a = this.figure.create('point',[center[0]+radius*Math.cos(2*Math.PI*j/unitCut),center[1]+radius*Math.sin(2*Math.PI*j/unitCut)], {face:'', label:{visible: false}})
                                    const b = this.figure.create('point',[center[0]+radius*Math.cos(2*Math.PI*(j+1)/unitCut),center[1]+radius*Math.sin(2*Math.PI*(j+1)/unitCut)], {face:'', label:{visible: false}})
                                    this.figure.create('sector',[center,a,b],{withLines:false})
                                }
                            }
                        }
                    }
                }
                let svg = new XMLSerializer().serializeToString(this.figure.renderer.svgRoot)
                // get the svg height value in the svg string
                const height = svg.match(/height="([^"]+)"/)[1];
                // get the svg width value in the svg string
                const width = svg.match(/width="([^"]+)"/)[1];
                // remove the <filter> tag in the svg string
                svg = svg.replace(/<filter.*?<\/filter>/g, '');
                // suppress all font-size:12px; in the svg string
                svg = svg.replace(/font-size: 12px;/g, '');
                svg = svg.replace(/stroke-width="2px"/g, 'stroke-width="2"')
                // add a size="4" in each <text> tag in the svg string
                // Expression régulière pour trouver toutes les balises <text> dans la chaîne SVG
                let regex = /<text.*?>/g;
                // Fonction callback pour remplacer chaque match par le même texte avec l'attribut size="4" ajouté
                let callback = function (match, offset, string) {
                    // On cherche les balises <text> qui ne sont pas vides
                    if(match.trim().length > 0){
                        return match.slice(0,5) + " font-size=\"10\"" + match.slice(6);
                    }
                    // Si la balise est vide, on l'ignore
                    else{
                        return match;
                    }
                };
                // Utilisation de la méthode replace() pour remplacer chaque élément correspondant à la regex avec le résultat du callback
                svg = svg.replace(regex, callback);
                svg = svg.replace(/<svg[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" width="'+(width*this.xscale/10/this.scale)+'em" height="'+(height*this.xscale/10/this.scale)+'em">');
                target.innerHTML = svg;
                this.svg = svg;
                if(this.transformLayer !== false){
                    const layer = target.querySelector('svg > g:nth-of-type('+(this.transformLayer.id+1)+')');
                    if(layer !== null) {
                        layer.setAttribute('transform', this.transformLayer.transform);
                    }
                }
                // remove the div2 from the dom
                this.div2.parentNode.removeChild(this.div2);
            } catch(error){
                utils.debug("Figure", error, this);
            }
        } else if(this.type === "scratch"){
            const target = document.getElementById(this.id)
            const code = this.content.join('\n')
            const doc = scratchblocks.parse(code, {style: 'scratch3', languages: ['fr']});
            const svg = scratchblocks.render(doc, {style: 'scratch3', languages: ['fr']});
            // calcul de la largeur et de la hauteur de l'image à partir des données du viewbox
            const width = Number(svg.getAttribute('viewBox').split(' ')[2])
            const height = Number(svg.getAttribute('viewBox').split(' ')[3])
            const ratio = height / width
            let reduc = 19
            if(this.id.indexOf('c') === 0 && this.id.indexOf('cor') === -1) reduc = 64
            const newWidth = width / reduc;
            svg.setAttribute('height', newWidth * ratio + 'em');
            svg.setAttribute('width', newWidth + 'em');
            target.appendChild(svg);
        }
    }
}
