// --- LÓGICA PARA LA PÁGINA DE LOGIN (index.html) ---
const okButton = document.getElementById('okButton');
if (okButton) {
    const usernameInput = document.getElementById('username');
    okButton.addEventListener('click', () => {
        const username = usernameInput.value;
        if (username.trim() === '') {
            alert('Por favor, ingrese un nombre.');
        } else {
            localStorage.setItem('win98_username', username);
            window.location.href = 'infografia.html';
        }
    });
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') okButton.click();
    });
}


// --- LÓGICA PARA LA PÁGINA DE LA INFOGRAFÍA (infografia.html) ---
document.addEventListener('DOMContentLoaded', function() {

    // Variable global para controlar qué ventana está al frente
    let highestZIndex = 10;

    // --- FUNCIÓN UNIVERSAL PARA ABRIR Y PONER AL FRENTE CUALQUIER VENTANA ---
    function openWindow(windowEl) {
        if (!windowEl) return;

        if (windowEl.id === 'window-arte') {
            windowEl.style.display = 'flex';
        } else {
            windowEl.style.display = 'block';
        }
        
        highestZIndex++;
        windowEl.style.zIndex = highestZIndex;
    }

    // --- ASIGNACIÓN DE EVENTOS DE CLIC PARA ABRIR VENTANAS ---

    // 1. Íconos del escritorio
    document.querySelectorAll('.desktop-icons .icon, .desktop-icons-right .icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const windowId = 'window-' + icon.id.split('-')[1];
            openWindow(document.getElementById(windowId));
        });
    });

    // 2. Carpetas dentro del explorador
    document.querySelectorAll('.folder-item').forEach(folder => {
        folder.addEventListener('click', (e) => {
            e.stopPropagation();
            const folderId = folder.id;
            if (folderId) {
                const baseId = folderId.split('-')[1];
                openWindow(document.getElementById('window-' + baseId + '-texto'));
                openWindow(document.getElementById('window-' + baseId + '-imagen'));
            }
        });
    });

    // 3. Botones "Ver Gráfico"
    document.querySelectorAll('.view-chart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const baseId = button.id.split('-')[2];
            const windowId = 'window-' + baseId + '-grafico';
            openWindow(document.getElementById(windowId));
        });
    });
    
    // --- LÓGICA DEL RELOJ ---
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-AR', { hour: 'numeric', minute: '2-digit', hour12: true });
            clockElement.textContent = timeString.replace(' p. m.', ' PM').replace(' a. m.', ' AM');
        }
        setInterval(updateClock, 1000);
        updateClock();
    }
    
    // --- LÓGICA UNIVERSAL PARA CERRAR, MOVER Y ACTIVAR VENTANAS ---
    let activeDragWindow = null;
    let offsetX, offsetY;

    document.querySelectorAll('.window').forEach(windowEl => {
        const titleBar = windowEl.querySelector('.title-bar');

        // Pone la ventana al frente al hacer clic en cualquier parte de ella
        windowEl.addEventListener('mousedown', () => {
            highestZIndex++;
            windowEl.style.zIndex = highestZIndex;
        });

        // Cierra la ventana
        const closeButton = windowEl.querySelector('.close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                windowEl.style.display = 'none';
            });
        }

        // Prepara para mover la ventana
        if (titleBar) {
            titleBar.addEventListener('mousedown', (e) => {
                activeDragWindow = windowEl;
                offsetX = e.clientX - activeDragWindow.getBoundingClientRect().left;
                offsetY = e.clientY - activeDragWindow.getBoundingClientRect().top;
            });
        }
    });

    // Mueve la ventana activa
    document.addEventListener('mousemove', (e) => {
        if (activeDragWindow) {
            e.preventDefault();
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            activeDragWindow.style.left = `${newX}px`;
            activeDragWindow.style.top = `${newY}px`;
        }
    });

    // Suelta la ventana
    document.addEventListener('mouseup', () => {
        activeDragWindow = null;
    });

    // --- LÓGICA PARA EL BOTÓN ENVIAR ---
    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        const commentsWindow = document.getElementById('window-comentarios');
        const commentsContainer = commentsWindow.querySelector('.comments-container');
        const notesTextarea = document.querySelector('#window-notas textarea');

        sendButton.addEventListener('click', () => {
            const username = localStorage.getItem('win98_username') || 'Invitado';
            const newCommentText = notesTextarea.value.trim();

            if (newCommentText === '') {
                alert('Por favor, escribí un comentario antes de enviar.');
                return;
            }

            const newCommentElement = document.createElement('p');
            newCommentElement.innerHTML = `<strong>${username}:</strong> ${newCommentText}`;
            commentsContainer.appendChild(newCommentElement);
            
            openWindow(commentsWindow);
            
            notesTextarea.value = '';
            document.getElementById('window-notas').style.display = 'none';
        });
    }

    // 4. Para los items de la grilla en la ventana de "Arte" (Internet Explorer)
const leftColumn = document.querySelector('.left-column');

if (exploreButton && exploreContainer && leftColumn) {
    exploreButton.addEventListener('click', () => {
        exploreButton.style.display = 'none'; // oculta el botón
        // oculta todo lo que no sea el contenedor
        leftColumn.querySelector('.chatgpt-logo').style.display = 'none';
        leftColumn.querySelector('.welcome-text').style.display = 'none';
        exploreContainer.style.display = 'flex'; // muestra el contenedor
        exploreContainer.scrollIntoView({ behavior: 'smooth' });
    });
}




// --- LÓGICA PARA LOS CONTROLES DEL MEDIA PLAYER ---
    const video = document.getElementById('mediaPlayerVideo');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');

    // Solo ejecuta este código si los elementos del video existen en la página
    if (video && playBtn && pauseBtn && stopBtn) {
        // Botón Play
        playBtn.addEventListener('click', () => {
            video.play();
        });

        // Botón Pausa
        pauseBtn.addEventListener('click', () => {
            video.pause();
        });

        // Botón Stop
        stopBtn.addEventListener('click', () => {
            video.pause();
            video.currentTime = 0; // Reinicia el video al principio
        });
    }

    // --- LÓGICA PARA LOS CONTROLES DEL MEDIA PLAYER ---
    // ... (tu código para video, play, pause, stop) ...
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');

    if (video && playBtn && pauseBtn && stopBtn && volumeSlider && volumeIcon) {
        // ... (tus listeners para play, pause, stop) ...

        // --- Lógica para el volumen ---
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
        });

        volumeIcon.addEventListener('click', () => {
            video.muted = !video.muted;
        });
    }

// --- BOTONES ANTERIOR Y SIGUIENTE EN PAINT ---
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const paintImage = document.getElementById('paintImage');

if (btnPrev && btnNext && paintImage) {
    let currentIndex = 1; // empieza en paint1
    const totalImages = 14;

    function updatePaintImage() {
        paintImage.src = `img/paint${currentIndex}.png`;

        // Habilita o deshabilita los botones según el índice
        btnPrev.disabled = currentIndex === 1;
        btnNext.disabled = currentIndex === totalImages;
    }

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 1) {
            currentIndex--;
            updatePaintImage();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentIndex < totalImages) {
            currentIndex++;
            updatePaintImage();
        }
    });

    // Inicializa la imagen y los botones
    updatePaintImage();
                    }
    

    // --- CHAT OPCIONES ---
        const chatOptions = document.querySelectorAll(".chat-option[data-next]");

        chatOptions.forEach(option => {
            option.addEventListener("click", () => {
                const currentScreen = option.closest(".chat-screen");
                const nextScreenId = option.getAttribute("data-next");
                const nextScreen = document.getElementById(nextScreenId);

                if (!currentScreen || !nextScreen) return;

                // Ocultar pantalla actual
                currentScreen.style.display = "none";

                // Mostrar pantalla siguiente
                nextScreen.style.display = "block";

                // Agregar mensaje del usuario a la próxima pantalla
                const nextMessages = nextScreen.querySelector(".chat-messages");
                if (nextMessages) {
                    const myMessage = document.createElement("div");
                    myMessage.classList.add("message", "usuario");
                    const username = localStorage.getItem('win98_username') || 'Invitado';
                    myMessage.innerHTML = `<strong>${username} dice:</strong> ${option.textContent}`;
                    nextMessages.appendChild(myMessage);

                    // Scroll al final
                    nextMessages.scrollTop = nextMessages.scrollHeight;
                }
            });
        });

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('win98_username') || 'Invitado';

    // Reemplazamos los mensajes con clase "usuario" al cargar la pantalla
    document.querySelectorAll('.message.usuario').forEach(msg => {
        const text = msg.textContent; // texto que escribió el usuario
        msg.innerHTML = `<strong>${username} dice:</strong> ${text}`;
        msg.classList.add('invitado'); // opcional para darle color
    });

    // Chat-option: al seleccionar, agrega mensaje con el nombre ingresado
    const chatOptions = document.querySelectorAll(".chat-option[data-next]");
    chatOptions.forEach(option => {
        option.addEventListener("click", () => {
            const currentScreen = option.closest(".chat-screen");
            const nextScreenId = option.getAttribute("data-next");
            const nextScreen = document.getElementById(nextScreenId);
            if (!currentScreen || !nextScreen) return;

            currentScreen.style.display = "none";
            nextScreen.style.display = "block";

            const nextMessages = nextScreen.querySelector(".chat-messages");
            if (nextMessages) {
                const myMessage = document.createElement("div");
                myMessage.classList.add("message", "usuario");
                myMessage.innerHTML = `<strong>${username} dice:</strong> ${option.textContent}`;
                nextMessages.appendChild(myMessage);
                nextMessages.scrollTop = nextMessages.scrollHeight;
            }
        });
    });
});





});
