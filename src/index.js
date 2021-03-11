import {getTracksFromPlaylist,getLikedTracks} from "./spotifyTracksMethods.js";


getTracksFromPlaylist("7cTTl6rO4vpCh9IzUmi7IX").then((tracks)=>{console.log( tracks,tracks.length)})

//getLikedTracks(100).then((tracks)=>{console.log(tracks.length, tracks)})