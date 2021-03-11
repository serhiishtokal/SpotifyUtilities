import {requestToApi} from "./request.js"
import {MAX_LIKED_TRACKS_LIMIT, MAX_PLAYLIST_TRACKS_LIMIT} from "./conf.js";

let getTracksFromPlaylist= async (playlistId,offset=0,trackLimit="")=> {
    let limit=prepareTrackLimit(trackLimit,MAX_PLAYLIST_TRACKS_LIMIT)
    let url="https://api.spotify.com/v1/playlists/"+playlistId+"/tracks?offset=0&"+limit+"&additional_types=track%2Cepisode&market=from_token"
    let method= "GET"
    let response= await requestToApi(url,method)
    return response.items
}

let getLikedTracks = async (offset=0,trackLimit="")=>{
    let limit=prepareTrackLimit(trackLimit,MAX_LIKED_TRACKS_LIMIT)
    let url="https://api.spotify.com/v1/me/tracks?"+limit+"&offset=0&market=from_token"
    let method= "GET"
    let response= await requestToApi(url,method)
    return response.items
}

let prepareTrackLimit=(responseTrackLimit, maxLimit) =>{
    let trackLimit=""
    if (responseTrackLimit<=maxLimit &&responseTrackLimit>=1) trackLimit="limit="+responseTrackLimit
    return trackLimit
}




export {getTracksFromPlaylist,getLikedTracks}



