const fetch = require("node-fetch");

let getAllSongsFromPlaylist= async (playlistId)=> {
   let response= await fetch("https://api.spotify.com/v1/playlists/2wmxHY9cQUb3y5O52BE0sM/tracks?offset=0&limit=100&additional_types=track%2Cepisode&market=from_token", {
       "headers": {
           "accept": "application/json",
           "accept-language": "en",
           "app-platform": "WebPlayer",
           "authorization": "Bearer BQDwrSV7DZMnkfsCu_fBnsxTQewrNxiFffRRY66xAmmovdaIo2GbXqjHriYdmu7hCAHL5lZQ_lWDw1m50pIuLl8QMZoxP1i9n1jZe2S1-Lmq3ejf2ohsRxThwUw88ftafsUecyK8zPhOoXiLDR8VZzfChz5MkEwN0fObwOW0eBUqTR8Z7DELfp-liOpdAnRxDJWOmcW26-UQzlh0mEoqYxvadl-BKicNctXYUdk7KQdkUPNRtgJOE672wbc_n8ef4kK4gk3fX0nkatOfw5arIn4f0xyYoWGE1BjJxIbEal_7-rPQDLHJDnUi",
           "if-none-match": "\"MC-IjNjZWMwYTY5NDZjOGE5ZWQ3MDU0YTYyODFkNDE1N2E1Ig==\"",
           "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
           "sec-ch-ua-mobile": "?0",
           "sec-fetch-dest": "empty",
           "sec-fetch-mode": "cors",
           "sec-fetch-site": "same-site",
           "spotify-app-version": "1.1.55.421.g1dcb9d86"
       },
       "referrer": "https://open.spotify.com/",
       "referrerPolicy": "strict-origin-when-cross-origin",
       "body": null,
       "method": "GET",
       "mode": "cors"
   });
    response= await response.json()
    let tracks=response.items
    console.log(tracks)
    return tracks
}



getAllSongsFromPlaylist("2wmxHY9cQUb3y5O52BE0sM").then(()=>{})



