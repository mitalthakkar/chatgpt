import React, { Component } from "react";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid main p-0 page-not-found">
        <div>
          <div className="container-fluid main p-0 page-not-found">
            <div className="d-flex">
              <div
                id="div-page-not-found"
                className="rbar flex-1 align-items-center d-flex justify-content-center text-center"
              >
                <div
                  className="mainDiv text-left"
                  style={{ maxWidth: "490px" }}
                >
                  <h1>Page Not Found</h1>
                  <p>
                    The page you were looking for could not be found. It might
                    have been removed, renamed, or did not exist in the first
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
