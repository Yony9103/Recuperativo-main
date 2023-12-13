document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    // Verifica si hay un tema almacenado en el localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        body.classList.add(savedTheme);
        // Actualiza la clase del botón de tema según el tema guardado
        if (savedTheme === 'theme-dark') {
            themeToggle.classList.add('moon-theme');
        } else {
            themeToggle.classList.add('sun-theme');
        }
    } else {
        // Si no hay tema guardado, agrega la clase de tema claro por defecto
        body.classList.add('theme-light');
        themeToggle.classList.add('sun-theme');
    }

    // Agrega el evento de clic al botón de tema
    themeToggle.addEventListener('click', function () {
        // Cambia el tema y guarda en el localStorage
        body.classList.toggle('theme-dark');
        body.classList.toggle('theme-light');

        themeToggle.classList.toggle('moon-theme');
        themeToggle.classList.toggle('sun-theme');

        const currentTheme = body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
        localStorage.setItem('theme', currentTheme);
    });
});
