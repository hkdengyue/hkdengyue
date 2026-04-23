---
layout: default
title: Home
---

# Global Pharma Intelligence

## 📰 Latest News

<div class="grid">

{% for post in site.posts limit:6 %}
  <div class="card">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="tags">
      {% for tag in post.tags %}
        <span>{{ tag }}</span>
      {% endfor %}
    </p>
  </div>
{% endfor %}

</div>

---

## 📊 Featured Insights

<div class="grid">

{% for post in site.insights limit:3 %}
  <div class="card highlight">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  </div>
{% endfor %}

</div>

---

## 🔍 Explore

<div class="grid small">

  <a class="card link" href="/therapeutics/oncology/">Oncology</a>
  <a class="card link" href="/modalities/car-t/">CAR-T</a>
  <a class="card link" href="/market-access/china/">China Market</a>

</div>
