let userToken;
const clientID = '5e6ab80d458d498b81154ce5d1bbcd7a';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(userToken){
            return userToken;
        };

        const regExpToken = /access_token=([^&]*)/;
        const regExpExpire = /expires_in=([^&]*)/;
    
        if(window.location.href.match(regExpToken)){
        
            userToken = window.location.href.match(regExpToken);
            let expirationTime = window.href.match(regExpExpire);
            setTimeout( () =>{
                userToken = null;
            }, expirationTime*1000);
            window.history.replaceState({}, '', '/');
            return userToken;
        }

        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
    
    },

    async search(term){
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization : `Bearer ${userToken}` 
            }
        });

        const jsonResponse = await response.json();

        const songResult = jsonResponse.items.map(track =>{
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            };
        });

        return songResult;
    }
};

export default Spotify;