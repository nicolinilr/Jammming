import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
  }
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}

  addTrack(track) {
    const trackID = track.id;

    if( !this.state.playlistTracks.some( elem => {
      return (elem.id === trackID);
    })){
      const newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);

      this.setState({playlistTracks: newPlaylist});
  }
}

  removeTrack(track) {
    const trackID = track.id;

    const newPlaylist = this.state.playlistTracks.filter((song) => song.id !== trackID);

    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  async savePlaylist(){
    const playlistArray = this.state.playlistTracks;
    
    const trackURIs = playlistArray.map(track => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  async search(term){
    const results = await Spotify.search(term);
   
    this.setState({searchResults: results });
  }

  render(){
  return (
    <div>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <SearchBar onSearch={this.search}/>
        <div className='App-playlist'>
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
  );
  }
};

export default App;
