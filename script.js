document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".featured-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            // Cuando entra a pantalla → activar animación
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } 
            // Cuando sale de pantalla → quitar clase para reiniciar animación
            else {
                entry.target.classList.remove("visible");
            }

        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
});