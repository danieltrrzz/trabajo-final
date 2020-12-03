class SpotifyService {
  searchTerm(tern) {
    console.log(tern);

    return fetch(`/api/hotel`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}

export default SpotifyService;
