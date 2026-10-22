export const STORAGE_KEY='daily-games:archivo-de-ecos:v1';
export const LEVELS=Object.freeze([
 {name:'El primer destello',sequence:[0,4,8],reverse:false},
 {name:'Entre las estrellas',sequence:[2,6,4,0],reverse:false},
 {name:'Una señal lejana',sequence:[7,1,5,3,8],reverse:false},
 {name:'El eco regresa',sequence:[0,5,7,2],reverse:true},
 {name:'Reflejo de luna',sequence:[6,2,4,8,1,3],reverse:true},
 {name:'El archivo despierta',sequence:[4,0,8,2,6,1,7,5],reverse:true}
].map(x=>Object.freeze({...x,sequence:Object.freeze(x.sequence)})));
export function expected(level){const s=[...LEVELS[level].sequence];return LEVELS[level].reverse?s.reverse():s;}
export function initial(level=0){return {level:Number.isInteger(level)&&level>=0&&level<LEVELS.length?level:0,phase:'ready',input:[],mistakes:0,replays:0};}
export function start(s){return s.phase==='complete'?s:{...s,phase:'playing',input:[]};}
export function finishPlayback(s){return s.phase==='playing'?{...s,phase:'input',input:[]}:s;}
export function press(s,n){if(s.phase!=='input'||!Number.isInteger(n)||n<0||n>8)return s;const target=expected(s.level);if(n!==target[s.input.length])return {...s,phase:'retry',input:[],mistakes:s.mistakes+1};const input=[...s.input,n];return {...s,input,phase:input.length===target.length?'complete':'input'};}
export function replay(s){return s.phase==='complete'?s:{...s,phase:'ready',input:[],replays:s.replays+1};}
export function next(s){return s.phase==='complete'&&s.level<LEVELS.length-1?initial(s.level+1):s;}
export function parseProgress(raw){try{const x=JSON.parse(raw);if(!x||x.version!==1||!Array.isArray(x.completed))return [];return [...new Set(x.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<LEVELS.length))].sort((a,b)=>a-b);}catch{return [];}}
export function encodeProgress(completed){return JSON.stringify({version:1,completed:parseProgress(JSON.stringify({version:1,completed}))});}
