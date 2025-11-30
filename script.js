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

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.draggable');

  elements.forEach(el => {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.style.cursor = "grab";
    el.style.touchAction = "none";
    el.style.userSelect = "none";

    el.addEventListener("pointerdown", (e) => {
      dragging = true;

      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";

      // pausar animación mientras arrastras
      el.dataset.prevAnimation = el.style.animation;
      el.style.animation = "none";

      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.position = "absolute"; // lo hacemos absoluto solo cuando lo arrastras
    });

    window.addEventListener("pointerup", (e) => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "grab";

      // restaurar animación flotante
      el.style.animation = el.dataset.prevAnimation || "";
    });
  });
});