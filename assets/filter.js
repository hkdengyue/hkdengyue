document.addEventListener("DOMContentLoaded", function () {

  const mechanismFilter = document.getElementById("filter-mechanism");
  const modalityFilter = document.getElementById("filter-modality");
  const stageFilter = document.getElementById("filter-stage");

  const cards = document.querySelectorAll(".drug-card");

  function filter() {
    const m = mechanismFilter.value;
    const mo = modalityFilter.value;
    const s = stageFilter.value;

    cards.forEach(card => {
      const match =
        (!m || card.dataset.mechanism === m) &&
        (!mo || card.dataset.modality === mo) &&
        (!s || card.dataset.stage === s);

      card.style.display = match ? "block" : "none";
    });
  }

  mechanismFilter.addEventListener("change", filter);
  modalityFilter.addEventListener("change", filter);
  stageFilter.addEventListener("change", filter);

});
