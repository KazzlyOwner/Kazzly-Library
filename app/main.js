const {app,BrowserWindow,shell}=require('electron');
const URL='https://kazzlyowner.github.io/Kazzly-Library/';
if(process.platform==='linux')app.commandLine.appendSwitch('no-sandbox');
function crear(){
  const w=new BrowserWindow({width:1100,height:760,autoHideMenuBar:true,title:'Kazzly Library',backgroundColor:'#050203'});
  w.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
  w.webContents.on('will-navigate',(e,u)=>{if(!u.startsWith(URL)&&!u.startsWith('file:')){e.preventDefault();shell.openExternal(u)}});
  w.webContents.on('did-fail-load',(e,c,d,u,principal)=>{if(principal)w.loadFile('offline.html')});
  w.loadURL(URL);
}
app.whenReady().then(crear);
app.on('window-all-closed',()=>app.quit());
