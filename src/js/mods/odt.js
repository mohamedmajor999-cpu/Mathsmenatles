import JSZip from '../libs/jszip-esm2015.js'

let svgFiles = [];
let svgNumber = 0;
/**
 * Construit le contenu XML complet pour un ODT.
 *
 * @param {Array} elements  Tableau d’objets (voir §1)
 * @returns {Object}
 *   - xml          : String XML de <office:document-content>
 *   - svgFiles     : Tableau [{name: string, content: string}] à ajouter dans ZIP
 */
function buildContentXML(elements) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                         xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
                         xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"                         xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
                         xmlns:math="http://www.w3.org/1998/Math/MathML">
  <office:automatic-styles>
    <text:list-style style:name="NumberedList">
      <text:list-level-style-number text:level="1" text:style-name="Numerotation arabe" style:num-format="1" style:num-suffix=".">
        <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
          <style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1.27cm" fo:text-indent="-0.635cm" fo:margin-left="1.27cm"/>
        </style:list-level-properties>
      </text:list-level-style-number>
    </text:list-style>
  </office:automatic-styles>
  <office:body>
    <office:text>`;

  elements.forEach(elem => {
    // const parser = new DOMParser()
    if (elem.type === 'title') {
      xml += `<text:p>${escapeXML(elem.text)}</text:p>`;
    }
    else if (elem.type === 'list') {
      // Construire la liste
      xml += buildNumberedList(elem.items);
    }
  });
  xml += `</office:text>
  </office:body>
</office:document-content>`;
  return xml;
}
/**
 * Construit le fragment XML <text:list> à partir d’un tableau d’items
 * @param {Array} items  [{text, mathml, svg}]
 * @returns {string}  XML du <text:list>
 */
function buildNumberedList(items) {
  let xml = '<text:list text:style-name="NumberedList" text:continue-numbering="false">';
  items.forEach(item => {
    xml += '<text:list-item>';
    // Contenu du paragraph
    xml += `<text:p>`;
    if (item.text) {
      // faire des morceaux avec les parties en MATHML
      const tokens = splitElements(item.text)
      tokens.forEach(token => {
        // si image svg, on met une nouvelle ligne
        if (token.type === 'svg') xml += '<text:line-break/>'
        xml += token.content
      })
      //xml += item.text//escapeXML(item.text);
    }
    xml += `</text:p>`;
    xml += '</text:list-item>';
  });
  xml += '</text:list>';
  return xml;
}
/** Échappe les caractères XML (&, <, >, ", ') */
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
/**
 * Découpe une chaîne qui contient du texte + du MathML
 * @param {string} source   La chaîne d’entrée (ex : "Voici  <math>…</math>  et encore.")
 * @returns {Array<{type:'text'|'math', content:string}>}
 */
function splitElements(source) {
  // 1️⃣  Enveloppez la chaîne pour qu’elle soit bien formée XML
  // On ajoute un <root> et on déclare le namespace MathML
  const wrapped = `<root>${source.replace('&nbsp;',' ')}</root>`;
  const parser = new DOMParser();
  const doc = parser.parseFromString(wrapped, 'application/xml');

  // 2️⃣  Vérifiez la présence d’erreurs de parsing
  const parserError = doc.getElementsByTagName('parsererror');
  if (parserError.length) {
    throw new Error('Erreur de parsing XML : ' + parserError[0].textContent);
  }

  const tokens = [];

  // 3️⃣  Itérez sur les nœuds enfants du <root>
  const children = Array.from(doc.documentElement.childNodes);
  children.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Texte brut (les espaces et sauts de ligne sont conservés)
      tokens.push({ type: 'text', content: node.textContent });
    } else if (node.nodeName === 'math' || node.namespaceURI === 'http://www.w3.org/1998/Math/MathML') {
      // MathML : ajoutez l’attribut math:display="inline" si absent
      if (!node.hasAttribute('display')) {
        node.setAttribute('display', 'inline');
      }
      const width = Number(node.attributes.width.value);
      const height = Number(node.attributes.height.value)
      node.innerHTML = '<semantics>'+node.innerHTML+'</semantics>'
      // Sérialisez l’élément MathML en chaîne
      tokens.push({ type: 'math', content: '<draw:frame draw:style-name="Formula" text:anchor-type="as-char" svg:width="'+(Math.round(100*width*2.54/96)/100)+'cm" svg:height="'+(Math.round(100*height*2.54/96)/100)+'cm"><draw:object>'+transformAllMathMLTags(node.outerHTML)+'</draw:object></draw:frame>' });
    } else if(node.nodeName === 'svg' || node.firstChild.nodeName === 'svg') {
        let theNode = node;
        if (node.firstChild.nodeName === 'svg')theNode = node.firstChild
        const file = `image_${svgNumber++}.svg`;
        const name = `SVG${svgNumber}`
        if (!theNode.hasAttribute('xmlns')){
          theNode.setAttribute('xmlns', 'xmlns="http://www.w3.org/2000/svg"')
        }
        const viewBox = theNode.attributes.viewBox.value.split(' ')
        const width = Number(viewBox[2]);
        const height = Number(viewBox[3])
        svgFiles.push({ file, content:'<?xml version="1.0" encoding="UTF-8"?>'+theNode.outerHTML, w:width, h:height });
        tokens.push({ type : 'svg', content: `<draw:frame draw:name="${name}"
                  text:anchor-type="as-car" svg:width="${Math.round(100*width*2.54/96)/100}cm" svg:height="${Math.round(100*height*2.54/96)/100}cm">
                <draw:image xlink:href="Pictures/${file}"
                            xlink:type="simple"
                            xlink:show="embed"
                            xlink:actuate="onLoad"/>
              </draw:frame>`})
    } else {
      // Tout autre tag (p.ex. <b>, <i>, <svg>, etc.) est conservé tel quel
      const serializer = new XMLSerializer();
      const otherXML = serializer.serializeToString(node);
      tokens.push({ type: 'text', content: otherXML });
    }
  });

  return tokens;
}

// Fonction pour convertir SVG en PNG (méthode robuste)
async function svgToPng(svgString, width, height) {
    return new Promise((resolve, reject) => {
        // Créer un canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // Fond blanc pour la transparence
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        // Nettoyer et préparer le SVG
        let cleanSvg = svgString.trim();
        
        // S'assurer que le SVG a les attributs width et height
        if (!cleanSvg.includes('width=') || !cleanSvg.includes('height=')) {
            cleanSvg = cleanSvg.replace('<svg', `<svg width="${width}" height="${height}"`);
        }
        
        // S'assurer que le namespace xmlns est présent
        if (!cleanSvg.includes('xmlns=')) {
            cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        
        // Créer une image
        const img = new Image();
        
        img.onload = () => {
            // Fond blanc pour la transparence
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            // Dessiner l'image SVG
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convertir en PNG base64
            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1];
                    URL.revokeObjectURL(img.src);
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }, 'image/png');
        };
        
        img.onerror = (err) => {
            console.error('Erreur de chargement SVG:', err);
            reject(new Error('Impossible de charger le SVG'));
        };
        
        // Encoder le SVG en base64 pour éviter les problèmes d'échappement
        const svgBlob = new Blob([cleanSvg], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        img.src = url;
    });
}

/**
 * Convertit les balises simples du MathML en balises préfixées math:
 */
function transformAllMathMLTags(mathMLString) {
    // Remplace les balises d'ouverture et fermantes avec le préfixe "math:"
    return mathMLString.replace(/<(\/)?([a-z]+)([^>]*)>/g, (match, slash, tagName, attributes) => {
        // Ignore les balises déjà préfixées (ex: <math:mi>)
        if (tagName.startsWith('math:')) {
            return match;
        }
        // Conserve les attributs s'il y en a
        const prefixedTag = slash ? `/math:${tagName}` : `math:${tagName}`;
        return `<${prefixedTag}${attributes}>`;
    });
}

function buildStylesXML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                        xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
                        xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0">
  <office:styles>
    <style:style style:name="Standard" style:family="paragraph" style:class="text"/>
    <style:style style:name="Title" style:family="paragraph" style:parent-style-name="Standard">
      <style:text-properties fo:font-size="18pt" fo:font-weight="bold"/>
    </style:style>
  </office:styles>
</office:document-styles>`;
}

function buildMetaXML() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                      xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0">
  <office:meta>
    <meta:generator>document MathMentales</meta:generator>
    <meta:creation-date>${new Date().toISOString()}</meta:creation-date>
  </office:meta>
</office:document-meta>`;
}

function buildManifest() {
  const files = [
    //{ path: "mimetype", type: "application/vnd.oasis.opendocument.text" },
    //{ path: "manifest.rdf", type: "application/rdf+xml" },
    { path: "content.xml", type: "text/xml" },
    { path: "styles.xml", type: "text/xml" },
    { path: "meta.xml", type: "text/xml" },
  ];

  // Ajout des images SVG
  svgFiles.forEach(svg => {
    files.push({ path: `Pictures/${svg.file}`, type: "image/svg+xml"});
    files.push({ path: `Pictures/${svg.file.replace('.svg', '.png')}`, type: "image/png"});
});

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/>`;
  files.forEach(f => {
    xml += `<manifest:file-entry manifest:full-path="${f.path}"
        manifest:media-type="${f.type}"/>`;
  });
  xml += `</manifest:manifest>`;
  return xml;
}
/**
 * Crée le fichier ODT et propose son téléchargement.
 * elements = [{type: text|SVG|latex|list, content}]
 */
async function generateODT(elements) {
  const zip = new JSZip();

  // 2️⃣ Le fichier mimetype **sans compression** (obligatoire)
  zip.file("mimetype", "application/vnd.oasis.opendocument.text", { compression: "STORE" });
  // 3️⃣ Les autres fichiers XML
  zip.file("content.xml", buildContentXML(elements));
  zip.file("styles.xml", buildStylesXML());
  zip.file("meta.xml", buildMetaXML());
  zip.file("META-INF/manifest.xml", buildManifest());

  // 4️⃣ Images SVG
  svgFiles.forEach(async svg => {
    zip.file(`Pictures/${svg.file}`, svg.content);
    await svgToPng(svg.content, svg.w, svg.h).then( pngData => {zip.file('Pictures/'+(svg.file.replace('.svg', '.png')), pngData, {base64: true});}).catch(err => { console.log(err)})
    ;
  });
  
  // 5️⃣ Générer le Blob
  setTimeout(async ()=>{
    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 }, mimeType: "application/odt" });

    // 6️⃣ Créer un lien de téléchargement
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "document.odt";
    document.body.appendChild(a);
    a.click();                    // déclenche le téléchargement
    setTimeout(() => {            // nettoyage
        URL.revokeObjectURL(url);
        a.remove();
    }, 0);
  },1000)
}

export { generateODT as default }