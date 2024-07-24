let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}
function seleccionar() {
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// JavaScript for zoom functionality
document.addEventListener('DOMContentLoaded', () => {
    const zoomables = document.querySelectorAll('.zoomable');
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImg = document.getElementById('zoomedImg');
    const zoomClose = document.getElementsByClassName('zoom-close')[0];

    zoomables.forEach(img => {
        img.addEventListener('click', function () {
            zoomModal.style.display = 'block';
            zoomedImg.src = this.src;
        });
    });

    zoomClose.addEventListener('click', function () {
        zoomModal.style.display = 'none';
    });

    zoomModal.addEventListener('click', function (event) {
        if (event.target === zoomModal) {
            zoomModal.style.display = 'none';
        }
    });
});

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

document.getElementById('contact-form').addEventListener('submit', function(event) {
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

  document.getElementById("submit-button").addEventListener("click", function() {
    sendMessage();
});

document.getElementById("input-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

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
        greetings: ["¡Hola! ¿Qué tal?", "¡Hola! ¿En qué puedo asistirte?"],
        farewells: ["¡Hasta luego! Que tengas un buen día.", "Adiós. ¡Cuídate!", "¡Nos vemos!"],
        default: ["No estoy seguro de cómo responder a eso.", "¿Podrías reformular tu pregunta?", "No entiendo bien, ¿puedes intentar de nuevo?"],
        weather: ["El clima hoy es soleado.", "Parece que va a llover más tarde.", "Hace un poco de frío hoy."]
    };

    let response = responses.default[Math.floor(Math.random() * responses.default.length)];

    const messageLower = userMessage.toLowerCase();

    if (messageLower.includes("hola")) {
        response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (messageLower.includes("adios") || messageLower.includes("hasta luego")) {
        response = responses.farewells[Math.floor(Math.random() * responses.farewells.length)];
    } else if (messageLower.includes("clima") || messageLower.includes("tiempo")) {
        response = responses.weather[Math.floor(Math.random() * responses.weather.length)];
    }

    appendMessage("bot", response);
}
  