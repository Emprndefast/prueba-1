const resultado = document.getElementById('resultado');

// Función para mostrar el resultado formateado
function mostrarResultado(texto) {
  if (typeof texto === 'object') {
    resultado.innerHTML = `<pre>${JSON.stringify(texto, null, 2)}</pre>`;
  } else if (typeof texto === 'string' && texto.trim().startsWith('<')) {
    resultado.innerHTML = texto;
  } else {
    resultado.innerHTML = `<div class="detalle"><p>${texto}</p></div>`;
  }
}

// Botón: Detectar dispositivo
document.getElementById("detectar").onclick = async () => {
  const res = await window.api.detectar();
  mostrarResultado(`
    <div class="detalle">
      <h3>Información del Dispositivo</h3>
      <ul>
        <li><span class="label">Modelo:</span> ${res.modelo}</li>
        <li><span class="label">Marca:</span> ${res.marca}</li>
        <li><span class="label">Versión de Android:</span> ${res.android_version}</li>
        <li><span class="label">Fabricante:</span> ${res.fabricante}</li>
        <li><span class="label">ID del Dispositivo:</span> ${res.id_dispositivo}</li>
      </ul>
    </div>
  `);
};

// Botón: Leer IMEI
document.getElementById("leer_imei").onclick = async () => {
  const res = await window.api.leerIMEI();

  // Buscar si el resultado contiene "Parcel"
  if (typeof res === "string" && res.includes("Parcel")) {
    const matches = res.match(/'([0-9.]+)'/g);
    const numeros = matches?.map(m => m.replace(/[^0-9]/g, '')).join('') || "No detectado";

    resultado.innerHTML = `
      <div class="detalle">
        <h3>Detalles del Dispositivo</h3>
        <ul>
          <li><span class="label">IMEI:</span> ${numeros}</li>
        </ul>
      </div>
    `;
  } else {
    mostrarResultado(res);
  }
};


// Botón: Leer Serie
document.getElementById("leer_serie").onclick = async () => {
  const res = await window.api.leerNumeroSerie();
  mostrarResultado(`
    <div class="detalle">
      <h3>Número de Serie</h3>
      <ul>
        <li><span class="label">Serie:</span> ${res}</li>
      </ul>
    </div>
  `);
};

// Botón: Reiniciar dispositivo
document.getElementById("reiniciar").onclick = async () => {
  const res = await window.api.reiniciar();
  mostrarResultado(`<div class="detalle"><p>${res}</p></div>`);
};

// Botón: Formatear dispositivo
document.getElementById("formatear").onclick = async () => {
  const res = await window.api.formatear();
  mostrarResultado(`<div class="detalle"><p>${res}</p></div>`);
};

// Botón: Estado de la batería
document.getElementById('estado_bateria').addEventListener('click', async () => {
  const datos = await window.api.estadoBateria();

  if (!datos || datos.level === undefined) {
    resultado.innerHTML = `<p style="color: red;">Error al obtener el estado de la batería.</p>`;
    return;
  }

  resultado.innerHTML = `
    <div class="detalle">
      <h3>Estado de la Batería</h3>
      <ul>
        <li><span class="label">Nivel de carga:</span> ${datos.level}%</li>
        <li><span class="label">Voltaje:</span> ${datos.voltage} mV</li>
        <li><span class="label">Temperatura:</span> ${(datos.temperature / 10).toFixed(1)} °C</li>
        <li><span class="label">Tecnología:</span> ${datos.technology}</li>
        <li><span class="label">Estado de carga:</span> ${datos.status}</li>
        <li><span class="label">Estado de la batería:</span> ${datos.health}</li>
        <li><span class="label">Contador de carga:</span> ${datos.chargeCounter}</li>
        <li><span class="label">Escala de carga:</span> ${datos.scale}%</li>
      </ul>
    </div>
  `;
});


// Botón: Captura de pantalla
document.getElementById("captura_pantalla").onclick = async () => {
  const res = await window.api.capturaPantalla();
  mostrarResultado(`<div class="detalle"><p>${res}</p></div>`);
};

// Botón: Instalar APK
document.getElementById("instalar_apk").onclick = async () => {
  const ruta = prompt("Ruta del archivo APK:");
  if (ruta) {
    const res = await window.api.instalarAPK(ruta);
    mostrarResultado(`<div class="detalle"><p>${res}</p></div>`);
  }
};
