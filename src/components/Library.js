import React from "react";
import LibrarySong from "./LibrarySong";

function Library({ songs, setCurrentSong, audioRef, isPlay, setSong }) {
  return (
    <div className="library-container">
      <h1>Library</h1>
      <div className="library-list">
        <div>
          {songs.map((song) => (
            <LibrarySong
              song={song}
              songs={songs}
              setSong={setSong}
              setCurrentSong={setCurrentSong}
              key={song.id}
              audioRef={audioRef}
              isPlay={isPlay}
              id={song.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;
