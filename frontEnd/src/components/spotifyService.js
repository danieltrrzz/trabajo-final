class SpotifyService {
  searchTerm(schema="hotel",term="") {
    /* console.log(term); */

    return fetch(`/api/${schema}/${term}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}

export default SpotifyService;
