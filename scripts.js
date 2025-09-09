// --- LÓGICA PARA LA PÁGINA DE LOGIN (index.html) ---

const okButton = document.getElementById('okButton');
const cancelButton = document.getElementById('cancelButton');
const usernameInput = document.getElementById('username');

// El 'if' asegura que este código solo se ejecute en la página de login
if (okButton) {
    okButton.addEventListener('click', () => {
        const username = usernameInput.value;
        if (username.trim() === '') {
            alert('Por favor, ingrese un nombre.');
        } else {
            localStorage.setItem('win98_username', username);
            window.location.href = 'infografia.html';
        }
    });

    // Evento para la tecla Enter
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            okButton.click();
        }
    });
}


// --- LÓGICA PARA LA PÁGINA DE LA INFOGRAFÍA (infografia.html) ---

document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL RELOJ ---
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-AR', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            clockElement.textContent = timeString.replace(' p. m.', ' PM').replace(' a. m.', ' AM');
        }
        setInterval(updateClock, 1000);
        updateClock();
    }

    // --- LÓGICA PARA LA VENTANA DEL EXPLORADOR ---
    const iconOrigen = document.getElementById('icon-origen');
    const windowOrigen = document.getElementById('window-origen');
    
    if (iconOrigen && windowOrigen) {
        // Abrir la ventana
        iconOrigen.addEventListener('click', () => {
            windowOrigen.style.display = 'block';
        });

        // Cerrar la ventana
        const closeButton = windowOrigen.querySelector('.close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                windowOrigen.style.display = 'none';
            });
        }
    }
    
    // --- LÓGICA PARA MOVER LA VENTANA ---
    
    // Seleccionamos la barra de título de nuestra ventana
    const titleBar = windowOrigen.querySelector('.title-bar');
    let isDragging = false;
    let offsetX, offsetY;

    // 1. Cuando el usuario hace clic en la barra de título
    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        
        // Calculamos la diferencia entre el clic y la esquina de la ventana
        // para que no "salte" al arrastrar.
        offsetX = e.clientX - windowOrigen.offsetLeft;
        offsetY = e.clientY - windowOrigen.offsetTop;
        
        // Evita que se seleccione texto al arrastrar
        e.preventDefault();
    });

    // 2. Cuando el usuario mueve el mouse por la página
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            // Actualiza la posición de la ventana restando el offset inicial
            windowOrigen.style.left = `${e.clientX - offsetX}px`;
            windowOrigen.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // 3. Cuando el usuario suelta el clic del mouse
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

});

// --- LÓGICA PARA ABRIR, CERRAR Y MOVER VENTANAS ---
let highestZIndex = 10;
const icons = document.querySelectorAll('.icon');
const windows = document.querySelectorAll('.window');

// Lógica específica para el ícono de Origen (Explorador)
const iconOrigen = document.getElementById('icon-origen');
const windowOrigen = document.getElementById('window-origen');

if (iconOrigen && windowOrigen) {
    iconOrigen.addEventListener('click', () => {
        windowOrigen.style.display = 'block';
        highestZIndex++;
        windowOrigen.style.zIndex = highestZIndex;
    });
}

// Lógica específica para el ícono de Arte (Internet Explorer)
const iconArte = document.getElementById('icon-arte');
const windowArte = document.getElementById('window-arte');

if (iconArte && windowArte) {
    iconArte.addEventListener('click', () => {
        windowArte.style.display = 'block';
        highestZIndex++;
        windowArte.style.zIndex = highestZIndex;
    });
}


// --- Lógica Común para todas las ventanas (Cerrar y Mover) ---

// Cerrar cualquier ventana con su botón 'r'
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.window').style.display = 'none';
    });
});

// Mover cualquier ventana
let activeWindow = null;
let offsetX, offsetY;

windows.forEach(windowEl => {
    const titleBar = windowEl.querySelector('.title-bar');

    const activateWindow = (e) => {
        activeWindow = windowEl;
        offsetX = e.clientX - activeWindow.getBoundingClientRect().left;
        offsetY = e.clientY - activeWindow.getBoundingClientRect().top;
        
        highestZIndex++;
        activeWindow.style.zIndex = highestZIndex;
    };

    titleBar.addEventListener('mousedown', activateWindow);
    
    windowEl.addEventListener('mousedown', (e) => {
        if(windowEl !== activeWindow) {
            activateWindow(e);
        }
    });
});

document.addEventListener('mousemove', (e) => {
    if (activeWindow) {
        e.preventDefault();
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        activeWindow.style.left = `${newX}px`;
        activeWindow.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    activeWindow = null;
});

// --- LÓGICA PARA LA VENTANA DE MEDIA PLAYER ---
    const iconLey = document.getElementById('icon-ley');
    const windowLey = document.getElementById('window-ley');
    
    if (iconLey && windowLey) {
        // Abrir la ventana
        iconLey.addEventListener('click', () => {
            windowLey.style.display = 'block';
            highestZIndex++; // Asegura que se ponga al frente
            windowLey.style.zIndex = highestZIndex;
        });

        // La lógica para cerrar y mover ya funciona para todas las ventanas.
    }

    // --- LÓGICA PARA LA VENTANA DE PAINT ---
    const iconDebate = document.getElementById('icon-debate');
    const windowDebate = document.getElementById('window-debate');
    
    if (iconDebate && windowDebate) {
        // Abrir la ventana
        iconDebate.addEventListener('click', () => {
            windowDebate.style.display = 'block';
            highestZIndex++; // Asegura que se ponga al frente
            windowDebate.style.zIndex = highestZIndex;
        });

        // La lógica para cerrar y mover ya funciona para todas las ventanas.
    }

    // --- LÓGICA PARA LAS CARPETAS DENTRO DEL EXPLORADOR ---
    const folder1960 = document.getElementById('folder-1960');
    const window1960Texto = document.getElementById('window-1960-texto');
    const window1960Imagen = document.getElementById('window-1960-imagen');

    if (folder1960 && window1960Texto && window1960Imagen) {
        
        folder1960.addEventListener('click', () => {
            // Muestra la ventana de texto
            window1960Texto.style.display = 'block';
            highestZIndex++;
            window1960Texto.style.zIndex = highestZIndex;

            // Muestra la ventana de imagen
            window1960Imagen.style.display = 'block';
            highestZIndex++;
            window1960Imagen.style.zIndex = highestZIndex;
        });
    }

    // --- LÓGICA PARA LAS CARPETAS DENTRO DEL EXPLORADOR ---
    document.querySelectorAll('.folder-item').forEach(folder => {
        folder.addEventListener('click', () => {
            const folderId = folder.id; // ej: "folder-1960"
            if(folderId) {
                const baseId = folderId.split('-')[1]; // ej: "1960"
                
                // Busca y abre las dos ventanas correspondientes
                const windowTexto = document.getElementById('window-' + baseId + '-texto');
                const windowImagen = document.getElementById('window-' + baseId + '-imagen');

                if (windowTexto) {
                    windowTexto.style.display = 'block';
                    highestZIndex++;
                    windowTexto.style.zIndex = highestZIndex;
                }
                if (windowImagen) {
                    windowImagen.style.display = 'block';
                    highestZIndex++;
                    windowImagen.style.zIndex = highestZIndex;
                }
            }
        });
    });

    // --- LÓGICA PARA LA VENTANA DE NOTAS ---
    const iconNotas = document.getElementById('icon-notas');
    const windowNotas = document.getElementById('window-notas');
    
    if (iconNotas && windowNotas) {
        
        iconNotas.addEventListener('click', () => {
            // Muestra la ventana de texto editable
            windowNotas.style.display = 'block';
            highestZIndex++;
            windowNotas.style.zIndex = highestZIndex;
        });
    }

    // --- LÓGICA PARA EL BOTÓN ENVIAR ---
    const sendButton = document.getElementById('sendButton');
    const commentsWindow = document.getElementById('window-comentarios');
    
    if (sendButton && commentsWindow) {
        const commentsContainer = commentsWindow.querySelector('.comments-container');
        const notesTextarea = document.querySelector('#window-notas textarea');

        sendButton.addEventListener('click', () => {
            // 1. Obtiene el nombre de usuario guardado y el texto del comentario.
            const username = localStorage.getItem('win98_username') || 'Invitado';
            const newCommentText = notesTextarea.value.trim();

            // Si no hay texto, no hace nada.
            if (newCommentText === '') {
                alert('Por favor, escribí un comentario antes de enviar.');
                return;
            }

            // 2. Crea el nuevo elemento de comentario.
            const newCommentElement = document.createElement('p');
            newCommentElement.innerHTML = `<strong>${username}:</strong> ${newCommentText}`;
            
            // 3. Agrega el nuevo comentario al contenedor.
            commentsContainer.appendChild(newCommentElement);
            
            // 4. Muestra la ventana de comentarios.
            commentsWindow.style.display = 'block';
            highestZIndex++;
            commentsWindow.style.zIndex = highestZIndex;

            // 5. Opcional: Limpia el textarea y cierra la ventana de notas.
            notesTextarea.value = '';
            document.getElementById('window-notas').style.display = 'none';
        });
    }