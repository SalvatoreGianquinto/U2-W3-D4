const apiKey = "3ZpdM6xl5UoFZbrcpWJPWhj4FViY5TYVYR70jLpGdF2pSPNidU3e2qhL"
const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")
const loadImagesBtn = document.getElementById("loadImages")
const loadSecondaryImagesBtn = document.getElementById("loadSecondaryImages")
const imageContainer = document.getElementById("imageContainer")

function fetchImages(query) {
  fetch("https://api.pexels.com/v1/search?query=" + query, {
    headers: { Authorization: apiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      imageContainer.innerHTML = "" // Svuota il container

      data.photos.forEach((photo) => {
        const col = document.createElement("div")
        col.setAttribute("class", "col-md-4")

        const card = document.createElement("div")
        card.setAttribute("class", "card shadow-sm mb-4")

        const img = document.createElement("img")
        img.setAttribute("src", photo.src.medium)
        img.setAttribute("class", "card-img-top")
        img.setAttribute("style", "cursor: pointer;")
        img.onclick = () => showImageDetails(photo)

        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")

        const title = document.createElement("h5")
        title.setAttribute("class", "card-title")
        title.setAttribute("style", "cursor: pointer;")
        title.textContent = "Photo by " + photo.photographer
        title.onclick = () => showImageDetails(photo)

        const description = document.createElement("p")
        description.setAttribute("class", "card-text")
        description.textContent = "ID: " + photo.id

        const btnGroup = document.createElement("div")
        btnGroup.setAttribute(
          "class",
          "d-flex align-items-center justify-content-between"
        )

        const hideBtn = document.createElement("button")
        hideBtn.setAttribute("class", "btn btn-outline-secondary btn-sm")
        hideBtn.textContent = "Hide"
        hideBtn.onclick = () => (col.style.display = "none")

        btnGroup.appendChild(hideBtn)
        cardBody.appendChild(title)
        cardBody.appendChild(description)
        cardBody.appendChild(btnGroup)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        imageContainer.appendChild(col)
      })
    })
    .catch((error) =>
      console.error("Errore nel caricamento delle immagini:", error)
    )
}

loadImagesBtn.onclick = () => fetchImages("mountains")
loadSecondaryImagesBtn.onclick = () => fetchImages("kittens")

searchButton.onclick = () => {
  const query = searchInput.value.trim()
  if (query !== "") {
    fetchImages(query)
  }
}

function showImageDetails(photo) {
  const detailPage = window.open("", "_blank")
  detailPage.document.write(`
    <html>
    <head>
      <title>Image Details</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="p-5 text-center">
      <h1>${photo.photographer}</h1>
      <img src="${photo.src.large}" class="rounded shadow img-fluid">
      <p><a href="${photo.photographer_url}" target="_blank">View Photographer's Profile</a></p>
      <button onclick="window.close()" class="btn btn-secondary">Back</button>
    </body>
    </html>
  `)
}
