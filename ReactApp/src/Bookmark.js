// User.js
import React, { useState, useEffect } from "react";

const Bookmark = ({ bookmark }) => {
  const [Link, setLink] = useState("");

  async function handelDelete() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: bookmark.id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/delete.php", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  async function handelUpdate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: bookmark.id,
      link: Link,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/update.php", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div
      className="BookMark-container"
      style={{ padding: "10px", border: "1px solid black" }}
    >
      <h1>{bookmark.title}</h1>
      <h3>
        <a href={bookmark.link}>{bookmark.link}</a>
        <br />
        <br />
        <button id="delete-button" onClick={handelDelete}>
          Delete
        </button>

        <br />
        <br />

        <input
          type="text"
          id="Linl-input"
          placeholder="Enter the New Link"
          onChange={(e) => setLink(e.target.value)}
        />

        <button onClick={handelUpdate}>Update Link</button>
      </h3>
    </div>
  );
};

export default Bookmark;
