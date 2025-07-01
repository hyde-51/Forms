document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".form-container");
  container.classList.add("fade-in");

  const links = document.querySelectorAll(".link-transition");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      container.classList.remove("fade-in");
      container.style.opacity = 0;
      container.style.transform = "rotateY(90deg)";
      setTimeout(() => {
        window.location.href = link.href;
      }, 500); // matches CSS transition time
    });
  });
});
