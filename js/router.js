const body = document.querySelector('body')
const boldHome = document.querySelector('#nav-home')
const boldUniverse = document.querySelector('#nav-universe')
const boldExploration = document.querySelector('#nav-exploration')

export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  background(routePage) {
    if (routePage === '/') {
      body.classList.add('home')
      body.classList.remove('universe')
      body.classList.remove('exploration')
      boldHome.classList.add('bold')
      boldUniverse.classList.remove('bold')
      boldExploration.classList.remove('bold')
    } else if (routePage === '/universe') {
      body.classList.add('universe')
      body.classList.remove('home')
      body.classList.remove('exploration')
      boldHome.classList.remove('bold')
      boldUniverse.classList.add('bold')
      boldExploration.classList.remove('bold')
    } else {
      body.classList.add('exploration')
      body.classList.remove('home')
      body.classList.remove('universe')
      boldHome.classList.remove('bold')
      boldUniverse.classList.remove('bold')
      boldExploration.classList.add('bold')
    }
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    this.background(pathname)

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
