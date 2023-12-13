document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById("form-comentarios");
    var comentarioInput = document.getElementById("comentario");
    var lista = document.getElementById("Comentarios");

    function guardarComentario(texto) {
        // Agregar un nuevo comentario
        var comentario = {
            texto: texto,
            fecha: new Date().toLocaleString()
        };

        var transformacion = JSON.stringify(comentario);
        var n = localStorage.length;
        localStorage.setItem("comentario-" + n, transformacion);

        mostrarComentarios();
        limpiarFormulario();
    }

    function mostrarComentarios() {
        // Obtener todas las claves que comienzan con "comentario-"
        var clavesComentarios = [];
        for (var i = 0; i < localStorage.length; i++) {
            var clave = localStorage.key(i);
            if (clave.startsWith("comentario-")) {
                clavesComentarios.push(clave);
            }
        }

        // Ordenar las claves de comentarios por fecha
        clavesComentarios.sort(function (a, b) {
            var fechaA = JSON.parse(localStorage.getItem(a)).fecha;
            var fechaB = JSON.parse(localStorage.getItem(b)).fecha;
            return new Date(fechaA) - new Date(fechaB);
        });

        // Limpiar la lista
        lista.innerHTML = "";

        // Recorrer las claves ordenadas
        for (var i = 0; i < clavesComentarios.length; i++) {
            var clave = clavesComentarios[i];
            var valor = localStorage.getItem(clave);

            try {
                // Intentar analizar el valor como JSON
                var comentarioObj = JSON.parse(valor);
                // Si tiene éxito, mostrar el comentario
                mostrarComentario(comentarioObj);
            } catch (error) {
                // Si falla, probablemente sea el tema ('theme-dark' o 'theme-light'), 
                // entonces ignora este elemento del localStorage
                console.error('Error al analizar JSON en el localStorage:', error);
            }
        }
    }

    function mostrarComentario(comentario) {
        // Crear un elemento li para el comentario
        var li = document.createElement("li");
    
        // Crear un elemento span para el texto del comentario
        var spanTexto = document.createElement("span");
        spanTexto.textContent = comentario.texto;
        spanTexto.style.marginRight = "30px"; // Ajusta el margen derecho según tus preferencias
        spanTexto.style.marginLeft = "30px"; // Ajusta el margen derecho según tus preferencias
        spanTexto.style.float = "left"

    
        // Crear un elemento span para la fecha del comentario
        var spanFecha = document.createElement("span");
        spanFecha.textContent = comentario.fecha;
        spanFecha.style.marginRight = "10px"; // Ajusta el margen derecho según tus preferencias
        spanFecha.style.marginLeft = "30px"; // Ajusta el margen derecho según tus preferencias
        spanFecha.style.float = "left"

    
        // Crear botones para eliminar
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.float = "right"
        btnEliminar.addEventListener("click", function () {
            eliminarComentario(comentario.fecha);
        });

        li.style.borderBottom = "1px solid #ccc";
        li.style.padding = "15px";

    
        // Añadir elementos al li
        li.appendChild(spanTexto);
        li.appendChild(spanFecha);
        li.appendChild(btnEliminar);
    
        // Añadir el li a la lista
        lista.appendChild(li);
    }

    function eliminarComentario(fecha) {
        // Mostrar un mensaje de confirmación personalizado
        if (confirm("¿Estás seguro de eliminar este comentario? Esta acción no se puede deshacer.")) {
            // Buscar la clave del comentario por fecha
            for (var i = 0; i < localStorage.length; i++) {
                var clave = localStorage.key(i);
                if (clave.startsWith("comentario-")) {
                    var comentario = JSON.parse(localStorage.getItem(clave));
                    if (comentario.fecha === fecha) {
                        localStorage.removeItem(clave);
                        break;
                    }
                }
            }

            mostrarComentarios();
        }
    }

    // Evento para enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var texto = comentarioInput.value.trim();
        if (texto) {
            guardarComentario(texto);
        }
    });

    // Limpiar el formulario
    function limpiarFormulario() {
        comentarioInput.value = "";
    }

    // Mostrar los comentarios al cargar la página
    mostrarComentarios();
});
