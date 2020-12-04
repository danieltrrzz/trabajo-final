import "./index.scss";
import Search from "./components/search";
import SpotifyService from "./components/spotifyService";
import SearchResults from "./components/searchResults";
import dateCalculator from "./components/datecalculator";

const spotifyService = new SpotifyService();
const searchResults = new SearchResults();

window.addEventListener("load", () => {
  /* const inputcheckInDate = document.querySelector("#checkin-date");
  const inputcheckOutDate = document.querySelector("#checkout-date"); */

  /* inputcheckInDate.value = dateCalculator(3);
  inputcheckOutDate.value = dateCalculator(6);

  inputcheckInDate.min = dateCalculator(1);
  inputcheckOutDate.min = dateCalculator(2); */
  search();
  const cardWrapper = document.querySelector("#cardWrapper");
  console.log(cardWrapper);
 cardWrapper.addEventListener("click","div.reservaHotel", () => {
  alert("test");
});
});



// Clase submit
const search = () => {
  spotifyService
    .searchTerm()
    .then((response) => {
      console.log(response);

      const parseHotel = response.map((hotel) => {
        return {
          id: hotel._id,
          nombre: hotel.nombre,
          estrellas: hotel.estrellas,
          imagen: hotel.imagen,
          ciudad: hotel.ciudad,
          precio: hotel.precio,
        };
      });
      searchResults.render(parseHotel);
    })
    .catch((error) => {
      console.log(error);
    });
};
