import {getTracksFromPlaylist,getLikedTracks} from "./spotifyTracksMethods.js";
import fs from "fs"


// getTracksFromPlaylist("7cTTl6rO4vpCh9IzUmi7IX",100).then((tracks)=>{
//     storeData(tracks,"tracks.json")
// })

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

getLikedTracks(400).then((tracks)=>{
    console.log(tracks.length,tracks[0])
    storeData(tracks,"tracks.json")
})