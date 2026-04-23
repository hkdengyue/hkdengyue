---
layout: default
title: Home
---

# Global Pharma Intelligence

## 🧨 Top Story

{% assign top = site.posts.first %}

<div class="hero">
  <h2><a href="{{ top.url }}">{{ top.title }}</a></h2>
  <p>{{ top.excerpt }}</p>
</div>

---

## 📰 Latest News

<div class="grid news">

{% for post in site.posts offset:1 limit:6 %}
  <div class="card">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="meta">{{ post.date | date: "%Y-%m-%d" }}</p>
  </div>
{% endfor %}

</div>

---

## 📊 Insights

<div class="grid">

{% for post in site.insights limit:3 %}
  <div class="card highlight">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  </div>
{% endfor %}

</div>

---

## 🔥 Hot Topics

<div class="grid small">

<a class="card link" href="/topic/car-t/">CAR-T</a>
<a class="card link" href="/topic/bispecific-antibody/">Bispecific Antibody</a>
<a class="card link" href="/topic/bcma/">BCMA</a>

</div>
