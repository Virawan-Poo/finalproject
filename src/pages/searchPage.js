import React, { Component, Fragment } from "react";
import Track from "../components/Track";
import { accessToken } from "../ENV";
import imageDefault from "../defaultimg.jpg";

class SearchPage extends Component {
  state = {
    searchText: "",
    resultTracks: [],
    resultArtists: []
  };

  handleChange = e => {
    const searchText = e.target.value;
    this.setState(
      {
        resultTracks: [],
        resultArtists: []
      },
      () => {
        if (searchText.length > 0) {
          this.setState({ searchText }, () => {
            this.getSearchResult(this.state.searchText);
          });
        }
      }
    );
  };

  getSearchResult = q => {
    const url = `https://api.spotify.com/v1/search?q=${q}&type=track%2Cartist&limit=24`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const { tracks, artists } = res;
        if (tracks && tracks.items) {
          this.setState({ resultTracks: tracks.items });
        }
        if (artists && artists.items) {
          this.setState({ resultArtists: artists.items });
        }
      });
  };

  renderResultTrack = albums => {
    const renderTrack = albums.map(track => {
      const {
        id,
        album: { images },
        name,
        artists
      } = track;

      let imagesUrl = imageDefault;
      if (images && images.length > 0) {
        imagesUrl = images[1].url;
      }

      return (
        <Track
          key={id}
          id={id}
          image={imagesUrl}
          name={name}
          artist={artists[0].name}
          handleDetail={this.props.handleDetail}
        />
      );
    });
    return renderTrack;
  };

  renderResultArtists = albums => {
    const renderArtists = albums.map(artist => {
      const { id, images, name } = artist;

      let imagesUrl = imageDefault;
      if (images && images.length > 0) {
        imagesUrl = images[1].url;
      }

      return (
        <Track
          key={id}
          id={id}
          image={imagesUrl}
          name={name}
          handleDetail={this.props.handleDetail}
        />
      );
    });
    return renderArtists;
  };

  render() {
    const { resultTracks, resultArtists } = this.state;
    return (
      <Fragment>
        <div className="search">
          <h1>Find your favorite song</h1>

          <form>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Find your music here..."
            />
            <button>
              <i className="fas fa-search"></i> Search
            </button>
          </form>
        </div>

        <div className="result">
          {resultTracks.length > 0 && (
            <Fragment>
              <h2>Songs</h2>
              <div className="track-list">
                {this.renderResultTrack(resultTracks)}
              </div>
            </Fragment>
          )}
          {resultArtists.length > 0 && (
            <Fragment>
              <h2>Artists</h2>
              <div className="track-list">
                {this.renderResultArtists(resultArtists)}
              </div>
            </Fragment>
          )}
          {resultTracks.length === 0 && resultArtists.length === 0 && (
            <Fragment>
              <div className="center">
                <p>Search some thing!</p>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default SearchPage;
