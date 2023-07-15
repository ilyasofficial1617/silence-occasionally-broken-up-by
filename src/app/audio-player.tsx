"use client";

import { useEffect, useState } from "react";

export interface IAudio {
  name: string;
  link: string;
}

type AudioPlayerProps = {
  className?: string;
  playlist: IAudio[];
};

const AudioPlayer = ({
  className = "",
  playlist,
}: AudioPlayerProps): JSX.Element => {
  const [currentAudio, setCurrentAudio] = useState(playlist[0]);

  return (
    <div className={className}>
      <audio controls>
        <source src={currentAudio.link} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
