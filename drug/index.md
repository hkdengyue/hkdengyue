---
layout: page
title: Drug Database
permalink: /drug/
---

# Drug Database

<div class="grid">

{% for drug in site.drugs %}
  <div class="card">
    <h3><a href="{{ drug.url }}">{{ drug.title }}</a></h3>
    <p>{{ drug.mechanism }}</p>
  </div>
{% endfor %}

</div>
