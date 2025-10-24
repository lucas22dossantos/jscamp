// boton de aplicar
const jobsListingsSection = document.querySelector(".jobs-listings");

jobsListingsSection.addEventListener("click", function (event) {
  const element = event.target;

  if (element.classList.contains("boton-aplicar")) {
    element.textContent = "Aplicado!";
    element.classList.add("is-applied");
    element.style.cursor = "not-allowed"; // solo un click
    element.disabled = true;
  }
});
//  --------------------
