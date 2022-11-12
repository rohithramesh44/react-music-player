import React, { useState, useRef } from "react";
//adding components
import "./style/app.scss";
import data from "./data.js";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //state
  const audioRef = useRef(null);
  // const animiBarRef = useRef(null); this my mistake
  const [songs, setSong] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlay, setIsPlay] = useState(currentSong.active);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPersontage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //rounding all values
    const animationPersontage = Math.round((current / duration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPersontage,
    }); // duration key name also duration so
  };
  const onPlayEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlay) audioRef.current.play();
    return;
  };

  return (
    <div className="App app">
      <div className="music-player">
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          // animiBarRef={animiBarRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentSong={currentSong}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSong={setSong}
        />
      </div>
      <div className={`library ${libraryStatus ? "active" : ""}`}>
        <Library
          songs={songs}
          setSong={setSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlay={isPlay}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={onPlayEndHandler}
      ></audio>
    </div>
  );
}

export default App;
