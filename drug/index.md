---
layout: page
title: Drug Database
permalink: /drug/
---

# Drug Database

## Filters

<select id="filter-mechanism">
  <option value="">All Mechanisms</option>
  <option value="RET">RET</option>
  <option value="BCMA">BCMA</option>
</select>

<select id="filter-modality">
  <option value="">All Modalities</option>
  <option value="small-molecule">Small Molecule</option>
  <option value="car-t">CAR-T</option>
</select>

<select id="filter-stage">
  <option value="">All Stages</option>
  <option value="Approved">Approved</option>
  <option value="Phase 3">Phase 3</option>
</select>

---

<div class="grid" id="drug-list">

{% for drug in site.drugs %}
  <div class="card drug-card"
       data-mechanism="{{ drug.mechanism }}"
       data-modality="{{ drug.modality }}"
       data-stage="{{ drug.stage }}">
       
    <h3><a href="{{ drug.url }}">{{ drug.title }}</a></h3>
    <p>{{ drug.mechanism }} | {{ drug.modality }}</p>
    <p>{{ drug.stage }}</p>
  </div>
{% endfor %}

</div>

<script src="/assets/filter.js"></script>
