document.addEventListener("DOMContentLoaded", function () {

  const company = document.getElementById("filter-company");
  const target = document.getElementById("filter-target");
  const modality = document.getElementById("filter-modality");
  const stage = document.getElementById("filter-stage");

  const cards = document.querySelectorAll(".explore-card");

  populateFilters(cards);

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

function populateFilters(cards) {
  const companies = new Set();
  const targets = new Set();
  const modalities = new Set();
  const stages = new Set();

  cards.forEach(card => {
    companies.add(card.dataset.company);
    targets.add(card.dataset.target);
    modalities.add(card.dataset.modality);
    stages.add(card.dataset.stage);
  });

  function fillSelect(selectId, values) {
    const select = document.getElementById(selectId);

    values.forEach(v => {
      if (!v) return;

      const option = document.createElement("option");
      option.value = v;
      option.textContent = v;

      select.appendChild(option);
    });
  }

  fillSelect("filter-company", companies);
  fillSelect("filter-target", targets);
  fillSelect("filter-modality", modalities);
  fillSelect("filter-stage", stages);
}

const sortSelect = document.getElementById("sort-by");

function sortCards() {
  const type = sortSelect.value;
  const container = document.getElementById("explore-results");

  const cardsArray = Array.from(cards);

  cardsArray.sort((a, b) => {

    if (type === "title") {
      return a.dataset.title.localeCompare(b.dataset.title);
    }

    if (type === "date") {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    }

    if (type === "stage") {
      const order = {
        "Approved": 4,
        "Phase 3": 3,
        "Phase 2": 2,
        "Phase 1": 1
      };

      return (order[b.dataset.stage] || 0) - (order[a.dataset.stage] || 0);
    }

  });

  cardsArray.forEach(card => container.appendChild(card));
}

sortSelect.addEventListener("change", sortCards);
