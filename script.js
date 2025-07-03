const map = L.map('map').setView([0, 0], 2); // Vista mundial

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 18
}).addTo(map);

// Ejemplo de especies en peligro
const especies = [
  {
    nombre: "Jaguar",
    coords: [-3.4653, -62.2159],
    estado: "En peligro",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Jaguar.jpg"
  },
  {
    nombre: "Vaquita marina",
    coords: [30.8, -114.7],
    estado: "Críticamente en peligro",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/5/53/Vaquita.jpg"
  }
];

especies.forEach(e => {
  L.marker(e.coords).addTo(map)
    .bindPopup(`
      <strong>${e.nombre}</strong><br>
      Estado: ${e.estado}<br>
      <img src="${e.imagen}" width="150">
    `);
});
