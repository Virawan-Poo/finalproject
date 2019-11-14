import React, { Component, Fragment } from "react";
import Track from "./Track";

import { accessToken } from "../ENV";

class NewReleases extends Component {
  state = {
    newReleases: {}
  };

  componentDidMount = () => {
    this.getNewReleases(this.props.limit);
  };

  getNewReleases = limit => {
    const url = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ newReleases: res.albums }));
  };

  renderNewReleases = albums => {
    const renderTrack = albums.map(track => {
      const { id, images, name, artists, external_urls } = track;
      return (
        <Track
          key={id}
          id={id}
          image={images[1].url}
          name={name}
          artist={artists[0].name}
          url={external_urls.spotify}
          handleDetail={this.props.handleDetail}
        />
      );
    });

    return renderTrack;
  };

  render() {
    const { newReleases } = this.state;
    return (
      <Fragment>
        <h1>New Releases</h1>
        <div className="track-list">
          {newReleases != null &&
            newReleases.items != null &&
            this.renderNewReleases(newReleases.items)}
        </div>
      </Fragment>
    );
  }
}

export default NewReleases;
