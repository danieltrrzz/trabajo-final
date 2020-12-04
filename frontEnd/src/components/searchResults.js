import starEnabled from "../star-enabled.png";
import starDisabled from "../star-disabled.png";
import getFormatNumber from "./getformatnumber.js"


class SearchResults {
  constructor() {
    this.cardWrapper = document.querySelector("#cardWrapper");
  }

  createCard(hotel) {
    console.log(hotel);
    let stars = `<div class="row">`;

    for (let i = 0; i < 5; i++) {
      if (i < hotel.estrellas) {
        stars += `
        <div class="col">
            <img src="${starEnabled}" class="card-img-top" alt="..."></img>
        </div>`;
      } else {
        stars += `
        <div class="col">
            <img src="${starDisabled}" class="card-img-top" alt="..."></img>
        </div>`;
      }
    }
    stars += `</div>`;

    const card = `
            <div class="card col-5 m-1 reservaHotel" data-id="${hotel.id}">
                <img src="${hotel.imagen}" class="card-img-top" alt="..." width="100px" height="150px">
                <div class="card-body">
                    <h2 class="card-title">${hotel.nombre}</h2>
                    ${stars}
                    <hr>
                    <h3 class="card-title">$ ${getFormatNumber(hotel.precio)}</h3>
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
