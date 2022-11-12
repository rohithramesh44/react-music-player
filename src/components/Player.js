import React, { useEffect } from "react";
// import { playAudio } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setSongInfo,
  songInfo,
  audioRef,
  currentSong,
  isPlay,
  setIsPlay,
  songs,
  setCurrentSong,
  setSong,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    setSong(newSongs);
  };
  const playSongHandler = () => {
    if (isPlay) {
      audioRef.current.pause();
      setIsPlay(!isPlay);
    } else {
      audioRef.current.play();
      setIsPlay(!isPlay);
    }
  };
  const dragSlidHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const filterTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const nextPrevHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      // console.log((currentIndex + 1) % songs.length);
    } else if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlay) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      console.log((currentIndex - 1) % songs.length);
    }
    if (isPlay) audioRef.current.play();
  };
  const trackAnimi = {
    transform: `translateX(${songInfo.animationPersontage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{filterTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragSlidHandler}
          />
          <div style={trackAnimi} className="track-animation">
            &nbsp;
          </div>
        </div>
        <p>{songInfo.duration ? filterTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => {
            nextPrevHandler("skip-back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlay ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => {
            nextPrevHandler("skip-forward");
          }}
        />
      </div>
    </div>
  );
};

export default Player;
