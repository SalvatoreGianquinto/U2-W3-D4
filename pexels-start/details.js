const apiKey = "3ZpdM6xl5UoFZbrcpWJPWhj4FViY5TYVYR70jLpGdF2pSPNidU3e2qhL"
const urlParams = new URLSearchParams(window.location.search)
const imageId = urlParams.get("id")

const goBack = () => window.history.back()

if (!imageId) {
  alert("Nessuna immagine selezionata")
  goBack()
} else {
  fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
    headers: { Authorization: apiKey },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Errore nella risposta del server")
      return response.json()
    })
    .then((photo) => {
      displayImageDetails(photo)
    })
    .catch((error) => console.error("Errore nel recupero dei dettagli:", error))
}

const displayImageDetails = function (photo) {
  const image = document.getElementById("image")
  const imageTitle = document.getElementById("imageTitle")
  const photographerLink = document.getElementById("photographerLink")

  image.src = photo.src.large
  imageTitle.textContent = `Photo by: ${photo.photographer}`
  photographerLink.textContent = photo.photographer
  photographerLink.href = photo.photographer_url

  image.onload = () => setAverageBackgroundColor(image)
}
