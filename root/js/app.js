let menuVisible = false;

// Función que oculta o muestra el menú de navegación
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    } else {
        nav.classList.add("responsive");
        menuVisible = true;
    }
}

function seleccionar() {
    // Oculta el menú una vez que se selecciona una opción
    document.getElementById("nav").classList.remove("responsive");
    menuVisible = false;
}

// Función galeria de fotos
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function () {
    moveSlider('next')
}


// Function for prev button 
prevBtn.onclick = function () {
    moveSlider('prev')
}

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }


    slider.addEventListener('animationend', function () {
        if (direction === 'next') {
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, { once: true }) // Remove the event listener after it's triggered once
}

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

// Inicializar VIDEOS

const videoPlaylist = document.querySelector(".video-playlist");
const video = document.getElementById("video");
const playIcon = document.getElementById("play");

playIcon.classList.add("active");

const play = (videoSource) => {
    video.src = videoSource;
    video.play();
    playIcon.classList.remove("active");
};

video.onpause = () => playIcon.classList.add("active");

const clear = () => {
    videoPlaylist.childNodes.forEach((liTag) => {
        liTag.classList.remove("now");
    });
};

for (let index = 1; index <= 10; index++) {
    let liTag = document.createElement("li");
    liTag.classList.add("video");
    liTag.onclick = () => {
        clear();
        liTag.classList.add("now");
        play(`./root/img/video-${index}.mp4`);
    };

    liTag.innerHTML = `
    <div class="video-img">
      <i class="fa-regular fa-circle-play icon icon-small active"></i>
      <video src="./root/img/video-${index}.mp4"></video>
    </div>
    <div class="video-details">
      <h4>Video titulo...</h4>
      <p>Video description...</p>
    </div>
  `;

    videoPlaylist.appendChild(liTag);
}

// Obtener el número de visitas almacenado en localStorage
let visits = localStorage.getItem('visitCount');

// Si no hay un número de visitas almacenado, inicializarlo a 5670
if (visits === null) {
    visits = 5670;
} else {
    // Si ya existe un número de visitas, convertirlo a número e incrementarlo en 1
    visits = Number(visits) + 1;
}

// Almacenar el nuevo valor en localStorage
localStorage.setItem('visitCount', visits);

// Mostrar el número de visitas en la página
document.addEventListener('DOMContentLoaded', (event) => {
    const visitCounter = document.getElementById('visitCounter');
    visitCounter.innerHTML = `Visitas al sitio: ${visits}`;
});
