import React, { Component } from "react";
import { hanndleFavorite, checkFavorite } from "../favoriteHelpers";
class Track extends Component {
  state = {
    isFave: false
  };

  componentDidMount = () => {
    const isFave = checkFavorite(this.props.id).length > 0 ? true : false;
    this.setState({ isFave });
  };

  onFaveToggle = (e, item) => {
    this.setState({ isFave: !this.state.isFave });
    hanndleFavorite(e, item);
    if (this.props.hanndleFavoritesWithRefresh) {
      this.props.hanndleFavoritesWithRefresh(e);
    }
    e.stopPropagation();
  };

  render() {
    const { id, image, name, artist } = this.props;
    return (
      <div className="track" key={id}>
        <div
          className={"favbtn " + (this.state.isFave ? "active" : "")}
          onClick={e => {
            this.onFaveToggle(e, this.props);
          }}
        >
          <i className="fas fa-heart"></i>
        </div>
        <div className="poster">
          <img className="pic" src={image} alt={name} />
        </div>
        <div className="trackinfo">
          <h3>{name}</h3>
          <p>{artist}</p>
        </div>
      </div>
    );
  }
}

export default Track;
