import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [{name: 'Doobom', artist:'Jimmy', album:'Beebop', id: '12'}, {name:'whee', artist:'bangalang', album:'The dingdong', id:'3'},{name:'gotta get it', artist:'Hey doo', album:'got it', id:'47'}],
      playlistName: 'The Jammms',
      playlistTracks: [{name:'Still Tryin\' to get it', artist:'Some Other Guy', album:'Never', id:'123'}, {name:'Hard-Coding is Tedious', artist:'Can\'t wait for the API', album:'Whee', id:'7'},{name:'Guess What?', artist:'Chicken Butt', album:'Haha gottem', id:'6969'}],
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

  savePlaylist(){
    const playListArray = this.state.playListTracks;
    const trackURIs = playListArray.map(track => track.uri);
    return trackURIs;
  }

  search(term){
    console.log(term);
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
