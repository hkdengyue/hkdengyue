---
layout: page
title: Explore
permalink: /explore/
---

# Explore Pharma Data

## Filters

<select id="filter-company">
  <option value="">All Companies</option>
  <option value="Eli Lilly">Eli Lilly</option>
</select>

<select id="filter-target">
  <option value="">All Targets</option>
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

## Results

<div class="grid" id="explore-results">

{% for drug in site.drugs %}
  <div class="card explore-card"
     data-title="{{ drug.title }}"
     data-date="{{ drug.date }}"
     data-stage="{{ drug.stage }}"
     data-company="{{ drug.company }}"
     data-target="{{ drug.mechanism }}"
     data-modality="{{ drug.modality }}">

    <h3><a href="{{ drug.url }}">{{ drug.title }}</a></h3>
    <p>{{ drug.company }} | {{ drug.mechanism }}</p>
  </div>
{% endfor %}

{% for p in site.pipelines %}
  <div class="card explore-card"
       data-type="pipeline"
       data-company="{{ p.company }}"
       data-target="{{ p.target }}"
       data-modality="{{ p.modality }}"
       data-stage="{{ p.stage }}">
       data-title="{{ p.title }}"
       data-date="{{ p.date }}"
       data-stage="{{ p.stage }}"

    <h3><a href="{{ p.url }}">{{ p.title }}</a></h3>
    <p>{{ p.company }} | {{ p.target }}</p>
  </div>
{% endfor %}

</div>

<script src="/assets/explore.js"></script>

## Sort By

<select id="sort-by">
  <option value="date">Latest</option>
  <option value="stage">Stage</option>
  <option value="title">Name (A-Z)</option>
</select>
