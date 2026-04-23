---
layout: page
title: Tags
---

# All Tags

<ul>
{% assign tags = site.tags | sort %}
{% for tag in tags %}
  <li>
    <a href="/tag/{{ tag[0] | slugify }}/">
      {{ tag[0] }} ({{ tag[1].size }})
    </a>
  </li>
{% endfor %}
</ul>
