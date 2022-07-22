import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <img style={{ width: "100%", aspectRatio: "16/3", objectFit: "cover" }} src="https://www.europapark.de/sites/default/files/media_image/2021-01/magic_cinema_4d_europa-park_02.jpg" alt="Cinema" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />} /> 
          <Route path="/movie/:id" element={<MovieDetail />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
