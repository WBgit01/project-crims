const map = L.map('map').setView([13.4768, 121.8965], 14);
const streets = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
});
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri'
});

  const baseMaps = {
    "Streets": streets,
    "Satellite": satellite
  };

  L.control.layers(baseMaps).addTo(map);
  streets.addTo(map);

  let heatPoints = [];
  let heatLayer = L.heatLayer([], {
    radius: 25,
    blur: 15,
    maxZoom: 17,
  });

  let heatmapVisible = false;

  document.getElementById('plotBtn').addEventListener('click', () => {
    alert("Click on the map to place the crime location.");
    map.once('click', function (e) {
      const latlng = e.latlng;
      const offenseType = document.getElementById('offense').value;

      L.circle(latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.4,
        radius: 300
      }).addTo(map).bindPopup(`Crime Reported: ${offenseType}`).openPopup();

      heatPoints.push([latlng.lat, latlng.lng]);
      heatLayer.setLatLngs(heatPoints);
    });
  });

  document.getElementById('heatmapBtn').addEventListener('click', () => {
    if (heatmapVisible) {
    map.removeLayer(heatLayer);
  } else {
    heatLayer.addTo(map);
  }
  heatmapVisible = !heatmapVisible;
});