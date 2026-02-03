// Initialize map centered on Switzerland
const map = L.map('map').setView([46.8182, 8.2275], 8);

// Add OpenStreetMap tiles with a clean style
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Custom icon definition
const swissIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #e30613; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
});

// Add markers for each location
locations.forEach(loc => {
    const marker = L.marker(loc.coordinates, { icon: swissIcon }).addTo(map);

    // Create popup content
    const popupContent = `
        <div class="popup-content">
            <h3>${loc.name}</h3>
            <p>Vorgestellt bei "Mini Schwiiz, dini Schwiiz"</p>
            <a href="${loc.url}" target="_blank" class="btn">Zur Sendung</a>
        </div>
    `;

    marker.bindPopup(popupContent);
});

// Add a slight animation to markers on load (optional visual flair)
document.addEventListener('DOMContentLoaded', () => {
    // Zoom in slightly after load for effect
    setTimeout(() => {
        map.flyTo([46.8182, 8.2275], 9, {
            duration: 2
        });
    }, 1000);
});
