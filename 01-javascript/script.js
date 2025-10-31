document.addEventListener("DOMContentLoaded", function () {
  const filterTec = document.querySelector("#filtro-tecnologia");
  const filterUbi = document.querySelector("#filtro-ubicacion");
  const filterTip = document.querySelector("#filtro-tipo");
  const filterExp = document.querySelector("#filtro-experiencia");
  const searchInput = document.querySelector("#empleado-search-Input");
  const searchForm = document.querySelector("#empleos-search-form");

  const resultsTitle = document.querySelector(".search-results header h2");
  const jobsContainer = document.querySelector(".jobs-listings");

  const normalize = (v) => (v ?? "").toString().trim().toLowerCase();

  const debounce = (fn, wait = 250) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const getFiltros = () => ({
    tec: normalize(filterTec?.value),
    ubicacion: normalize(filterUbi?.value),
    tipo: normalize(filterTip?.value),
    experiencia: normalize(filterExp?.value),
    q: normalize(searchInput?.value),
  });

  const aplicaFiltro = () => {
    const filtros = getFiltros();
    const cards = jobsContainer
      ? Array.from(jobsContainer.querySelectorAll("article"))
      : [];
    let visibles = 0;

    cards.forEach((card) => {
      const cardTec = normalize(card.dataset.tec);
      const cardUbi = normalize(card.dataset.ubicacion);
      const cardTipo = normalize(card.dataset.tipo);
      const cardExp = normalize(card.dataset.experiencia);
      const cardText = normalize(card.textContent);

      const matchTec = !filtros.tec || filtros.tec === cardTec;
      const matchUbi = !filtros.ubicacion || filtros.ubicacion === cardUbi;
      const matchTipo = !filtros.tipo || filtros.tipo === cardTipo;
      const matchExp = !filtros.experiencia || filtros.experiencia === cardExp;
      const matchText = !filtros.q || cardText.includes(filtros.q);

      const isShow = matchTec && matchUbi && matchTipo && matchExp && matchText;

      card.classList.toggle("is-hidden", !isShow);
    });

    if (resultsTitle)
      resultsTitle.textContent = `Resultados de Búsqueda (${visibles})`;
  };

  [filterTec, filterUbi, filterTip, filterExp].forEach((el) => {
    if (el) el.addEventListener("change", aplicaFiltro);
  });

  if (searchInput)
    searchInput.addEventListener("input", debounce(aplicaFiltro, 250));

  // evitar que el form recargue la página
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      aplicaFiltro();
    });
  }

  aplicaFiltro();

  // --------------------
  // boton de aplicar
  const jobsListingsSection = document.querySelector(".jobs-listings");

  jobsListingsSection?.addEventListener("click", function (event) {
    const element = event.target;

    if (element.classList.contains("boton-aplicar")) {
      element.textContent = "Aplicado!";
      element.classList.add("is-applied");
      element.style.cursor = "not-allowed"; // solo un click
      element.disabled = true;
    }
  });
});
