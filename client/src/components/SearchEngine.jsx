import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlogTravel.css";

function SearchEngine() {
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState([]);
  const [showDetail, setShowDetail] = useState([]);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      console.log(response.data.data);
      setTrips(response.data.data);
    };
    fetchData();
  }, [search]);

  const toggleDetail = (index) => {
    setShowDetail((showDetail) => {
      const newShowDetail = [...showDetail];
      newShowDetail[index] = !newShowDetail[index];
      return newShowDetail;
    });
  };

  const openImagePopup = (imageSrc) => {
    window.open(imageSrc, "_blank", "width=800,height=600");
  };

  const handleTagClick = (tag) => {
    setSearch(tag);
  };

  return (
    <div className="container">
      <div className="head-title">เที่ยวไหนดี</div>
      <div className="title-detail"> ค้นหาที่เที่ยว</div>
      <div className="input">
        <label htmlFor="search"></label>
        <input
          id="search-input"
          type="text"
          name="searchText"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={search}
          onChange={handleSearchInput}
          required
        />
      </div>

      <div>
        <section className="blog-list">
          {trips.map((trip, index) => (
            <div key={trip.eid} className="content">
              <div className="picture">
                <img
                  src={trip.photos[0]}
                  onClick={() => openImagePopup(trip.photos[0])}
                ></img>
              </div>
              <div className="info">
                <div className="title">
                  <h1>
                    <a href={trip.url} target="blank">
                      {trip.title}
                    </a>
                  </h1>
                </div>
                <div className="detail">
                  {trip.description.length > 50 ? (
                    <>
                      {showDetail[index] ? (
                        <>{trip.description}</>
                      ) : (
                        <>{trip.description.slice(0, 100)}...</>
                      )}
                      <div onClick={() => toggleDetail(index)}>
                        <span className="toggle-details">
                          {showDetail[index] ? "ย่อ" : "อ่านต่อ"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>{trip.description}</>
                  )}
                </div>

                <div className="category">
                  หมวด
                  <span className="d-category">
                    {trip.tags.slice(0, -1).map((tag, index) => (
                      <span key={index} onClick={() => handleTagClick(tag)}>
                        {" "}
                        <span className="tag">{tag}</span>
                      </span>
                    ))}{" "}
                    และ{" "}
                    <span
                      onClick={() => handleTagClick(trip.tags.slice(-1))}
                      className="tag"
                    >
                      {trip.tags.slice(-1)}
                    </span>
                  </span>
                </div>
                <div className="detail-img">
                  <img
                    src={trip.photos[1]}
                    onClick={() => openImagePopup(trip.photos[1])}
                  ></img>
                  <img
                    src={trip.photos[2]}
                    onClick={() => openImagePopup(trip.photos[2])}
                  ></img>
                  <img
                    src={trip.photos[3]}
                    onClick={() => openImagePopup(trip.photos[3])}
                  ></img>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default SearchEngine;
