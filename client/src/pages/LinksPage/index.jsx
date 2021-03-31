import React, { useCallback, useContext, useEffect, useState } from "react";
import LinksList from "../../components/LinksList";
import Loader from "../../components/Loader";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function LinksPage() {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="uni-banner color-bg">
        <div className="uni-banner-overlay">
          <div className="container">
            <div className="banner-text">
              <h1>Links List Page</h1>
            </div>
          </div>
        </div>
      </div>

      {!loading && <LinksList links={links} />}
    </div>
  );
}

export default LinksPage;
