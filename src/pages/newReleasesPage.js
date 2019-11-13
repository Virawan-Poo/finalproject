import React, { Component, Fragment } from "react";
import NewReleases from "../components/NewReleases";

class NewReleasesPage extends Component {
  state = {
    limit: 48
  };
  render() {
    return (
      <Fragment>
        <NewReleases
          limit={this.state.limit}
          handleDetail={this.props.handleDetail}
        />
      </Fragment>
    );
  }
}

export default NewReleasesPage;
