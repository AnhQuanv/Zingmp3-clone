import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componments/Home/Home';
import Explore from './pages/Explore';
import Library from './pages/Library';
import Album from './pages/Album';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Explore />} />
        <Route path="explore" element={<Explore />} />
        <Route path="library" element={<Library />} />
        <Route path="album/:title/:plid" element={<Album />} />

      </Route>
    </Routes>
  );
}

export default App;
