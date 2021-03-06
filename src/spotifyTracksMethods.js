import {requestToApi, requestToApiWithBody} from "./request.js"
import {MAX_LIKED_TRACKS_LIMIT, MAX_PLAYLIST_TRACKS_LIMIT, MIN_TRACKS_LIMIT} from "./conf.js";

let getTracksFromPlaylistWithLimit= async (playlistId, offset=0, trackLimit=-1)=> {
    let url = new URL('https://api.spotify.com/v1/playlists/'+playlistId+'/tracks?additional_types=track%2Cepisode&market=from_token');
    appendNumberParameter(url.searchParams,"limit",trackLimit,MAX_PLAYLIST_TRACKS_LIMIT,MIN_TRACKS_LIMIT)
    appendNumberParameter(url.searchParams,"offset",offset,undefined,0)

    let method= "GET"
    let response= await requestToApi(url,method)
    return response.items
}

let getLikedTracksWithLimit = async (offset=0, trackLimit=-1)=>{
    let url = new URL('https://api.spotify.com/v1/me/tracks?market=from_token');
    appendNumberParameter(url.searchParams,"limit",trackLimit,MAX_LIKED_TRACKS_LIMIT,MIN_TRACKS_LIMIT)
    appendNumberParameter(url.searchParams,"offset",offset,undefined, 0)

    let method= "GET"
    let response= await requestToApi(url,method)
    return response.items
}

let getLikedTracks = async (count=undefined)=>{
    let tracks=[]
    let lastGotTracks=[]
    let offset=0;
    do {
        lastGotTracks=await getLikedTracksWithLimit(offset,MAX_LIKED_TRACKS_LIMIT)
        tracks.push(...lastGotTracks)
        offset+=MAX_LIKED_TRACKS_LIMIT
    }while (lastGotTracks.length!==0 && (count===undefined || tracks.length <count) )
    return tracks
}
let getTracksFromPlaylist = async (playlistId,count=undefined)=>{
    let tracks=[]
    let lastGotTracks=[]
    let offset=0;
    do {
        lastGotTracks=await getTracksFromPlaylistWithLimit(playlistId,offset,MAX_PLAYLIST_TRACKS_LIMIT)
        tracks.push(...lastGotTracks)
        offset+=MAX_PLAYLIST_TRACKS_LIMIT
    }while (lastGotTracks.length!==0 && (count===undefined || tracks.length <count) )
    return tracks
}


let appendNumberParameter=(params, paramName,value, maxValue=Number.MAX_SAFE_INTEGER, minValue=Number.MIN_SAFE_INTEGER) =>{
    if(value<=maxValue &&value>=minValue)
    params.append(paramName, value)
    else params.append(paramName, maxValue)
}

let addToPlaylist= async (playlistId,tracks)=>{
    let url = new URL('https://api.spotify.com/v1/playlists/'+playlistId+'/tracks');
    let method= "POST"

    let trackUris=tracks.map((currentValue,index, array)=>{
        return currentValue.track.uri
    })
    let promises=[]
    let counters=[]
    let counter=0;
    do {
        let reqTrackUris=trackUris.slice(counter,counter+100)
        let body=`{"uris":`+JSON.stringify(reqTrackUris)+`,"position":null}`
        //let body="{\"uris\":[\"spotify:track:7LL40F6YdZgeiQ6en1c7Lk\"],\"position\":null}"
        counter+=100
        counters.push(counter)
        promises.push(requestToApiWithBody(url,method,body))
    }while (counter<trackUris.length)

    let responses=await Promise.all(promises)
        responses.forEach(x=>{console.log(x)})
        console.log(counters)

    return responses
}


export {getTracksFromPlaylist,getLikedTracks,addToPlaylist}



