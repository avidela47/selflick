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
    const contactoSection = document.getElementById('contacto');
    const chatbot = document.getElementById('chatbot');

    window.addEventListener('scroll', () => {
        const sectionPosition = contactoSection.getBoundingClientRect();
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