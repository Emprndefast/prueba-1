const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  detectar: () => ipcRenderer.invoke('detectar'),
  leerIMEI: () => ipcRenderer.invoke('leer-imei'),
  leerNumeroSerie: () => ipcRenderer.invoke('leer-numero-serie'),
  reiniciar: () => ipcRenderer.invoke('reiniciar'),
  formatear: () => ipcRenderer.invoke('formatear'),
  estadoBateria: () => ipcRenderer.invoke('estado-bateria'),
  instalarAPK: (ruta) => ipcRenderer.invoke('instalar-apk', ruta),
  capturaPantalla: () => ipcRenderer.invoke('captura-pantalla'),
  ejecutar: (cmd) => ipcRenderer.invoke('ejecutar', cmd),
});
