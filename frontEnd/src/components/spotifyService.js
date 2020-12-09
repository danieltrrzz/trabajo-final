class SpotifyService {
  searchTerm(schema="hotel",tern="") {
    console.log(tern);

    return fetch(`/api/${schema}/${tern}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}

export default SpotifyService;
