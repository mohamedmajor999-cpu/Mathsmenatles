"use strict"

import protos from './mods/protos.js';
import utils from './mods/utils.js';
// MathsMentales core
import MM from "./mods/MM.js";
import library from './mods/library.js';
import sound from './mods/sound.js';
import speech from './mods/speech.js';
import Picker from './libs/vanilla-picker/vanilla-picker.esm.js'

window.onload = function() {
    MM.version = utils.getVersion()
    // detection de l'hébergement sur la forge
    if (window.location.host == "mathsmentales.forge.apps.education.fr"){
        const accueil = document.getElementById('accueillogo')
        if (accueil) accueil.innerHTML =
            `<i class="sprite sprite-logocm160x132 logoMM"></i>
            <p>
                Ceci est la version de <span class="red">test de MathsMentales</span>, dont le code source est accessible sur la <a href="https://forge.apps.education.fr/mathsmentales/mathsmentales.forge.apps.education.fr">Forge des communs numériques.</a>
            </p>
            <p>
                Préferez utiliser la version stable sur <a href="https://mathsmentales.net">https://mathsmentales.net</a>
            </p>
            <p>
                Merci de signaler les <b>bugs</b> sous forme de <b>ticket</b> sur <a href="https://forge.apps.education.fr/mathsmentales/mathsmentales.forge.apps.education.fr/-/issues">le dépot mathsmentales</a> .
            </p>`
    }
    // detect if touching interface
    let listener = function(evt){
        // the user touched the screen!
        MM.touched = true;
        window.removeEventListener('touchstart',listener,false);
    }
    window.addEventListener('touchstart',listener,false);
    // for ascii notations, used by math parser
    //MM.ascii2tex = new AsciiMathParser();
    MM.resetCarts();
    // interface
    let tabsButtons = document.querySelectorAll("#header-menu .tabs-menu-link, #footer-menu .tabs-menu-link");
    tabsButtons.forEach(element => {
        element.onclick = function(){MM.showTab(element)};
    });
    document.getElementById("btnaccueil").onclick = function(element){
        MM.showTab(element.target);
    }
    MM.checkValues();
    MM.initializeAlea(Date());
    MM.setFontType()
    MM.content = library.openContents();
    MM.createTuiles();
    // création des tuiles des niveaux
    MM.createSearchCheckboxes();
    // put the good default selected
    document.getElementById("chooseParamType").value = "paramsdiapo";
    // check if parameters from URL
    MM.checkURL();
    if(MM.embededIn){
        window.parent.postMessage({url: window.location.href, ready:"ok"}, MM.embededIn);
    } 
    sound.getPlayer();
    // to show de good checked display
    MM.setDispositionEnonce(utils.getRadioChecked("Enonces"));
    // take history if present
    if(window.localStorage){
        if(localStorage.getItem("history"))
            document.querySelector("#tab-historique ol").innerHTML = localStorage.getItem("history").replace(/onclick="utils\.checkurl\(this.dataset\['url'\]\,false\,true\)"/gi,"");
    }
    // ajout des pickers de colors
    for(let i=0;i<4;i++){
        let leparent = document.getElementById("sddiv"+(i+1));
        MM.colorSelectors[i] = new Picker({parent:leparent,color:'#FFFFFF'});
        MM.colorSelectors[i].onChange = function(color){
            leparent.style.background = color.rgbaString;
            MM.colors[i] = color.rgbaString;
        }
    }
    document.querySelector("input[name='online'][value='no']").checked = true;
    // events sur les boutons
    // open Menu sur smartphone
    document.getElementById('openMenuButton').onclick = () => {
        document.getElementById('nav-menu-niveaux').classList.toggle('hidden-phone')
        document.getElementById('header-menu').classList.toggle('hidden-phone')
    }
    document.querySelectorAll('#nav-menu-niveaux > ul > li a').forEach((el) => {
        el.onclick = (evt)=>{
            document.querySelectorAll('#nav-menu-niveaux > ul > li > ul').forEach(elem => {
                elem.classList.remove('show')
            })
            evt.target.parentNode.querySelector('ul').classList.add('show')
        }
    })
    // menus
    const lis = document.querySelectorAll("#nav-menu-niveaux li li");
    for(const li of lis){
        li.onclick = (evt)=>{
            library.displayContent(evt.target.dataset.niv,true)
            MM.setHistory('MathsMentales niveau '+evt.target.innerHTML,'n='+evt.target.dataset.niv)
            document.querySelectorAll('#nav-menu-niveaux > ul > li > ul').forEach(elem => {
                elem.classList.remove('show')
            })
        };
    }
    // ouvrons l'interface des paniers pour que tout le monde sache qu'il y en a !
    MM.showCartInterface();
    // boutons de gestion d'activité dans le panier
    document.getElementById("addToCart").onclick = ()=>{MM.addToCart();};
    document.getElementById("unlinkCart").onclick = ()=>{MM.unlinkActivity();};
    document.getElementById("removeFromCart").onclick = ()=>{MM.removeFromCart()};
    document.getElementById("tempo-slider").oninput = (evt)=>{if(evt.target.value<2)evt.target.value=0;MM.changeTempoValue(evt.target.value);};
    document.getElementById("tempo-slider").onchange=()=>{
        MM.carts[MM.selectedCart].display(MM.carts);
    };
    document.getElementById("nbq-slider").oninput = (evt)=>{MM.changeNbqValue(evt.target.value);};
    document.getElementById("nbq-slider").onchange = ()=>{MM.carts[MM.selectedCart].display(MM.carts);};
    // radio orientation séparation
    document.getElementById("radiodir1").onclick = ()=>{MM.setDispositionDoubleEnonce('h');};
    document.getElementById("radiodir2").onclick = ()=>{MM.setDispositionDoubleEnonce('v');};
    // radio intro diaporama
    document.getElementById("radiobeforeslider1").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
    document.getElementById("radiobeforeslider2").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
    document.getElementById("radiobeforeslider3").onclick = (evt)=>{MM.setIntroType(evt.target.value);};
    document.getElementById("playerlist").oninput = (evt)=>{sound.select(evt.target.value)};
    // panier 1
    document.getElementById("btncartclose1").onclick=()=>{MM.emptyCart(1)};
    document.getElementById("titlecart1").onblur = (evt)=>{MM.carts[0].title = evt.target.innerText}
    document.getElementById("imgordercart1").onclick = (evt)=>{MM.carts[0].changeOrder(evt.target)}
    document.getElementById("progress-cart1").onclick = (evt)=>{MM.carts[0].changeProgress(evt.target)}
    document.getElementById("imgduplicatecart1").onclick = ()=>{
        if(MM.carts.length < 4){
            MM.addCart();
            MM.carts[0].duplicate(MM.carts);
        }
    };
    // panier 2
    document.getElementById("btncartdelete2").onclick=()=>{MM.removeCart(2)}
    document.getElementById("btncartclose2").onclick=()=>{MM.emptyCart(2)}
    document.getElementById("titlecart2").onblur = (evt)=>{MM.carts[1].title = evt.target.innerText}
    document.getElementById("imgordercart2").onclick = (evt)=>{MM.carts[1].changeOrder(evt.target)}
    document.getElementById("progress-cart2").onclick = (evt)=>{MM.carts[1].changeProgress(evt.target)}
    document.getElementById("imgduplicatecart2").onclick = ()=>{
        if(MM.carts.length < 4){
            MM.addCart();
            MM.carts[1].duplicate(MM.carts);
        }}
    // panier 3
    document.getElementById("btncartdelete3").onclick=()=>{MM.removeCart(3)};
    document.getElementById("btncartclose3").onclick=()=>{MM.emptyCart(3)};
    document.getElementById("titlecart3").onblur = (evt)=>{MM.carts[2].title = evt.target.innerText}
    document.getElementById("imgordercart3").onclick = (evt)=>{MM.carts[2].changeOrder(evt.target)}
    document.getElementById("progress-cart3").onclick = (evt)=>{MM.carts[2].changeProgress(evt.target)}
    document.getElementById("imgduplicatecart3").onclick = ()=>{
        if(MM.carts.length < 4){
            MM.addCart();
            MM.carts[2].duplicate(MM.carts);
        }};
    // panier 4
    document.getElementById("btncartdelete4").onclick=()=>{MM.removeCart(4)};
    document.getElementById("btncartclose4").onclick=()=>{MM.emptyCart(4)};
    document.getElementById("titlecart4").onblur = (evt)=>{MM.carts[3].title = evt.target.innerText;};
    document.getElementById("progress-cart4").onclick = (evt)=>{MM.carts[3].changeProgress(evt.target);};
    document.getElementById("imgordercart4").onclick = (evt)=>{MM.carts[3].changeOrder(evt.target);};
    // radio online
    document.getElementById("radioonline1").onclick = (evt)=>{MM.setOnlineState(evt.target.value)};
    document.getElementById("radioonline2").onclick = (evt)=>{MM.setOnlineState(evt.target.value)};
    // radio nb d'énoncés
    document.getElementById("radionbenonces1").onclick = ()=>{MM.setDispositionEnonce(1);};
    document.getElementById("radionbenonces2").onclick = ()=>{MM.setDispositionEnonce(2);};
    document.getElementById("radionbenonces3").onclick = ()=>{MM.setDispositionEnonce(3);};
    document.getElementById("radionbenonces4").onclick = ()=>{MM.setDispositionEnonce(4);};
    // radio face to face
    document.getElementById("radioftf1").onclick = ()=>{MM.setFacetoFace('n');};
    document.getElementById("radioftf2").onclick = ()=>{MM.setFacetoFace('y');};
    // radio fin de diaporama
    document.getElementById("radioendslider1").onclick = (evt)=>{MM.setEndType(evt.target.value)};
    document.getElementById("radioendslider2").onclick = (evt)=>{MM.setEndType(evt.target.value)};
    document.getElementById("radioendslider3").onclick = (evt)=>{MM.setEndType(evt.target.value)};
    // radio audio
    MM.speech = new speech()
    if(MM.speech.exists){
        document.getElementById("radioaudioon").onclick = (evt)=>{MM.setAudio(evt.target.value)};
        document.getElementById("radioaudiooff").onclick = (evt)=>{MM.setAudio(evt.target.value)};
        document.getElementById("audiorepeat").oninput = (evt)=>{MM.setAudioRepetitions(evt.target.value)}
        let select = document.getElementById("selectVoice");
        if(!MM.speech.generateSelectOptions(select)){
            // création d'un bouton de génération car obligation d'interagir avec le navigateur pour générer
            let button = utils.create("button",{innerHTML:'🎶', title:'Cliquer pour détecter les langues disponibles'})
            button.onclick = (evt)=>{
                MM.speech.generateSelectOptions(select)
                evt.target.parentNode.removeChild(evt.target)
            }
            document.getElementById("voix").appendChild(button)
        }
        select.onchange = (ev)=>{
            MM.speech.setVoice(ev.target.value);
            MM.audioSamples.forEach(val=>{
                MM.speech.speak(val,false)
            })
        }
        document.getElementById("btntestreader").onclick = ()=>{
            if(!select.hasChildNodes()){
                MM.speech.initialize();
                MM.speech
            }
            MM.audioSamples.forEach(val=>{
                MM.speech.speak(val,false)
            })
        }
        document.getElementById("btnstopreader").onclick = ()=>{
            MM.speech.stop();
        }
    }
    // boutons démarrage
    document.getElementById("btnstart").onclick = ()=>{MM.start();};
    document.getElementById("btnenonces").onclick = ()=>{MM.showQuestions();};
    document.getElementById("btnreponses").onclick = ()=>{MM.showAnswers();};
    document.getElementById("btnadresse").onclick = ()=>{MM.copyURL('diaporama');};
    document.getElementById("btncopytohistoric").onclick = ()=>{MM.copyURLtoHistory()};
    // bouton d'inclusion de la variable aléatoire
    document.getElementById("aleaInURL").onchange = ()=>{MM.setSeed("checkSwitched")}
    document.getElementById('fontType').onchange = ()=>{MM.setFontType()}
    // boutons génération documents
    document.getElementById("chooseParamType").onchange = (evt)=>{MM.showParameters(evt.target.value)}
    // fiche d'exercices
    document.getElementById("btngeneratesheet").onclick = ()=>{MM.createExercicesSheet()}
    document.getElementById("btn-ex-adresse").onclick = ()=>{MM.copyURL('exosheet');};
    document.getElementById("btn-ex-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('exosheet')};
    document.getElementById("extitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value}
    // interros
    document.getElementById("btngenerateexams").onclick = ()=>{MM.createExamSheet()}
    document.getElementById("btn-exam-adresse").onclick = ()=>{MM.copyURL('exam')}
    document.getElementById("btn-exam-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('exam')}
    document.getElementById("inttitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value}
    // ceintures
    document.getElementById("ceintcolsval").oninput = (evt)=>{document.getElementById('ceintcols').innerHTML=evt.target.value;utils.createCeintureTitres(evt.target.value)}
    document.getElementById("ceintrowsval").oninput = (evt)=>{document.getElementById('ceintrows').innerHTML=evt.target.value}
    document.getElementById("ceintqtyvalue").oninput = (evt)=>{document.getElementById('ceintqty').innerHTML=evt.target.value;}
    document.getElementById("btngenerateceinture").onclick = ()=>{MM.createCeintureSheet()}
    document.getElementById("btn-ceinture-adresse").onclick = ()=>{MM.copyURL('ceinture');};
    document.getElementById("btn-ceinture-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('ceinture')};
    document.getElementById("ceinttitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value}
    // course au nombres
    document.getElementById("canqtyvalue").oninput = (evt)=>{document.getElementById('canqty').innerHTML=evt.target.value;}
    document.getElementById("btn-can-adresse").onclick = ()=>{MM.copyURL('cansheet');};
    document.getElementById("btn-can-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('cansheet')};
    document.getElementById("btngenerateCAN").onclick = ()=>{MM.createCourseAuxNombres()}
    document.getElementById("cantitle").oninput = (evt)=>{MM.carts[0].title = evt.target.value}
    // flash cards
    document.getElementById("btngenerateFC").onclick = ()=>{MM.createFlashCards()}
    document.getElementById("btn-flash-adresse").onclick = ()=>{MM.copyURL('cartesflash');};
    document.getElementById("btn-flash-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('cartesflash')};
    // fiches memo
    document.getElementById("btngenerateFM").onclick = ()=>{MM.createFicheMemo()}
    document.getElementById("btn-memo-adresse").onclick = ()=>{MM.copyURL('fichememo');};
    document.getElementById("btn-memo-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('fichememo')};
    // Panneau d'activités
    document.getElementById("btngenerateWall").onclick = ()=>{MM.createWall()}
    document.getElementById("btn-wall-adresse").onclick = ()=>{MM.copyURL('wall');};
    document.getElementById("btn-wall-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('wall')};
    // j'ai / qui a ?
    document.getElementById("btngenerateWG").onclick = ()=>{MM.createWhoGots()}
    document.getElementById("cardsNbValue").oninput = (evt)=>{document.getElementById('cardsNb').innerHTML=evt.target.value;}
    document.getElementById("btn-wg-adresse").onclick = ()=>{MM.copyURL('whogots');};
    document.getElementById("btn-wg-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('whogots')};
    // dominos
    document.getElementById("dominosNbValue").oninput = (evt)=>{document.getElementById('dominosNb').innerHTML=evt.target.value;}
    document.getElementById("dominosDoublons").onclick = (evt)=>{let text = document.getElementById("dominosDoublonsText"); if(evt.target.checked)text.innerHTML="Oui"; else text.innerHTML = "Non"}
    document.getElementById("dominosDoublons").checked = true;
    document.getElementById("btngenerateDominos").onclick = ()=>{MM.createDominos()}
    document.getElementById("btn-dominos-adresse").onclick = ()=>{MM.copyURL('dominos');};
    document.getElementById("btn-dominos-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('dominos')};
    // puzzles
    document.getElementById("btngeneratePuzzle").onclick = ()=>{MM.createPuzzle()}
    document.getElementById("btn-puzzle-adresse").onclick = ()=>{MM.copyURL('puzzle');};
    document.getElementById("btn-puzzle-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('puzzle')};
    // duels
    document.getElementById("btn-duel-start").onclick = ()=>{MM.duelLaunch();};
    document.getElementById("btn-duel-adresse").onclick = ()=>{MM.copyURL('duel');};
    document.getElementById("btn-duel-copytohistoric").onclick = ()=>{MM.copyURLtoHistory('duel')};
    document.getElementById("duelbackgroundselect").onchange = (evt)=>{document.getElementById("duelbg").style.backgroundImage = "url('./library/illustrations/backgrounds/bg"+evt.target.value+".jpg')"}
    document.getElementById("duelbg").style.backgroundImage = "url('./library/illustrations/backgrounds/bg"+utils.getSelectValue("duelbackgroundselect")+".jpg')"
    // boutons d'exemples
    document.getElementById("btn-annotation2").addEventListener("click", (evt)=>{
        let target = utils.getTargetWithImageInside(evt);
        MM.annotateThisThing('divparams', target.id)
    });
    document.getElementById("btn-shuffle").onclick = ()=>{MM.editedActivity.display('sample', MM)}
    // boutons section énoncés
    document.getElementById("btn-annotation-enonce").onclick = (evt)=>{
        let target = utils.getTargetWithImageInside(evt);
        MM.annotateThisThing('enonce-content', target.id);
    }
    // zooms
    document.getElementById("enonce-content").onclick = (evt)=>{
        if(evt.target.dataset.what === "in"){
            MM.zooms[evt.target.dataset.zoom].plus();
        } else if(evt.target.dataset.what === "out"){
            MM.zooms[evt.target.dataset.zoom].minus();
        }
    }
    document.getElementById("corrige-content").onclick = (evt)=>{
        if(evt.target.dataset.what === "in"){
            MM.zooms[evt.target.dataset.zoom].plus();
        } else if(evt.target.dataset.what === "out"){
            MM.zooms[evt.target.dataset.zoom].minus();
        }
    }
    // bouton section Enoncé pour export vers Pixel Art
    document.getElementById("btn-export-enonce-pixelart").onclick = ()=>{
        // copy value of textarea to clipboard
        navigator.clipboard.writeText(document.getElementById("text-export-pixelart").value);
        alert("Copié dans le presse-papiers !");
    }

    // boutons section corrigés
    document.querySelector("#tab-corrige aside").addEventListener("click",(evt)=>{
        let target = utils.getTargetWithImageInside(evt);
        switch (target.id){
            case "btn-annotation-corrige":
                MM.annotateThisThing('corrige-content', target.id)
                break
            case "btn-restart-otherdata":
                MM.start()
                break
            case "btn-restart-samedata":
                // the true value force to restart with same datas
                MM.start(true)
                break
            default:
                break
        }
    })
    // boutons section historique
    document.querySelector("#tab-historique header").addEventListener("click",(evt)=>{
        switch (evt.target.id){
            case "btnemptyhist":
                MM.emptyHistory()
                break
            case "btnSelectHist":
                MM.createSelectHistory()
                break
            case "btnsupprselhist":
                MM.removeSelectionFromHistory()
                break
            default:
                break
        }
    })
    // moteur de recherche d'activité
    document.getElementById("searchinput").onkeyup = (evt)=>{
        const searchString = evt.target.value
        // check if filters
        let filters = ''
        const searchFilters = document.querySelectorAll('#searchLevels input:checked')
        if(searchFilters !== null){
            filters = [...searchFilters].map(e=>e.value).join(',');
        }
        if(searchString.length > 2){
            MM.setHistory('MathsMentales recherche :'+searchString,'search='+searchString+'&f='+filters)
        }
        library.displayContent(searchString)
    };
    document.getElementById("resultat-chercher").addEventListener("click",async (evt)=>{
        if(evt.target.classList.contains('actitityLink')){
            await navigator.clipboard.writeText(utils.baseURL+'?u='+evt.target.parentNode.dataset.link)
            evt.target.classList.add('red')
            setTimeout(()=>{evt.target.classList.remove('red')},1500)
        } else if (evt.target.type === 'checkbox'){
            return;
        }else if(evt.target.id.indexOf("rch2")===0){
            utils.deploy(evt.target);
        } else if(evt.target.id.indexOf("rch3")===0){
            utils.deploy(evt.target);
        } else if(evt.target.id.indexOf("rcli")===0){
            // clic sur une activite
            MM.loadActivity(evt.target.dataset['url'])
        } else if (evt.target.parentNode.id.indexOf("rcli")===0) {
            MM.loadActivity(evt.target.parentNode.dataset['url'])
        }
    })
    // bouton d'ajout au panier
    document.getElementById("btn-addToCart").onclick = ()=>{
        let selection = document.querySelectorAll("#resultat-chercher .checkitem:checked");
        if(selection.length > 0){
            let allActivities = [];
            let nbq = Number(document.getElementById("addToCartNbq").value);
            selection.forEach(el=>{
                allActivities.push(library.loadJSON(el.dataset["url"], MM.version))
            })
            Promise.all(allActivities).then(data=>{
                data.forEach(val=>{
                    MM.carts[MM.selectedCart].addActivity(val,nbq);
                })
                let tab = document.querySelector("a[numero$='parameters'].tabs-menu-link");
                MM.resetAllTabs();
                utils.addClass(tab, "is-active");
                document.getElementById("tab-parameters").style.display = "";
                }).catch(err=>{
                console.log(err)
            })
        } else {
            console.log("Pas d'activité à ajouter au panier")
        }
    }
    // boutons aléatorisation
    document.getElementById("btn-params-aleakey").onclick = ()=>{MM.setSeed(utils.seedGenerator())};

    /**
     * Comportements sur les éléments fixes
     */
    // Suppression comportement avant modularisation  
    document.querySelector("#tab-historique ol").addEventListener("click",(evt)=>{
        if(evt.target.innerHTML.indexOf("🛠 éditer")>-1){
            MM.checkURL(evt.target.dataset['url'],false,true)
        } else if(evt.target.innerHTML.indexOf("❌ Supprimer")>-1){
            MM.removeFromHistory(evt.target.parentNode);
        }
    })
    document.getElementById("corrige-content").addEventListener("click",(evt)=>{
        if(evt.target.innerHTML === "Figure"){
            MM.memory[evt.target.dataset.id].toggle();
        }
    })
    // évènements sur les activités dans les paniers
    for(let i=0;i<4;i++){
        document.getElementById("cart"+i+"-list").addEventListener("click",(evt)=>{
            if(evt.target.dataset.actid !== undefined){
                MM.editActivity(evt.target.dataset.actid);
            } else if(evt.target.dataset.actidtoremove !== undefined){
                MM.removeFromCart(evt.target.dataset.actidtoremove)
            }
        })    
    }
    /**
     * boutons paniers, images contenues dans des button
     */
    document.getElementById("cartsMenu").addEventListener("click",(evt)=>{
        let target = utils.getTargetWithImageInside(evt);
        if(target.value){
            MM.showCart(target.value);
        } else if(target.id==="addcart"){
            MM.addCart();
        }
    })
    /**
     * cases à cocher dans le choix des options d'une activité
     */
    document.getElementById('activityOptions').addEventListener("click",(evt)=>{
        if(evt.target.id==="chckallopt"){
            MM.editedActivity.setOption('all', evt.target.checked)
        } else if(evt.target.id.indexOf("o")===0){
            MM.editedActivity.setOption(evt.target.value, evt.target.checked)
        } else if(evt.target.id.indexOf('checkAllOptions')===0) {
            const toutesOptions = document.querySelectorAll('#activityOptions > span > ul')
            const i = Number(evt.target.value)
            let count = 0
            toutesOptions.forEach(() => {
                //const input = option.querySelector(`li:nth-of-type(${i+1}) input`)
                //input.checked = evt.target.checked;
                MM.editedActivity.setOption(count+'-'+i, evt.target.checked)
                count++
            })
        }
    })
}