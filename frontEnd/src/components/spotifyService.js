class SpotifyService {

    searchTerm(tern){

        console.log(tern);

        return fetch(`https://api.spotify.com/v1/search?q=${tern}&type=track`, {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer BQDMEoErgdK3T262XJY3SeSjE6Y2J4EtuuCA1BH7Zd5xvgG3C8_b8Nvxjse0YdKkAhV11FhowwR1eheoREdccq5-WQAM0pJRh_ZRLZ6DNqoDrP9JXbw-uo0TcGw3MTatNYre0W4xInmn-EUrEDBGyiXrKY55_mU"
            }            
        })
        .then((response) => response.json());
    };
}   

export default SpotifyService;