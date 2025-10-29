let slideIndex = 1;
// NO LLAMAMOS showSlides(slideIndex) AQUÍ. La llamaremos más tarde.

// Control de siguiente/anterior
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Control de puntos (dots)
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    // Asegúrate de que las diapositivas y puntos existan en el DOM
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Si no hay diapositivas, salimos de la función
    if (slides.length === 0) return;
    
    // Si n es mayor que el número de diapositivas (al presionar 'siguiente' en la última)
    if (n > slides.length) {
        slideIndex = 1
    }
    
    // Si n es menor que 1 (al presionar 'anterior' en la primera)
    if (n < 1) {
        slideIndex = slides.length
    }
    
    // Ocultar todas las diapositivas
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Quitar la clase 'active' de todos los puntos
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Mostrar la diapositiva actual y marcar el punto como activo
    slides[slideIndex-1].style.display = "block";  
    // Aseguramos que solo se intente manipular si el punto existe
    if (dots.length > 0) { 
        dots[slideIndex-1].className += " active";
    }
}

// -------------------------------------------------------------
// *************** LÓGICA DE VISTAS (showView/showSubpanel) ***************
// -------------------------------------------------------------

/**
 * Función para cambiar entre las vistas principales (Index, Estudiante, Docente, Admin).
 * @param {string} viewId - El ID de la vista a mostrar.
 */
function showView(viewId) {
    // Oculta todas las vistas principales
    const views = document.querySelectorAll('.page-content, .portal-view');
    views.forEach(view => {
        view.style.display = 'none';
    });

    // Muestra la vista solicitada
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.style.display = 'block';

        // **AÑADIMOS LA INICIALIZACIÓN DEL CARRUSEL AQUÍ**
        if (viewId === 'main-page') {
            // Inicializa el carrusel una vez que sabemos que la vista está visible
            showSlides(slideIndex);
        }

        // Limpia el estado de los subpaneles cuando se regresa o se cambia de portal
        if (activeView.classList.contains('portal-view')) {
             // ... (El código de limpieza de subpaneles sigue igual) ...
             const subpanels = activeView.querySelectorAll('.subpanel-content');
             subpanels.forEach(panel => {
                 panel.classList.remove('active');
             });
             const sidebarLinks = activeView.querySelectorAll('.sidebar-link');
             sidebarLinks.forEach(link => {
                 link.classList.remove('active');
             });
        }
    }
}

/**
 * Función para cambiar entre los subpaneles dentro de una vista de portal.
 * @param {string} subpanelId - El ID del subpanel a mostrar.
 * @param {HTMLElement} clickedLink - El enlace de la barra lateral que fue clickeado.
 */
function showSubpanel(subpanelId, clickedLink) {
    // ... (Tu código showSubpanel sigue igual) ...
    // 1. Desactiva todos los subpaneles dentro de la vista actual
    const portalView = clickedLink.closest('.portal-view');
    const subpanels = portalView.querySelectorAll('.subpanel-content');
    subpanels.forEach(panel => {
        panel.classList.remove('active');
    });

    // 2. Desactiva el estado 'active' de todos los enlaces de la barra lateral
    const sidebarLinks = portalView.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 3. Muestra el subpanel solicitado y activa el enlace
    const activeSubpanel = document.getElementById(subpanelId);
    if (activeSubpanel) {
        activeSubpanel.classList.add('active');
    }
    clickedLink.classList.add('active');
}


// -------------------------------------------------------------
// *************** INICIALIZACIÓN DEL DOCUMENTO ***************
// -------------------------------------------------------------

// Inicializar: Muestra la página principal al cargar
document.addEventListener('DOMContentLoaded', () => {
    // **AQUÍ SOLO LLAMAMOS A showView**
    showView('main-page');

    // ↓↓↓ ¡PON TUS CLAVES DE SUPABASE AQUÍ! ↓↓↓
    const SUPABASE_URL = 'https://qxrlurrdmzntcenscona.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cmx1cnJkbXpudGNlbnNjb25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Nzg1MzIsImV4cCI6MjA3NzI1NDUzMn0.XUzNXu4CHE9yuLkOE-6sLfFBTMuIeeG0WHbUlNLFKJo';
    // ↑↑↑ ¡PON TUS CLAVES DE SUPABASE AQUÍ! ↑↑↑ 
    
    // NOTA: Si usas la función de auto-reproducción (autoShowSlides), 
    // debes descomentar la llamada *aquí*, dentro de DOMContentLoaded, 
    // y asegurarte de que showSlides se siga llamando.
});  

// NUEVA FUNCIÓN: Filtra los botones de navegación según el rol
function filterTabsByRole(role) {
    // Ocultar todos los botones de navegación primero
    allTabButtons.forEach(btn => btn.classList.add('hidden'));
    
    // Mostrar solo el botón del rol correspondiente
    if (role === 'estudiante') {
        studentBtn.classList.remove('hidden');
        studentBtn.classList.add('active'); 
    } else if (role === 'docente') {
        teacherBtn.classList.remove('hidden');
        teacherBtn.classList.add('active');
    } else if (role === 'administrador') {
        adminBtn.classList.remove('hidden');
        adminBtn.classList.add('active');
    }
}
// ...
// Y se llama dentro del evento de login:
loginForm.addEventListener('submit', (e) => {
    // ...
    filterTabsByRole(userType); // ⬅️ Esto oculta los botones no deseados
    showView(portalId);         // ⬅️ Esto muestra el contenido del portal correcto
});
 
