# 🌤️ App del Clima

Una aplicación web sencilla desarrollada con **HTML, CSS y JavaScript** que permite consultar el **clima actual de una ciudad** utilizando la API de **Open-Meteo**.

---

## 📌 Descripción del Proyecto

Esta aplicación permite al usuario escribir el nombre de una ciudad en una barra de búsqueda y obtener su **temperatura actual** en tiempo real.

El funcionamiento se divide en dos pasos:

1. Se consulta la **API de Geocodificación de Open-Meteo** para obtener la **latitud y longitud** de la ciudad.
2. Con esas coordenadas, se consulta la **API de Pronóstico del Clima de Open-Meteo** para recuperar los datos meteorológicos actuales.

Actualmente, la aplicación muestra en pantalla:

- Nombre de la ciudad
- Temperatura actual en grados Celsius (°C)

Además, el código ya está preparado para trabajar también con:

- Código meteorológico (`weather_code`)
- Velocidad del viento (`wind_speed_10m`)

---

## 🚀 Tecnologías Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Fetch API**
- **Open-Meteo Geocoding API**
- **Open-Meteo Weather Forecast API**

---

## 🧠 Funcionalidades

- 🔎 Buscar una ciudad por nombre
- 🌡️ Mostrar la temperatura actual
- ⌨️ Buscar haciendo clic en el botón o presionando **Enter**
- ⚠️ Mostrar mensajes de error si la ciudad no existe o si ocurre un problema
- ⏳ Mostrar mensaje de carga mientras se consulta la API
- 📱 Diseño responsivo básico para escritorio y móvil

---

## 📂 Estructura del Proyecto

```bash
weather-app/
│
├── index.html
├── styles.css
└── app.js
