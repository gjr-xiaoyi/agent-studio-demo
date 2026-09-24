const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const nodes={};const element=id=>nodes[id]||(nodes[id]={innerHTML:'',value:'',textContent:'',checked:false,classList:{add(){},remove(){}},focus(){}});
const context={document:{querySelector:element,addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},location:{hash:''},setTimeout(){return 0},clearTimeout(){},console};context.window=context;context.addEventListener=()=>{};context.scrollTo=()=>{};vm.createContext(context);
for(const f of ['icons.js','core.js','ui.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),context);
let count=0;const decode=t=>t.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
function inspect(html){for(const m of html.matchAll(/\bon(?:click|change|input)="([^"]*)"/g)){new Function('event',decode(m[1]));count++}assert.ok(html.length>100)}
for(const id of ['A','B','C'])for(const p of ['list','build','versions','eval','release','runs','batches','knowledge','assets','audit']){vm.runInContext(`appId='${id}';page='${p}';buffer=page==='build'?E.copy(app().draft):null;selectedVersion=app().production;render()`,context);inspect(element('#app').innerHTML)}
for(const command of ["source('kb@1')","registerService()","createDialog()","rollbackDialog()","productionDialog()","connectDialog()","guide()"]){vm.runInContext("appId='A';buffer=E.copy(app().draft);"+command,context);inspect(element('#overlay').innerHTML)}
console.log('PASS: all 30 application/page combinations and modal event handlers compile ('+count+' handlers).');
