import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
import SearchPage from "./pages/searchPage";
import HomePage from "./pages/homePage";
import NewReleasesPage from "./pages/newReleasesPage";
import FavoritePage from "./pages/favoritePage";
import TopChartPage from "./pages/topChartPage";

class App extends Component {
  state = {
    isActive: false,
    cuurentPath: window.location.pathname
  };

  handleActive = e => {
    const { pathname } = window.location;
    this.setState({
      cuurentPath: pathname
    });
    e.stopPropagation();
  };

  render() {
    const { cuurentPath } = this.state;
    return (
      <div className="music-app">
        <Router>
          <nav className="category">
            <ul>
              <h2>Browse Music</h2>
              <li
                className={cuurentPath === "/" ? "active" : ""}
                onClick={e => {
                  this.handleActive(e);
                }}
              >
                <Link to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li
                className={cuurentPath === "/browse" ? "active" : ""}
                onClick={e => {
                  this.handleActive(e);
                }}
              >
                <Link to="/browse">
                  <i className="fas fa-search"></i> Browse
                </Link>
              </li>
              <li
                className={cuurentPath === "/favorite" ? "active" : ""}
                onClick={e => {
                  this.handleActive(e);
                }}
              >
                <Link to="/favorite">
                  <i className="far fa-heart"></i> Favorite
                </Link>
              </li>

              <h2>Dicover</h2>
              <li
                className={cuurentPath === "/newreleases" ? "active" : ""}
                onClick={e => {
                  this.handleActive(e);
                }}
              >
                <Link to="/newreleases">
                  <i className="fas fa-music"></i> New Releases
                </Link>
              </li>
              <li
                className={cuurentPath === "/topchart" ? "active" : ""}
                onClick={e => {
                  this.handleActive(e);
                }}
              >
                <Link to="/topchart">
                  <i className="far fa-star"></i> Top Chart
                </Link>
              </li>
            </ul>
          </nav>

          <div className="musiclist">
            <Route
              exact
              path="/"
              render={routeProps => (
                <HomePage {...routeProps} handleDetail={this.handleDetail} />
              )}
            />
            <Route
              exact
              path="/browse"
              render={routeProps => (
                <SearchPage {...routeProps} handleDetail={this.handleDetail} />
              )}
            />
            <Route
              exact
              path="/favorite"
              render={routeProps => (
                <FavoritePage
                  {...routeProps}
                  handleDetail={this.handleDetail}
                />
              )}
            />
            <Route
              exact
              path="/newreleases"
              render={routeProps => (
                <NewReleasesPage
                  {...routeProps}
                  handleDetail={this.handleDetail}
                />
              )}
            />
            <Route
              exact
              path="/topchart"
              render={routeProps => (
                <TopChartPage
                  {...routeProps}
                  handleDetail={this.handleDetail}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
