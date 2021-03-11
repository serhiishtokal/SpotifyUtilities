import {addToPlaylist, getLikedTracks, getTracksFromPlaylist} from "./spotifyTracksMethods.js";
import fs from "fs"
import {BEARER} from "./conf.js";
import fetch from "node-fetch";


// getTracksFromPlaylistWithLimit("7cTTl6rO4vpCh9IzUmi7IX",100).then((tracks)=>{
//     storeData(tracks,"tracks.json")
// })

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

// getLikedTracks().then((tracks)=>{
//     console.log(tracks.length,tracks[0])
//     let uris=tracks.map((currentValue,index, array)=>{
//         currentValue.track.uri
//     })
//     storeData(tracks,"tracks.json")
// })

let likedTracksToPlaylist= async (playlistId)=>{

    let likedTracks= await getLikedTracks();
    storeData(likedTracks,"tracks.json")
    console.log(likedTracks.length)
    let response= await addToPlaylist(playlistId,likedTracks)

    return response

}

likedTracksToPlaylist("1JguUrrv4K51cpWRrWjYKv")

// fetch("https://api.spotify.com/v1/playlists/2wmxHY9cQUb3y5O52BE0sM/tracks", {
//     "headers": {
//         "accept": "application/json",
//         "accept-language": "en",
//         "app-platform": "WebPlayer",
//         "authorization": "Bearer "+BEARER,
//         "content-type": "application/json;charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-site",
//         "spotify-app-version": "1.1.55.424.g9f137bb6"
//     },
//     "referrer": "https://open.spotify.com/",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "{\"uris\":[\"spotify:track:7LL40F6YdZgeiQ6en1c7Lk\",\"spotify:track:3px2rAPu74ltbkf9eZsZ8h\"],\"position\":null}",
//     "method": "POST",
//     "mode": "cors"
// }).then((response)=>{console.log(response)});