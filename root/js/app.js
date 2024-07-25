let menuVisible = false;

// Función que oculta o muestra el menú de navegación
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

// Función que oculta el menú cuando se selecciona una opción
function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// Parámetros de configuración
let countItem = items.length;
let itemActive = 0;

// Evento para el clic en el botón "siguiente"
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}

// Evento para el clic en el botón "anterior"
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}

// Ejecución automática del slider cada 5 segundos
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)

// Función para mostrar el slider
function showSlider() {
    // Eliminar la clase "active" del elemento anterior
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // Agregar la clase "active" al nuevo elemento
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Reiniciar el intervalo de tiempo automático del slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// Evento para el clic en las miniaturas
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// JavaScript para la funcionalidad de zoom
document.addEventListener('DOMContentLoaded', () => {
    const zoomables = document.querySelectorAll('.zoomable');
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImg = document.getElementById('zoomedImg');
    const zoomClose = document.getElementsByClassName('zoom-close')[0];

    // Evento para el clic en una imagen zoomable
    zoomables.forEach(img => {
        img.addEventListener('click', function () {
            zoomModal.style.display = 'block';
            zoomedImg.src = this.src;
        });
    });

    // Evento para cerrar el modal de zoom
    zoomClose.addEventListener('click', function () {
        zoomModal.style.display = 'none';
    });

    // Evento para cerrar el modal de zoom al hacer clic fuera de la imagen
    zoomModal.addEventListener('click', function (event) {
        if (event.target === zoomModal) {
            zoomModal.style.display = 'none';
        }
    });
});

// JavaScript para mostrar/ocultar el chatbot según la posición del scroll
document.addEventListener('DOMContentLoaded', () => {
    const footerSection = document.getElementById('footer');
    const chatbot = document.getElementById('chatbot');

    window.addEventListener('scroll', () => {
        const sectionPosition = footerSection.getBoundingClientRect();
        const isVisible = sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0;

        if (isVisible) {
            anime({
                targets: '#chatbot',
                bottom: '20px',
                easing: 'easeOutExpo',
                duration: 1000,
            });
        } else {
            anime({
                targets: '#chatbot',
                bottom: '-100%',
                easing: 'easeOutExpo',
                duration: 1000,
            });
        }
    });
});

// JavaScript para manejar el envío del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const serviceID = 'service_06shzpe';
    const templateID = 'template_fb6dc5b';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Mensaje enviado con éxito!');
            document.getElementById('contact-form').reset();
        }, (err) => {
            alert(JSON.stringify(err));
        });
});

// JavaScript para manejar el envío de mensajes del chatbot
document.getElementById("submit-button").addEventListener("click", function () {
    sendMessage();
});

document.getElementById("input-field").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Función para enviar mensajes del chatbot
function sendMessage() {
    const inputField = document.getElementById("input-field");
    const message = inputField.value.trim();

    if (message !== "") {
        appendMessage("user", message);
        inputField.value = "";

        // Simular la respuesta del bot
        setTimeout(() => {
            botResponse(message);
        }, 500);
    }
}

// Función para agregar mensajes al cuerpo del chatbot
function appendMessage(sender, message) {
    const chatbotBody = document.getElementById("chatbot-body");
    const messageElement = document.createElement("p");
    messageElement.className = sender === "user" ? "user-message" : "bot-message";
    messageElement.innerText = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Desplazar hacia abajo
}

// Función para generar la respuesta del bot
function botResponse(userMessage) {
    const responses = {
        greetings: [
            "¡Hola! Somos Selflick, Industria Gráfica. Atendemos de lunes a viernes de 9 hs a 17 hs. ¿En qué te podemos ayudar? Aquí están nuestros servicios:",
            "¡Hola! Soy el bot de Selflick. Atendemos de lunes a viernes de 9 hs a 17 hs. ¿Qué servicio necesitas? Mira nuestras opciones:"
        ],
        farewells: ["¡Hasta luego! Que tengas un buen día.", "Adiós. ¡Cuídate!", "¡Nos vemos!"],
        default: ["No estoy seguro de cómo responder a eso.", "¿Podrías reformular tu pregunta?", "No entiendo bien, ¿puedes intentar de nuevo?"],
        weather: ["El clima hoy es soleado.", "Parece que va a llover más tarde.", "Hace un poco de frío hoy."]
    };

    let response = responses.default[Math.floor(Math.random() * responses.default.length)];

    const messageLower = userMessage.toLowerCase();

    if (messageLower.includes("hola")) {
        response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        appendMessage("bot", response);

        // Mostrar los botones de servicio
        const chatbotBody = document.getElementById("chatbot-body");
        const buttonsHtml = `
            <div class="service-buttons">
              <button class="service-button" id="carteleria-corporea">Cartelería Corpórea</button>
              <button class="service-button" id="merchandising">Merchandising</button>
              <button class="service-button" id="impresiones-3d">Impresiones 3D</button>
              <button class="service-button" id="filmacion-dron">Filmación con Dron</button>
              <button class="service-button" id="edicion-videos">Edición de Videos</button>
              <button class="contact-button" id="contactame">Contactanos</button>
            </div>`;
        const buttonsElement = document.createElement('div');
        buttonsElement.innerHTML = buttonsHtml;
        chatbotBody.appendChild(buttonsElement);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Desplazar hacia abajo
    } else if (messageLower.includes("adios") || messageLower.includes("hasta luego")) {
        response = responses.farewells[Math.floor(Math.random() * responses.farewells.length)];
    } else if (messageLower.includes("clima") || messageLower.includes("tiempo")) {
        response = responses.weather[Math.floor(Math.random() * responses.weather.length)];
    }

    if (response !== responses.greetings[0] && response !== responses.greetings[1]) {
        appendMessage("bot", response);
    }
}

