import React, { useState, useEffect } from "react";
import User from "./Bookmark";
import "./styles.css";

export default function App() {
  const [bookMarks, setBookMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState("");
  const [bookmarkLink, setBookmarkLink] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/readAll.php");
      const result = await response.json();
      if (Array.isArray(result)) {
        setBookMarks(result);
      } else {
        setBookMarks([]);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("error", error);
      setIsLoaded(true);
    }
  }

  async function addBookMark() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: bookmarkTitle,
        link: bookmarkLink,
      }),
    };

    try {
      await fetch("http://localhost:3000/api/create.php", requestOptions);
      setBookmarkTitle("");
      setBookmarkLink("");
      fetchUsers();
    } catch (error) {
      console.error("error", error);
    }

    alert("New BookMark is Added !");
  }

  return (
    <div className="App">
      <div className="input-container">
        <label id="bookmark-title" htmlFor="bookmark-title">
          Enter a bookmark title:
        </label>
        <input
          type="text"
          id="bookmark-title-input"
          value={bookmarkTitle}
          onChange={(e) => setBookmarkTitle(e.target.value)}
        />
        <br />

        <label id="bookmark-link" htmlFor="bookmark-link">
          Enter the bookmark link:
        </label>
        <input
          type="text"
          id="bookmark-link-input"
          value={bookmarkLink}
          onChange={(e) => setBookmarkLink(e.target.value)}
        />
        <br />
        <button id="bookmark-add-button" onClick={addBookMark}>
          Add
        </button>
      </div>

      {isLoaded ? (
        bookMarks.length > 0 ? (
          bookMarks.map((bookmark, index) => (
            <User key={index} bookmark={bookmark} />
          ))
        ) : (
          <h1>No bookmarks available</h1>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
