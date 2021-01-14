let userToken;
const clientID = '5e6ab80d458d498b81154ce5d1bbcd7a';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        const regExpToken = /access_token=([^&]*)/;
        const regExpExpire = /expires_in=([^&]*)/;

        if(userToken){
            return userToken;
        } else if(window.location.href.match(regExpToken)){
            
            userToken = window.location.href.match(regExpToken)[1];
            let expirationTime = window.location.href.match(regExpExpire)[1];
            setTimeout( () =>{
                userToken = null;
                window.history.replaceState({}, '', '/');
            }, expirationTime*1000);
            
            
            return userToken;
        } else {
        
        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
        };
    },

    async search(term){
        this.getAccessToken();
        
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization : `Bearer ${userToken}` 
            }
        });
        
        const jsonResponse = await response.json();

        /*if(jsonResponse.items === []){
            return [];
        };*/

        

        const songResult = jsonResponse.tracks.items.map(track =>{
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            };
        });
        
        return songResult;
    },

    async savePlaylist(name, trackURIs){

        if(name==='' || trackURIs === []){
            return;
        }

        let accessToken = userToken;
        let headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        let userID;

        const response = await fetch('https://api.spotify.com/v1/me', {headers: headers});

        const jsonResponse = await response.json();

        userID = jsonResponse.id;
        console.log('headers are...');
        console.log(headers);
        console.log('name is...');
        console.log(name);
        const response2 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({'name': name}),
        });

        const jsonResponse2 = await response2.json();

        const playlistID = jsonResponse2.id;

        await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                uris: trackURIs,
            }),
        });

        alert('Saved to spotify!');

    },
};

export default Spotify;