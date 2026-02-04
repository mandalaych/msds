document.addEventListener('DOMContentLoaded', () => {
    // Initialize map centered on Switzerland
    const map = L.map('map').setView([46.8182, 8.2275], 8);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fetch location data
    fetch('locations.json')
        .then(response => response.json())
        .then(locations => {
            locations.forEach(location => {
                if (location.lat && location.lng) {
                    const marker = L.marker([location.lat, location.lng]).addTo(map);

                    const popupContent = createPopupContent(location);
                    marker.bindPopup(popupContent);
                }
            });
        })
        .catch(error => console.error('Error loading locations:', error));
});

function createPopupContent(location) {
    const container = document.createElement('div');

    const title = document.createElement('div');
    title.className = 'popup-location-title';
    title.textContent = location.name;
    container.appendChild(title);

    location.episodes.forEach(episode => {
        const item = document.createElement('div');
        item.className = 'episode-item';

        const epTitle = document.createElement('div');
        epTitle.className = 'episode-title';
        epTitle.textContent = episode.title;
        item.appendChild(epTitle);

        const epDate = document.createElement('div');
        epDate.className = 'episode-date';
        const dateObj = new Date(episode.date);
        epDate.textContent = dateObj.toLocaleDateString('de-CH');
        item.appendChild(epDate);

        const epLink = document.createElement('div');
        epLink.className = 'episode-link';
        const link = document.createElement('a');
        link.href = episode.url;
        link.target = '_blank';
        link.textContent = 'Sendung anschauen';
        epLink.appendChild(link);
        item.appendChild(epLink);

        container.appendChild(item);
    });

    return container;
}
