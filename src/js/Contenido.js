document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'ff614caf65da4607bc3000fa8f94370d';
    const gamesContainer = document.querySelector('.Contenido-principal');

    function obtenerListaJuegos() {
        // Obtén el término de búsqueda de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const terminoBusqueda = urlParams.get('search');

        if (terminoBusqueda) {
            // Si hay un término de búsqueda, realizar la solicitud con el término
            fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${terminoBusqueda}`)
                .then(response => response.json())
                .then(data => {
                    const juegos = data.results;
                    mostrarListaJuegos(juegos);
                })
                .catch(error => {
                    console.error('Error fetching data from RAWG API', error);
                });
        } else {
            // Si no hay término de búsqueda, obtener la lista completa
            fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const juegos = data.results;
                    mostrarListaJuegos(juegos);
                })
                .catch(error => {
                    console.error('Error fetching data from RAWG API', error);
                });
        }
    }

    function mostrarDetallesJuego(juego, contenedor) {
        const detallesElement = document.createElement('div');
        
        detallesElement.classList.add('Detalles-juego');

        detallesElement.innerHTML = `
            <h2>${juego.name}</h2>
            <img class="imagen-juego" src="${juego.background_image}" alt="${juego.name}">
            <p>Categoría: ${juego.genres.map(genre => genre.name).join(', ')}</p>
            <p>Rating: ${juego.rating || 'Sin rating'}</p>
            <a href="detalles-juego.html?gameId=${juego.id}">Ver más detalles</a>
        `;
        contenedor.appendChild(detallesElement);
    }

    function ocultarDetallesJuego(contenedor) {
        const detallesElement = contenedor.querySelector('.Detalles-juego');
        if (detallesElement) {
            detallesElement.remove();
        }
    }

    function mostrarListaJuegos(juegos) {
        juegos.forEach(juego => {
            const juegoElement = document.createElement('div');
            juegoElement.classList.add('Contenedor-juego');
            juegoElement.innerHTML = `
                <h2>${juego.name}</h2>
                <img class="imagen-juego" src="${juego.background_image}" alt="${juego.name}">
            `;

            juegoElement.addEventListener('mouseenter', function () {
                mostrarDetallesJuego(juego, juegoElement);
            });

            juegoElement.addEventListener('mouseleave', function () {
                ocultarDetallesJuego(juegoElement);
            });

            gamesContainer.appendChild(juegoElement);
        });
    }

    const btnJuegosPopulares = document.getElementById('btnJuegosPopulares');
    btnJuegosPopulares.addEventListener('click', function (event) {
        event.preventDefault();
        obtenerJuegosPopularesDelUltimoAnio();
    });

    function obtenerJuegosPopularesDelUltimoAnio() {
        // Obtén la fecha actual
        const fechaActual = new Date();
    
        // Calcula la fecha del último año restando 1 al año actual
        const fechaUltimoAnio = new Date(fechaActual);
        fechaUltimoAnio.setFullYear(fechaUltimoAnio.getFullYear() - 1);
    
        // Formatea las fechas en el formato YYYY-MM-DD que acepta la API
        const fechaActualFormateada = fechaActual.toISOString().split('T')[0];
        const fechaUltimoAnioFormateada = fechaUltimoAnio.toISOString().split('T')[0];
    
        // Realiza la solicitud a la API para obtener juegos más populares del último año
        fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=${fechaUltimoAnioFormateada},${fechaActualFormateada}&ordering=-rating&page_size=20`)
            .then(response => response.json())
            .then(data => {
                const juegosPopulares = data.results;
                // Limpia el Contenido-principal antes de mostrar los nuevos juegos
                gamesContainer.innerHTML = '';
                const tituloLista = document.createElement('div');
                tituloLista.classList.add('titulo-lista');
                tituloLista.innerHTML = '<h1>Lista de Juegos</h1>';
                gamesContainer.appendChild(tituloLista);
                mostrarListaJuegos(juegosPopulares);
            })
            .catch(error => {
                console.error('Error fetching popular games from RAWG API', error);
            });
    }

    function obtenerJuegosAnticipadosDelAnio() {
        // Obtén la fecha actual
        const fechaActual = new Date();
    
        // Calcula la fecha del último año restando 1 al año actual
        const fechaInicioAnticipados = new Date(fechaActual);
        fechaInicioAnticipados.setFullYear(fechaInicioAnticipados.getFullYear() - 1);
    
        // Formatea las fechas en el formato YYYY-MM-DD que acepta la API
        const fechaActualFormateada = fechaActual.toISOString().split('T')[0];
        const fechaInicioAnticipadosFormateada = fechaInicioAnticipados.toISOString().split('T')[0];
    
        // Realiza la solicitud a la API para obtener juegos más anticipados del último año
        const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${fechaInicioAnticipadosFormateada},${fechaActualFormateada}&ordering=-added&page_size=20`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos de la API:', data); // Imprime en la consola para depuración
                const juegosAnticipados = data.results;
                // Limpia el Contenido-principal antes de mostrar los nuevos juegos
                gamesContainer.innerHTML = '';
                const tituloLista = document.createElement('div');
                tituloLista.classList.add('titulo-lista');
                tituloLista.innerHTML = '<h1>Lista de Juegos</h1>';
                gamesContainer.appendChild(tituloLista);
                mostrarListaJuegos(juegosAnticipados);
            })
            .catch(error => {
                console.error('Error fetching anticipated games from RAWG API', error);
            });
    }
    
    const btnJuegosAnticipados = document.getElementById('btnJuegosAnticipados');
    btnJuegosAnticipados.addEventListener('click', function (event) {
        event.preventDefault();
        obtenerJuegosAnticipadosDelAnio();
    });
    

    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    
        searchInput.addEventListener('keyup', function (event) {
        // Verifica si la tecla presionada es "Enter"
        if (event.key === 'Enter') {
            const termino = searchInput.value.trim();

            if (termino.length > 0) {
                // Recargar la página con el término de búsqueda como parámetro
                window.location.href = `?search=${termino}`;
            }
            else {
                // Recargar la página con el término de búsqueda como parámetro
                window.location.href = `index.html`;
                }
        }   
    });

        // Listener para el clic del botón
    searchButton.addEventListener('click', function () {
    const termino = searchInput.value.trim();
    if (termino.length > 0) {
        // Recargar la página con el término de búsqueda como parámetro
        window.location.href = `?search=${termino}`;
    } else {
        // Si termino.length es igual a 0, redirigir al inicio
        window.location.href = 'index.html';
    }
    });

    // Obtener la lista de juegos al cargar la página
    obtenerListaJuegos();
});
