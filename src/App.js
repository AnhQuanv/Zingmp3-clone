import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './componments/Home/Home';
import Explore from './pages/Explore';
import Library from './pages/Library';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Explore />} />
        <Route path="explore" element={<Explore />} />
        <Route path="library" element={<Library />} />
      </Route>
    </Routes>
  );
}

export default App;
