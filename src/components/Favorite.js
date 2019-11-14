import React, { Component, Fragment } from "react";
import Track from "./Track";

class Favorite extends Component {
  state = {
    favorites: []
  };

  componentDidMount = () => {
    this.getFavorite();
  };

  getFavorite = () => {
    let favoriteData = localStorage.getItem("favorites");
    if (favoriteData) {
      favoriteData = JSON.parse(favoriteData);
      this.setState({
        favorites: favoriteData
      });
    }
  };

  hanndleFavoritesWithRefresh = e => {
    this.getFavorite();
  };

  renderFavorite = favorites => {
    const renderTrack = favorites.map(track => {
      const { id, image, name, artist, url } = track;
      return (
        <Track
          key={id}
          id={id}
          image={image}
          name={name}
          artist={artist}
          url={url}
          hanndleFavoritesWithRefresh={this.hanndleFavoritesWithRefresh}
        />
      );
    });

    return renderTrack;
  };

  render() {
    const { favorites } = this.state;

    return (
      <Fragment>
        {favorites.length > 0 ? (
          <Fragment>
            <h1>Favorites</h1>
            <div className="track-list">{this.renderFavorite(favorites)}</div>
          </Fragment>
        ) : (
          <div className="issue center">
            <h1>You haven't click like anything!</h1>
            <h2>
              Find some music you like, and Click{" "}
              <i className="fas fa-heart"></i>
            </h2>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Favorite;
