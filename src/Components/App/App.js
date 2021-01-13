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
}
  render(){
  return (
    <div>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
        </div>
      </div>
    </div>
  );
  }
};

export default App;
