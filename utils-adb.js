const { exec } = require('child_process');
const adbPath = `"${__dirname}/adb/adb.exe"`; // ruta relativa

function ejecutarComando(cmd) {
  return new Promise((resolve, reject) => {
    exec(`${adbPath} ${cmd}`, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout.trim());
    });
  });
}

module.exports = {
  detectar: async () => {
    try {
      const dispositivos = await ejecutarComando("devices");
      if (!dispositivos.includes("device")) {
        return "No se ha detectado ningún dispositivo conectado.";
      }
  
      // Obtener las propiedades del dispositivo usando un archivo alternativo
      const detalles = await ejecutarComando("shell cat /system/build.prop");
  
      // Verifica la salida completa
      console.log("Detalles del dispositivo:", detalles);
  
      const modelo = detalles.match(/ro.product.model=(.*)/)?.[1] || "Desconocido";
      const marca = detalles.match(/ro.product.brand=(.*)/)?.[1] || "Desconocido";
      const versionAndroid = detalles.match(/ro.build.version.release=(.*)/)?.[1] || "Desconocido";
      const fabricante = detalles.match(/ro.product.manufacturer=(.*)/)?.[1] || "Desconocido";
      const idDispositivo = detalles.match(/ro.serialno=(.*)/)?.[1] || "Desconocido";
  
      return {
        modelo,
        marca,
        versionAndroid,
        fabricante,
        idDispositivo
      };
    } catch (error) {
      return `Error al detectar el dispositivo: ${error.message}`;
    }
  },
  
  
  
  
  leerIMEI: () => ejecutarComando("shell service call iphonesubinfo 1"),
  leerNumeroSerie: () => ejecutarComando("get-serialno"),
  reiniciar: () => ejecutarComando("reboot"),
  formatear: () => ejecutarComando("shell recovery --wipe_data"),
  estadoBateria: async () => {
    const salida = await ejecutarComando("shell dumpsys battery");

    const parsearValor = (clave) => {
      const linea = salida.split('\n').find(l => l.trim().startsWith(clave));
      return linea ? linea.split(":")[1].trim() : "undefined";
    };

    return {
      level: parseInt(parsearValor("level")),
      voltage: parseInt(parsearValor("voltage")),
      temperature: parseInt(parsearValor("temperature")),
      technology: parsearValor("technology"),
      status: parsearValor("status"),
      health: parsearValor("health"),
      chargeCounter: parseInt(parsearValor("charge_counter")),
      scale: parseInt(parsearValor("scale")),
    };
  },
  instalarAPK: (ruta) => ejecutarComando(`install "${ruta}"`),
  capturaPantalla: () => ejecutarComando("shell screencap -p /sdcard/screen.png && pull /sdcard/screen.png"),
  ejecutarComando,
};
