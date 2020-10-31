const links = [{ "name": "Facebook", "url": "https://www.facebook.com" },{ "name": "Google", "url": "https://www.google.com" },{ "name": "Amazon", "url": "https://www.amazon.com" }]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    if (element.tagName === 'div' && element.getAttribute("id") === 'links') {
      var counter;

      for (counter = 0; counter < this.links.length; counter++) {
        element.append(`<a href=${this.links[counter].url}>${this.links[counter].name}</a>`, { html: true})
      }
    } else if (element.tagName === 'div' && element.getAttribute("id") === 'profile') {
      element.removeAttribute("style")
    } else if (element.tagName === 'img') {
      element.setAttribute("src", "https://pbs.twimg.com/media/DFveEOvV0AAIbWQ.jpg")
    } else if (element.tagName === 'h1') {
      element.setInnerContent("Sathvik Ravi")
    } else if (element.tagName === 'div' && element.getAttribute("id") === 'social') {
      element.removeAttribute("style")
      element.setInnerContent(`<a href=\"https://simpleicons.org/icons/gatsby.svg\"><svg viewBox=\"0 0 100 100\"> <image href=\"https://simpleicons.org/icons/gatsby.svg\" x=\"0\" y=\"0\" height=\"100\" width=\"100\" /></svg></a>`, { html : true })
    } else if (element.tagName === 'title') {
      element.setInnerContent("Sathvik Ravi")
    } else if (element.tagName === 'body') {
      element.setAttribute("class", "bg-red-600")
    }
    
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const r = new Router()

  r.get('.*/links', () => new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  }))

  if (request.url === "https://young-lake-a6c6.sathrav5.workers.dev/links") {
    const json = JSON.stringify(links, null, 2)

    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  
  } else {
    const resp = await fetch("https://static-links-page.signalnerve.workers.dev")
    return new HTMLRewriter().on("div#links", new LinksTransformer(links)).on("div#profile", new LinksTransformer())
      .on("img#avatar", new LinksTransformer()).on("h1#name", new LinksTransformer()).on("div#social", new LinksTransformer())
      .on("title", new LinksTransformer())
      .on("body", new LinksTransformer())
      .transform(resp)
  }
}
