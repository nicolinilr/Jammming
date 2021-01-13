import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {searchResults: [{name: 'Doobom', artist:'Jimmy', album:'Beebop', id: '12'}, {name:'whee', artist:'bangalang', album:'The dingdong', id:'3'},{name:'gotta get it', artist:'Hey doo', album:'got it', id:'47'}];
  };
  render(){
  return (
    <div>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <!-- Add a SearchBar Component -->
        <div className='App-playlist'>
          <SearchResults searchResults={this.state.searchResults}/>
          <!-- Add a Playlist Component -->
        </div>
      </div>
    </div>
  );
  }
};

export default App;
