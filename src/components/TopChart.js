import React, { Component, Fragment } from "react";
import Track from "./Track";
import { accessToken } from "../ENV";

class TopChart extends Component {
  state = {
    topChart: []
  };

  componentDidMount = () => {
    this.getTopHits(this.props.type, this.props.limit);
  };

  getTopHits = (type, limit) => {
    const url = `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ topChart: res.items }));
  };

  renderTopChart = albums => {
    const renderTrack = albums.map(track => {
      const {
        id,
        album: { images },
        name,
        artists
      } = track;
      return (
        <Track
          key={id}
          id={id}
          image={images[1].url}
          name={name}
          artist={artists[0].name}
          handleDetail={this.props.handleDetail}
        />
      );
    });

    return renderTrack;
  };

  render() {
    const { topChart } = this.state;
    return (
      <Fragment>
        <h1>Top Chart</h1>
        <div className="track-list">
          {topChart !== null && topChart && this.renderTopChart(topChart)}
        </div>
      </Fragment>
    );
  }
}

export default TopChart;
