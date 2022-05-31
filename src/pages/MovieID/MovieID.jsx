import { useParams } from "react-router-dom";

import useFetch from "../../components/useFetch";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const MovieID = () => {
  let trailerKey = "";
  let genreString = "";
  let picString = "";

  const { id } = useParams();
  const {
    data: movie,
    error,
    isPending,
  } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=b48ee67edfa90490c5c00809b96d895b&language=en-EN`
  );

  const { data: trailer } = useFetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b48ee67edfa90490c5c00809b96d895b&language=en-EN`
  );

  movie &&
    movie.genres.map((genreName) => {
      return (genreString += genreName.name + ", ");
    });

  trailer &&
    (trailer.results.length > 0
      ? (trailerKey = trailer.results[0].key)
      : (trailerKey = ""));

  movie &&
    (movie.poster_path === null
      ? (picString = "../assets/images/not_available")
      : (picString = `https://image.tmdb.org/t/p/w500${movie.poster_path}`));

  return (
    <>
      <Header />
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {movie && (
        <main>
          <section>
            <article>
              <h2>{movie.title}</h2>

              <div className="details" key={movie.id}>
                <div className="poster">
                  <img src={picString} alt="bild" />
                </div>

                <div className="infos">
                  <div className="hlDetails">Release Date</div>
                  <div className="infoDetails">{movie.release_date}</div>

                  <div className="hlDetails">Genres</div>
                  <div className="infoDetails">
                    {genreString.substring(0, genreString.length - 2)}
                  </div>

                  <div className="hlDetails">Overview</div>
                  <div className="infoDetails">{movie.overview}</div>

                  <div className="hlDetails">Average Voting</div>
                  <div className="infoDetails">{movie.vote_average}</div>

                  <div className="trailer">
                    <p>Watch Trailer</p>

                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title=".MOV Videoplayer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default MovieID;
