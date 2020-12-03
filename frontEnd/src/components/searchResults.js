class SearchResults {
  constructor() {
    this.cardWrapper = document.querySelector("#cardWrapper");
  }

  createCard(hotel) {
    console.log(hotel);
    let stars = `<div class="row">`;
    
    for (let i = 0; i < 5; i++) {
      if (i < hotel.estrellas) {
        stars += `<img src="./assets/images/star-enabled.png" class="card-img-top" alt="..."></img>`;
      } else {
        stars += `<img src="./assets/images/star-disabled.png" class="card-img-top" alt="..."></img>`;
      }
    }
    stars += `</div>`;

    const card = `
            <div class="card">
                <img src="${hotel.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${hotel.nombre}</h2>
                    ${stars}
                    <h3 class="card-title">${hotel.precio}</h3>
                </div>
            </div>  
        `;
    return card;
  }

  /* createCard(track){
        const card = `
            <div class="card">
                <img src="${track.imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${track.title}</h5>
                    ${
                        track.previewUrl ? `<audio controls src="${track.previewUrl}"></audio>` : '<i>preview no disponible</i>'
                    } 
                </div>
            </div>  
        `;
        return card;
    } */

  render(hoteles) {
    const cards = hoteles.map((hotel) => this.createCard(hotel));
    this.cardWrapper.innerHTML = cards.join("");
  }
}

export default SearchResults;
