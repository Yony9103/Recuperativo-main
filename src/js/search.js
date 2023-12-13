// search.js

function inicializarBarraBusqueda(juegos) {
    const searchInput = document.getElementById('search');
    const searchResultsContainer = document.getElementById('searchResults');

    searchInput.addEventListener('input', function () {
        const termino = searchInput.value.trim();
        if (termino.length > 0) {
            const resultados = juegos.filter(juego => juego.name.toLowerCase().includes(termino.toLowerCase()));
            mostrarResultados(resultados, searchResultsContainer);
        } else {
            searchResultsContainer.innerHTML = '';
        }
    });
}

function mostrarResultados(resultados, container) {
    container.innerHTML = '';

    resultados.forEach(juego => {
        const resultadoElement = document.createElement('div');
        resultadoElement.classList.add('Resultado-busqueda');
        resultadoElement.textContent = juego.name;
        container.appendChild(resultadoElement);
    });
}

export { inicializarBarraBusqueda };
