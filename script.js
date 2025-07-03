// Tu token de IUCN
const API_KEY = "QzRYbziNhTR4j3ZntAYbcFz6DiSN5B3BQRDC";

// Proxy temporal para evitar errores CORS en el navegador
const proxy = "https://cors-anywhere.herokuapp.com/";

// Inicializar el mapa
const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 18,
}).addTo(map);

// Lista de especies a mostrar (puedes ampliar esto)
const especies = [
  {
    nombreCientifico: "Panthera onca",
    nombreComun: "Jaguar",
    coordenadas: [-3.4, -62.2],
  },
  {
    nombreCientifico: "Phocoena sinus",
    nombreComun: "Vaquita marina",
    coordenadas: [30.8, -114.7],
  },
];

// Consultar y mostrar cada especie
especies.forEach(async (especie) => {
  const url = `${proxy}https://apiv3.iucnredlist.org/api/v3/species/${encodeURIComponent(especie.nombreCientifico)}?token=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.result || !data.result[0]) {
      console.warn("No se encontró información para:", especie.nombreCientifico);
      return;
    }

    const info = data.result[0];

    const popupHTML = `
      <strong>${especie.nombreComun}</strong><br>
      Nombre científico: ${especie.nombreCientifico}<br>
      Estado: <b>${info.category}</b><br>
      Clase: ${info.class_name || "Desconocida"}
    `;

    // Crear marcador en el mapa
    L.circleMarker(especie.coordenadas, {
      radius: 8,
      color: info.category === "CR" ? "red" :
             info.category === "EN" ? "orange" :
             info.category === "VU" ? "yellow" : "gray",
      fillOpacity: 0.7,
    }).addTo(map).bindPopup(popupHTML);

  } catch (err) {
    console.error("Error al obtener datos de:", especie.nombreCientifico, err);
  }
});
