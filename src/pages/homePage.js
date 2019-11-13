import React, { Component, Fragment } from "react";
import NewReleases from "../components/NewReleases";
import TopChart from "../components/TopChart";

class HomePage extends Component {
  state = {
    limit: 12
  };
  render() {
    return (
      <Fragment>
        <NewReleases
          limit={this.state.limit}
          handleFave={this.props.handleFave}
          handleDetail={this.props.handleDetail}
        />
        <TopChart type={"tracks"} limit={this.state.limit} />
      </Fragment>
    );
  }
}

export default HomePage;
