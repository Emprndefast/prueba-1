const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const adb = require('./utils-adb');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('detectar', async () => adb.detectar());
ipcMain.handle('leer-imei', async () => adb.leerIMEI());
ipcMain.handle('leer-numero-serie', async () => adb.leerNumeroSerie());
ipcMain.handle('reiniciar', async () => adb.reiniciar());
ipcMain.handle('formatear', async () => adb.formatear());
ipcMain.handle('ejecutar', async (_, comando) => adb.ejecutarComando(comando));
ipcMain.handle('estado-bateria', async () => adb.estadoBateria());
ipcMain.handle('instalar-apk', async (_, ruta) => adb.instalarAPK(ruta));
ipcMain.handle('captura-pantalla', async () => adb.capturaPantalla());
