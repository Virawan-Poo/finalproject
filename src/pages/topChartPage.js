import React, { Component, Fragment } from "react";
import TopChart from "../components/TopChart";

class TopChartPage extends Component {
  state = {
    limit: 48,
    type: "tracks"
  };
  render() {
    return (
      <Fragment>
        <TopChart
          type={this.state.type}
          limit={this.state.limit}
          handleDetail={this.props.handleDetail}
        />
      </Fragment>
    );
  }
}

export default TopChartPage;
