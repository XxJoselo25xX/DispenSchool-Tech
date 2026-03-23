/**
 * DispenSchool Tech - Script completo
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMACIONES SCROLL ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. CONTADORES ---
    const counters = document.querySelectorAll('.counter');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }


    // --- 3. NAVBAR DINÁMICO ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.padding = '0.8rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });


    // --- 4. SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 5. FORMULARIO A GOOGLE SHEETS ---
    const form = document.getElementById("formCotizacion");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const data = {
                Nombre: document.querySelector('[name="Nombre"]').value,
                Correo: document.querySelector('[name="Correo"]').value,
                Telefono: document.querySelector('[name="Telefono"]').value,
                Institucion: document.querySelector('[name="Institucion"]').value,
                Tipo: document.querySelector('[name="Tipo"]').value,
                Cantidad: document.querySelector('[name="Cantidad dispensadores"]').value,
                Dispensador: document.querySelector('[name="Tipo dispensador"]').value,
                Observaciones: document.querySelector('[name="Observaciones"]').value
            };

            fetch("https://script.google.com/macros/s/AKfycbwqSmoy6_cyLRvFuEGD3grb5DbEE9yj9bdxnVUvVptQlVi5umA81Nth7rvSV1Lcf2Esew/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                mode: "no-cors"
            })
            .then(() => {
                alert("Solicitud enviada correctamente 🚀");
                form.reset();
                cerrarCotizacion();
            })
            .catch(() => {
                alert("Error al enviar");
            });
        });
    }

});


// --- 6. POPUP COTIZACIÓN ---
function abrirCotizacion() {
    document.getElementById("popupCotizacion").style.display = "flex";
}

function cerrarCotizacion() {
    document.getElementById("popupCotizacion").style.display = "none";
}


// --- 7. TÉRMINOS ---
function verTerminos() {
    const box = document.getElementById("terminosBox");

    if (box.style.display === "none") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}


// --- 8. CHAT ---
function abrirChat() {
    document.getElementById("chatBox").style.display = "flex";
}

function cerrarChat() {
    document.getElementById("chatBox").style.display = "none";
}

function enviarMensaje() {
    const input = document.getElementById("mensaje");
    const chat = document.getElementById("chatBody");

    if (input.value.trim() !== "") {
        const nuevo = document.createElement("p");
        nuevo.textContent = "Tú: " + input.value;
        chat.appendChild(nuevo);

        input.value = "";
        chat.scrollTop = chat.scrollHeight;
    }
}
