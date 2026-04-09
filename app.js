const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

// Buscar coordenadas de la ciudad
async function getCoordinates(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontró la ciudad.");
  }

  return {
    name: data.results[0].name,
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude
  };
}

// Obtener clima usando latitud y longitud
async function getWeather(latitude, longitude) {
  try {
    if (latitude == null || longitude == null) {
      throw new Error("Latitud y longitud son obligatorias.");
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`;

    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error("No se pudo consultar la API del clima.");
    }

    const data = await response.json();

    if (!data.current) {
      throw new Error("No se encontraron datos meteorológicos.");
    }

    return {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
}

/**
 * Obtiene el clima actual de una ubicación usando la API de Open-Meteo.
 *
 * Realiza una solicitud HTTP con la latitud y longitud proporcionadas
 * y devuelve la temperatura actual junto con el código del clima.
 *
 * @async
 * @param {number} latitude - Latitud de la ubicación que se desea consultar.
 * @param {number} longitude - Longitud de la ubicación que se desea consultar.
 * @returns {Promise<{
 *   temperature?: number,
 *   weatherCode?: number,
 *   error?: boolean,
 *   message?: string
 * }>}
 * Un objeto con:
 * - `temperature`: temperatura actual en °C.
 * - `weatherCode`: código meteorológico de Open-Meteo.
 * - `error`: indica si ocurrió un error.
 * - `message`: mensaje descriptivo del error.
 *
 * @example
 * const weather = await getWeather(19.4326, -99.1332);
 *
 * if (weather.error) {
 *   console.error(weather.message);
 * } else {
 *   console.log(`Temperatura: ${weather.temperature}°C`);
 *   console.log(`Código del clima: ${weather.weatherCode}`);
 * }
 */

// Función principal
async function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    result.innerHTML = "<p>Por favor, escribe una ciudad.</p>";
    return;
  }

  result.innerHTML = "<p>Cargando...</p>";

  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(location.latitude, location.longitude);

result.innerHTML = `
  <h2>${location.name}</h2>
  <p>🌡️ Temperatura actual: <strong>${weather.temperature}°C</strong></p>
`;
  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// Evento del botón
searchBtn.addEventListener("click", searchWeather);

// También buscar con Enter
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});