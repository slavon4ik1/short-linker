import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../../components/LinkCard";
import Loader from "../../components/Loader";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
function DetailPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="uni-banner color-bg">
        <div className="uni-banner-overlay">
          <div className="container">
            <div className="banner-text">
              <h1>Detail Page</h1>
            </div>
          </div>
        </div>
      </div>

      <>{!loading && link && <LinkCard link={link} />}</>
    </div>
  );
}

export default DetailPage;
