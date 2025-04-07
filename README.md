# 📱 Reparaciones Android

Una herramienta de escritorio creada con **Electron** y **Node.js** para realizar tareas de reparación y mantenimiento en dispositivos Android. Entre sus funcionalidades, se incluyen:

- Leer **IMEI** y **número de serie**
- Reiniciar en diferentes modos (**Recovery**, **Download**, **Seguro**)
- **Instalar APKs**
- Ver el **estado de la batería**
- Tomar **capturas de pantalla**
- **Formatear** el dispositivo (reset de fábrica)
- **Desbloquear el bootloader**
- Ver **información general** del dispositivo
- Detectar la **conexión del dispositivo** automáticamente

## 🚀 Requisitos

Para poder ejecutar esta aplicación, asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org)
- **ADB** (Android Debug Bridge) incluido en la carpeta `adb/`
- Sistema operativo: **Windows**

## 🛠 Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tuusuario/reparaciones-android.git
    ```

2. Navega a la carpeta del proyecto:
    ```bash
    cd reparaciones-android
    ```

3. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

4. Inicia la aplicación:
    ```bash
    npm start
    ```

## ⚙️ Funcionalidades

Las siguientes funcionalidades están disponibles para interactuar con tu dispositivo Android conectado:

- **Detectar dispositivo:** Reconoce si un dispositivo Android está conectado a tu PC.
- **Leer IMEI:** Obtiene el IMEI del dispositivo.
- **Leer número de serie:** Muestra el número de serie del dispositivo.
- **Reiniciar en Recovery/Download/Modo Seguro:** Permite reiniciar el dispositivo en diferentes modos.
- **Instalar APK:** Instala un archivo APK en el dispositivo.
- **Estado de la batería:** Muestra el estado actual de la batería.
- **Captura de pantalla:** Toma una captura de pantalla del dispositivo.
- **Formatear dispositivo:** Realiza un factory reset del dispositivo.
- **Desbloquear bootloader:** Permite desbloquear el bootloader del dispositivo.
- **Ver información del dispositivo:** Muestra detalles sobre el dispositivo conectado.

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT. Puedes consultar más detalles en el archivo `LICENSE` dentro de este repositorio.

---

¡Disfruta reparando tus dispositivos Android de manera fácil y eficiente con esta herramienta!
