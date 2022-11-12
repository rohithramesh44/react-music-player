import React from "react";
// import { playAudio } from "./utils";

function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  isPlay,
  songs,
  setSong,
  id,
}) {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    console.log(songs);
    const newSongs = songs.map((oneSong) => {
      if (oneSong.id === song.id) {
        return { ...oneSong, active: true };
      } else {
        return { ...oneSong, active: false };
      }
    });
    console.log(newSongs);
    setSong(newSongs);
    // cheking song play or not
    if (isPlay) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
