import "./index.scss";
import Search from "./components/search";
import SpotifyService from "./components/spotifyService";
import SearchResults from "./components/searchResults";
import dateCalculator from "./components/datecalculator";
import getFormatNumber from "./components/getformatnumber.js";

const spotifyService = new SpotifyService();
const searchResults = new SearchResults();

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
  const inputEmail=document.querySelector("#inputEmail");
  const inputPrice = document.querySelector("#inputPrice");
  const inputDays = document.querySelector("#inputDays");
  const btnBooking = document.querySelector("#btnBooking");
  const bookingWrongDates = document.querySelector("#bookingWrongDates");
  const bookingSuccess = document.querySelector("#bookingSuccess");
  const bookingId = document.querySelector("#bookingId");
  bookingWrongDates.hidden = true;
  btnBooking.disabled = true;

  bookingSuccess.hidden = true;

  var hotelSeleccionado = {};
  var dias = 0;
  var costoReserva = 0;

  const verifyDates = () => {
    var checkinDate = new Date(inputcheckInDate.value);
    var checkoutDate = new Date(inputcheckOutDate.value);
    dias = Math.ceil(
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
      costoReserva = getFormatNumber(dias * hotelSeleccionado.precio);
      inputPrice.value = costoReserva;
    }
  };

  inputcheckInDate.value = dateCalculator(2);
  inputcheckOutDate.value = dateCalculator(4);

  inputcheckInDate.min = dateCalculator(1);
  inputcheckOutDate.min = dateCalculator(2);
  search();

  cardWrapper.addEventListener("click", (e) => {
    const element = e.target.closest(".reservaHotel");

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


  formBooking.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombreHotel = hotelSeleccionado._id;
    const fechaCheckIn = inputcheckInDate.value;
    const fechaCheckout = inputcheckOutDate.value;
    const diasReserva = dias;
    const valorReserva = costoReserva.replace(/\,/g, "");
    const email = inputEmail.value;
    /* const username = "5fd181fed51c003ad82eb369"; */

    console.log(fechaCheckIn);
    console.log(fechaCheckout);
    console.log(diasReserva);
    console.log(valorReserva);
    console.log(nombreHotel);

    /* const formData = new FormData();
    formData.append("fechaLLegada", fechaCheckIn);
    formData.append("fechaSalida", fechaCheckout);
    formData.append("diasEstadia", diasReserva);
    formData.append("valorEstadia", valorReserva);
    formData.append("hotel", nombreHotel);
 */
    /* console.log(formData);
    console.log(
      JSON.stringify({
        fechaLLegada: fechaCheckIn,
        fechaSalida: fechaCheckout,
        diasEstadia: diasReserva,
        valorEstadia: valorReserva,
        email: email,
        hotel: nombreHotel
      })
    ); */

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fechaLLegada: fechaCheckIn,
        fechaSalida: fechaCheckout,
        diasEstadia: diasReserva,
        valorEstadia: valorReserva,
        correo: email,
        /* usuario:username, */
        hotel: nombreHotel
      }),
      /* body: formData */
    });
    if (!res.ok) {
      console.log("Error", res.body);
    } else {
      const data = await res.json();
      console.log(data.Id);
      console.log(res);

      bookingSuccess.hidden = false;
      bookingId.innerHTML = data.Id ;
      
      setInterval(() => {
        bookingSuccess.hidden = true;
        btnBooking.disabled = true;
        formBooking.reset();
        inputcheckInDate.value = dateCalculator(2);
        inputcheckOutDate.value = dateCalculator(4);

        inputcheckInDate.min = dateCalculator(1);
        inputcheckOutDate.min = dateCalculator(2);
      }, 10000);
    }
  });
});

// Clase submit
