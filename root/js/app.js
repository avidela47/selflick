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

// Función galeria de fotos
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});

prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
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

// JavaScript para manejar el chatbot
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const chatbot = document.getElementById('chatbot');
    const inputField = document.getElementById("input-field");
    let chatbotActive = false;
    let scrollTimeout;
    let showTimeout;

    // Función para mostrar el chatbot
    const showChatbot = () => {
        anime({
            targets: '#chatbot',
            bottom: '20px',
            easing: 'easeOutExpo',
            duration: 1000,
        });
    };

    // Función para ocultar el chatbot
    const hideChatbot = () => {
        anime({
            targets: '#chatbot',
            bottom: '-100%',
            easing: 'easeOutExpo',
            duration: 1000,
        });
    };

    // Mostrar el chatbot 15 segundos después de cargar la página
    setTimeout(showChatbot, 15000);

    // Función para verificar la visibilidad de las secciones
    const checkSectionVisibility = () => {
        if (document.activeElement === inputField) {
            showChatbot();
            return;
        }

        let sectionVisible = false;

        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect();
            if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
                sectionVisible = true;
            }
        });

        if (!sectionVisible && !chatbotActive) {
            hideChatbot();
        }
    };

    // Listener para el scroll
    window.addEventListener('scroll', () => {
        if (!chatbotActive) {
            hideChatbot();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkSectionVisibility, 100);
            clearTimeout(showTimeout);
            showTimeout = setTimeout(showChatbot, 15000);
        }
    });

    // Mantener el chatbot visible cuando el input tiene foco
    inputField.addEventListener('focus', () => {
        chatbotActive = true;
        showChatbot();
        clearTimeout(showTimeout);
    });

    inputField.addEventListener('blur', () => {
        chatbotActive = false;
        clearTimeout(showTimeout);
        showTimeout = setTimeout(showChatbot, 15000);
    });

    document.getElementById("submit-button").addEventListener("click", function () {
        sendMessage();
        chatbotActive = true;
        showChatbot();
    });

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
            chatbotActive = true;
            showChatbot();
        }
    });

    function sendMessage() {
        const message = inputField.value.trim();

        if (message !== "") {
            appendMessage("user", message);
            inputField.value = "";

            // Simular la respuesta del bot
            setTimeout(() => {
                botResponse(message);
                chatbotActive = true;
            }, 500);
        }
    }

    function appendMessage(sender, message) {
        const chatbotBody = document.getElementById("chatbot-body");
        const messageElement = document.createElement("p");
        messageElement.className = sender === "user" ? "user-message" : "bot-message";
        messageElement.innerText = message;
        chatbotBody.appendChild(messageElement);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Desplazar hacia abajo
    }

    function botResponse(userMessage) {
        const responses = {
            greetings: [
                "¡Hola! Somos Selflick, Industria Gráfica. Atendemos de lunes a viernes de 9 hs a 17 hs. ¿En qué te podemos ayudar? Aquí están nuestros servicios:",
                "¡Hola! Soy el bot de Selflick. Atendemos de lunes a viernes de 9 hs a 17 hs. ¿Qué servicio necesitas? Mira nuestras opciones:"
            ],
            farewells: ["¡Hasta luego! Que tengas un buen día."],
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
                </div>`;
            const buttonsElement = document.createElement('div');
            buttonsElement.innerHTML = buttonsHtml;
            chatbotBody.appendChild(buttonsElement);
            chatbotBody.scrollTop = chatbotBody.scrollHeight; // Desplazar hacia abajo

            // Agregar event listeners a los botones
            document.getElementById("carteleria-corporea").addEventListener("click", () => redirectToWhatsApp("Cartelería Corpórea"));
            document.getElementById("merchandising").addEventListener("click", () => redirectToWhatsApp("Merchandising"));
            document.getElementById("impresiones-3d").addEventListener("click", () => redirectToWhatsApp("Impresiones 3D"));
            document.getElementById("filmacion-dron").addEventListener("click", () => redirectToWhatsApp("Filmación con Dron"));
            document.getElementById("edicion-videos").addEventListener("click", () => redirectToWhatsApp("Edición de Videos"));
        } else if (messageLower.includes("chau") || messageLower.includes("hasta luego")) {
            response = responses.farewells[Math.floor(Math.random() * responses.farewells.length)];
        } else if (messageLower.includes("clima") || messageLower.includes("tiempo")) {
            response = responses.weather[Math.floor(Math.random() * responses.weather.length)];
        }

        if (response !== responses.greetings[0] && response !== responses.greetings[1]) {
            appendMessage("bot", response);
        }
    }

    function redirectToWhatsApp(service) {
        const phoneNumber = "3512450310";
        const message = `Hola, estoy interesado en su servicio de ${service}.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Inicializar la verificación de visibilidad
    checkSectionVisibility();
});




