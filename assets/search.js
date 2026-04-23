fetch('/search.json')
  .then(res => res.json())
  .then(data => {

    const idx = lunr(function () {
      this.ref('url')
      this.field('title')
      this.field('content')

      data.forEach(doc => this.add(doc))
    })

    const searchBox = document.getElementById('search-box')
    const results = document.getElementById('results')

    searchBox.addEventListener('input', function () {
      const query = this.value

      if (!query) {
        results.innerHTML = ''
        return
      }

      const matches = idx.search(query)

      results.innerHTML = matches.map(match => {
        const item = data.find(d => d.url === match.ref)
        return `<li><a href="${item.url}">${item.title}</a></li>`
      }).join('')
    })

  })
