import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieID from "./pages/MovieID/MovieID";
import MovieList from "./pages/MovieList/MovieList";
import "./scss/main.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieID />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
