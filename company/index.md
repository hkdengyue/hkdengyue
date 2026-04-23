---
layout: page
title: Companies
permalink: /company/
---

# Companies

<div class="grid">

{% for company in site.companies %}
  <div class="card">
    <h3><a href="{{ company.url }}">{{ company.title }}</a></h3>
    <p>{{ company.focus }}</p>
  </div>
{% endfor %}

</div>
