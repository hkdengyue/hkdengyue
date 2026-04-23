---
layout: page
title: Pipeline
permalink: /pipeline/
---

# Pipeline

<div class="grid">

{% for p in site.pipelines %}
  <div class="card">
    <h3><a href="{{ p.url }}">{{ p.title }}</a></h3>
    <p>{{ p.target }} | {{ p.stage }}</p>
  </div>
{% endfor %}

</div>
