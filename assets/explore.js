document.addEventListener("DOMContentLoaded", function () {

  const company = document.getElementById("filter-company");
  const target = document.getElementById("filter-target");
  const modality = document.getElementById("filter-modality");
  const stage = document.getElementById("filter-stage");

  const cards = document.querySelectorAll(".explore-card");

  function filter() {
    const c = company.value;
    const t = target.value;
    const m = modality.value;
    const s = stage.value;

    cards.forEach(card => {
      const match =
        (!c || card.dataset.company === c) &&
        (!t || card.dataset.target === t) &&
        (!m || card.dataset.modality === m) &&
        (!s || card.dataset.stage === s);

      card.style.display = match ? "block" : "none";
    });
  }

  company.addEventListener("change", filter);
  target.addEventListener("change", filter);
  modality.addEventListener("change", filter);
  stage.addEventListener("change", filter);

});
