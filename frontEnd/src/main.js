import "./index.scss";
import Search from "./components/search";
import SpotifyService from "./components/spotifyService";
import SearchResults from "./components/searchResults";
import dateCalculator from "./components/datecalculator";
import getFormatNumber from "./components/getformatnumber.js";

const spotifyService = new SpotifyService();
const searchResults = new SearchResults();

const fillPriceDays = () => {
  var checkinDate = new Date(inputcheckInDate.value);
  var checkoutDate = new Date(inputcheckOutDate.value);
  var dias = Math.ceil(
    (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
  );
  inputDays.value = dias;
  inputPrice.value = getFormatNumber(dias * hotelSeleccionado.precio);
};

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

window.addEventListener("load", () => {
  const inputcheckInDate = document.querySelector("#checkin-date");
  const inputcheckOutDate = document.querySelector("#checkout-date");
  const cardWrapper = document.querySelector("#cardWrapper");
  const formBooking = document.querySelector("#formBooking");
  const inputHotelForm = document.querySelector("#inputSearch");
  const inputPrice = document.querySelector("#inputPrice");
  const inputDays = document.querySelector("#inputDays");
  const btnBooking = document.querySelector("#btnBooking");
  const bookingWrongDates = document.querySelector("#bookingWrongDates");

  bookingWrongDates.hidden = true;
  btnBooking.disabled = true;

  var hotelSeleccionado = {};

  const verifyDates = () => {
    var checkinDate = new Date(inputcheckInDate.value);
    var checkoutDate = new Date(inputcheckOutDate.value);
    var dias = Math.ceil(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    );
    console.log(bookingWrongDates);
    if (dias <= 0) {
      bookingWrongDates.hidden = false;
      btnBooking.disabled = true;
    } else {
      bookingWrongDates.hidden = true;
      btnBooking.disabled = false;
    }
  };

  const fillPriceDays = () => {
    var checkinDate = new Date(inputcheckInDate.value);
    var checkoutDate = new Date(inputcheckOutDate.value);
    var dias = Math.ceil(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    );
    if (dias <= 0) {
      bookingWrongDates.hidden = false;
    } else {
      inputDays.value = dias;
      inputPrice.value = getFormatNumber(dias * hotelSeleccionado.precio);
    }
  };

  inputcheckInDate.value = dateCalculator(2);
  inputcheckOutDate.value = dateCalculator(4);

  inputcheckInDate.min = dateCalculator(1);
  inputcheckOutDate.min = dateCalculator(2);
  search();

  cardWrapper.addEventListener("click", (e) => {
    const element = e.target.closest(".reservaHotel");
    const inputHotelForm = document.querySelector("#inputSearch");

    if (element) {
      console.log("Id ", element.dataset.id);
      spotifyService
        .searchTerm("hotel", element.dataset.id)
        .then((response) => {
          inputHotelForm.value = response.nombre;
          hotelSeleccionado = response;
          fillPriceDays();
          verifyDates();
        });
    }
  });
  formBooking.addEventListener("change", () => {
    if (inputHotelForm.value != "") {
      fillPriceDays();
    }
  });
  inputcheckInDate.addEventListener("change", () => {
    verifyDates();
  });
  inputcheckOutDate.addEventListener("change", () => {
    verifyDates();
  });
});

// Clase submit
