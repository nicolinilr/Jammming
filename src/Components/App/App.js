import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  render(){
  return (
    <div>
      <h1>Ja<span className='highlight'>mmm</span>ing</h1>
      <div className='App'>
        <!-- Add a SearchBar Component -->
        <div className='App-playlist'>
          <!-- Add a SearchResults Component -->
          <!-- Add a Playlist Component -->
        </div>
      </div>
    </div>
  );
  }
};

export default App;
