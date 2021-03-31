import React from "react";

function LinkCard({ link }) {
  return (
    <div className="">
      <div class="team inner-team color-bg">
        <div class="container">
          <div class="section-heading middle-heading">
            <h1>Link Details</h1>
          </div>
          <div class="team-content">
            <div class="row justify-content-center">
              <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="team-card">
                  <div class="team-card-inner">
                    <div class="team-text">
                      <h4
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        Your short link:
                        <a
                          style={{ paddingLeft: "10px", color: "#ccc000" }}
                          href={link.to}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.to}
                        </a>
                      </h4>
                      <h4>
                        Initial Link:
                        <a
                          href={link.from}
                          style={{ paddingLeft: "10px", color: "#cdc000" }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.from}
                        </a>
                      </h4>
                      <h4>
                        Clicks:
                        <strong style={{ paddingLeft: "10px", color: "#000" }}>
                          {link.clicks}
                        </strong>
                      </h4>
                      <p>
                        Date link:
                        <strong style={{ paddingLeft: "10px", color: "#000" }}>
                          {new Date(link.date).toLocaleDateString()}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
