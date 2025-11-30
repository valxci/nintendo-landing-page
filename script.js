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

  let FIX_X = null;
  let FIX_Y = null;

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

      // Pausar animación
      el.dataset.prevAnimation = el.style.animation;
      el.style.animation = "none";

      const rect = el.getBoundingClientRect();

      // ✔️ REGISTRAR DISTANCIA DE TP SOLO 1 VEZ
      if (FIX_X === null) {
        FIX_X = rect.left - el.offsetLeft;
        FIX_Y = rect.top - el.offsetTop;
      }

      // ✔️ CORREGIR POSICIÓN REAL USANDO LA COMPENSACIÓN
      el.style.left = rect.left - FIX_X + "px";
      el.style.top  = rect.top  - FIX_Y + "px";

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      const x = e.clientX - offsetX - FIX_X;
      const y = e.clientY - offsetY - FIX_Y;

      el.style.left = x + "px";
      el.style.top = y + "px";
    });

    window.addEventListener("pointerup", () => {
      dragging = false;
      el.style.cursor = "grab";
      el.style.animation = el.dataset.prevAnimation || "";
    });
  });
});