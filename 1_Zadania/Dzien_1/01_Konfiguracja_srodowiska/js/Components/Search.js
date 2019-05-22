import React, { Component } from "react";

class Search extends Component {
  state = {
    movie: "",
    searching: false
  };

  api = "https://api.themoviedb.org/3/search/movie";

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  getMovie = e => {
    e.preventDefault();

    this.setState({
      searching: true
    });

    const { movie } = this.state;

    const data = {
      api_key: "1f6701f4695b66698a043fb831db39e9",
      include_adult: false,
      query: movie,
      language: "pl-PL"
    };
    const urlData = new URLSearchParams(Object.entries(data));

    fetch(`${this.api}?${urlData}`)
      .then(r => {
        if (r.ok) return r.json();
        throw new Error("Błąd pobrania danych!");
      })
      .then(data => {
        if (data.results.length === 0)
          throw new Error("Brak filmów o podanej nazwie!");

        this.props.displayMovies(data.results);
        this.setState({
          searching: false
        });
      })
      .catch(e => {
        this.props.displayMovies({error: e});

        this.setState({
          searching: false
        });
      });
  };

  render() {
    const { movie, searching } = this.state;

    return (
      <div className="d-flex justify-content-center">
        <form className="form-inline mt-3" onSubmit={this.getMovie}>
          <input className="form-control mr-sm-2" type="search" id="movie" placeholder="Znajdź film" value={movie} onChange={this.handleChange} />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            {searching ? (
              <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                Szukam...
              </>
            ) : (
              <span>Szukaj</span>
            )}
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
