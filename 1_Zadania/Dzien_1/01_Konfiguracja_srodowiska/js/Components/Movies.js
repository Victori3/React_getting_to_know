import React from "react";
import SingleMovie from "./SingleMovie";

function Movies(props) {
  const { movies } = props;

  return (
    <div className="py-5 mb-5 bg-light">
      <div className="container">
        <div className="row">
          {typeof movies.error !== "undefined" ? <h3>{movies.error.message}</h3> : movies.map(movie => <SingleMovie movie={movie} key={movie.id} />)}
        </div>
      </div>
    </div>
  );
}

export default Movies;
