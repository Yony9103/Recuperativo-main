document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    if (gameId) {
        obtenerDetallesJuego(gameId);
    } else {
        console.error('ID del juego no proporcionado en la URL');
    }
});

function obtenerDetallesJuego(gameId) {
    const apiKey = 'ff614caf65da4607bc3000fa8f94370d';
    const detallesContainer = document.getElementById('detalles-juego');

    fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const juego = data;

            // Construir el contenido detallado
            const detallesElement = document.createElement('div');
            detallesElement.classList.add('Contenido-detalles');
            detallesElement.innerHTML = `
                <h2>${juego.name}</h2>
                <img src="${juego.background_image}" alt="${juego.name}">
                <p class="Descripcion">${juego.description || 'Sin descripción'}</p>
                <p>Categorías: <span>${juego.genres.map(genre => genre.name).join(', ')}</span></p>
                <p>Fecha de lanzamiento: <span>${juego.released}</span></p>
                <p>Rating: <span>${juego.rating || 'N/A'}</span></p>
                <p>Desarrolladores: ${juego.developers.map(dev => dev.name).join(', ')}</p>
                <p>Plataformas: <span>${juego.platforms.map(platform => platform.platform.name).join(', ')}</span></p>
            `;

            const volverButton = document.createElement('button');
            volverButton.innerText = 'Volver';
            volverButton.addEventListener('click', function () {
                window.location.href = 'index.html';
            });

            detallesElement.appendChild(volverButton);
            detallesContainer.appendChild(detallesElement);
        })
        .catch(error => {
            console.error('Error fetching game details from RAWG API', error);
        });
}