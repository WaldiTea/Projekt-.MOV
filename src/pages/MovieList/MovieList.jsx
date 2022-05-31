import env from "react-dotenv";
import { useEffect, useState } from "react";

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

/* import Genres from "../../data/genre.json"; */
import noImg from "../../assets/images/not_available.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [popular, setPopular] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    popular &&
      fetch(env.API_POPULAR_MOVIE_URL + env.API_KEY + env.PAGE_SITE + pageCount)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        });
  }, [pageCount, popular]);

  useEffect(() => {
    !popular &&
      fetch(
        env.API_SEARCH_MOVIE_URL +
          env.API_KEY +
          env.SEARCH_SITE +
          searchValue +
          env.PAGE_SITE +
          pageCount
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        });
  }, [pageCount, searchValue, popular]);

  /* const getGenreById = (genreId) => {
    return Genres.filter((singleGenre) => singleGenre.id === genreId).map(
      (singleGenre) => {
        return singleGenre.name;
      }
    );
  }; */

  return (
    <>
      <Header
        onKeyDown={(e) =>
          e.key === "Enter" &&
          (e.target.value.trim() === "" ? setPopular(true) : setPopular(false),
          setSearchValue(e.target.value))
        }
      />
      <main>
        <h2 className="page-title">Popular movies</h2>
        <section className="movie-section">
          {movies.map((movie, i) => {
            /* const genreNames = movie.genre_ids
              .map((genreId) => getGenreById(genreId))
              .slice(0, 2)
              .join(", "); */
            return (
              <figure
                className="figure"
                key={i}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="image-wrapper">
                  <img
                    src={
                      movie.poster_path === null
                        ? noImg
                        : env.IMG_URL + movie.poster_path
                    }
                    alt="movie"
                  />
                </div>
                <figcaption>
                  {/* <h4>
                    {movie.release_date.slice(0, 4)} - {genreNames}
                  </h4> */}
                  <h3>{movie.title}</h3>
                </figcaption>
              </figure>
            );
          })}
        </section>
        {pageCount <= 1 ? (
          <div className="button-wrapper">
            <button>
              <BsFillArrowRightSquareFill
                className="arrow-right"
                size={42}
                onClick={() =>
                  setPageCount((currpageCount) => currpageCount + 1)
                }
              />
            </button>
          </div>
        ) : (
          <div className="button-wrapper">
            <button>
              <BsFillArrowLeftSquareFill
                className="arrow-left"
                size={42}
                onClick={() =>
                  setPageCount((currpageCount) => currpageCount - 1)
                }
              />
            </button>
            <button>
              <BsFillArrowRightSquareFill
                className="arrow-right"
                size={42}
                onClick={() =>
                  setPageCount((currpageCount) => currpageCount + 1)
                }
              />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MovieList;
