import fetch from "node-fetch";
import {BEARER} from "./conf.js";

let requestToApi=async (url,method)=>{
    let response= await fetch(url, {
        "headers": {
            "accept": "application/json",
            "accept-language": "en",
            "app-platform": "WebPlayer",
            "authorization": "Bearer "+BEARER,
            "if-none-match": "\"MC-ImUyYzQ1ODliOTQ0ZjYyNjUyMTE2MTllZjM0N2UxZWNjIg==\"",
            "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "spotify-app-version": "1.1.55.422.g73813ac1"
        },
        "referrer": "https://open.spotify.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": method,
        "mode": "cors"
    });
    let logMessage=logRequest(response)
    if (response.status !==200) throw logMessage

    response= await response.json()
    return response
}

let requestToApiWithBody=async (url,method,body)=>{
    let response= await fetch(url, {
        "headers": {
            "accept": "application/json",
            "accept-language": "en",
            "app-platform": "WebPlayer",
            "authorization": "Bearer "+BEARER,
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "spotify-app-version": "1.1.55.424.g9f137bb6"
        },
        "referrer": "https://open.spotify.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": method,
        "mode": "cors"
    });

    response= await response.json()
    return response
}


let logRequest=(response)=>{
    let logMessage=response.headers.get("date")+" "+ response.url+" "+ response.status+" "+ response.statusText
    console.log(logMessage)
    return logMessage
}
export {requestToApi, requestToApiWithBody}
