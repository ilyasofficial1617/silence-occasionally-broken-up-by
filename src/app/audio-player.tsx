"use client";

import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export interface IAudio {
  name: string;
  link: string;
}

type MemeAudioPlayerProps = {
  className?: string;
};

const MemeAudioPlayer = ({
  className = "",
}: MemeAudioPlayerProps): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLink, setAudioLink] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("silence");
  const [volumeSlider, setVolumeSlider] = useState("100");
  let loopTimeoutRef: ReturnType<typeof setTimeout>;
  const [minTime, setMinTime] = useState("5");
  const [maxTime, setMaxTime] = useState("30");
  const [playlist, setPlaylist] = useState<IAudio[]>([
    {
      name: "silence",
      link: "silence.mp3",
    },
  ]);

  interface IAudioInfoResponse {
    name: string;
    isFile: boolean;
  }

  useEffect(() => {
    // on mount component

    // update list of sound effect
    fetch(process.env.NEXT_PUBLIC_STORAGE_HOST!)
      .then((res) => res.json())
      .then((data) => {
        let newPlaylist: IAudio[] = [];
        // list, filter it by isFile, map into title and link for playlist
        data.listing
          .filter(({ name, isFile }: IAudioInfoResponse) => {
            return isFile;
          })
          .map(({ name, isFile }: IAudioInfoResponse) => {
            let title = name.split("?")[0];
            let link = process.env.NEXT_PUBLIC_STORAGE_HOST! + name;
            let audioInfo: IAudio = { name: title, link: link };
            newPlaylist.push(audioInfo);
          });
        // set the updated playlist
        setPlaylist(newPlaylist);
      });

    //on dismount component
    return () => {
      // clear any loop/timeout
      clearTimeout(loopTimeoutRef);
    };
  }, []);

  useEffect(() => {
    // when playlist updated from server
    // update the selected default value
    setSelectedAudio(playlist[0].link);
    setAudioLink(playlist[0].link);
  }, [playlist]);

  const playSoundEffect = () => {
    audioRef.current!.currentTime = 0;
    audioRef.current!.play();
  };

  const stopSoundEffect = () => {
    audioRef.current!.currentTime = 0;
    audioRef.current!.pause();
  };

  // input form listener

  const onSelectAudio = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudio(event.target.value);
    setAudioLink(event.target.value);
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolumeSlider(event.target.value);
    audioRef.current!.volume = +event.target.value / 100;
  };

  const onMinTimeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setMinTime(event.target.value);
  };

  const onMaxTimeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxTime(event.target.value);
  };

  // input form listener ends

  // buttons listener

  const onTestPlay = () => {
    playSoundEffect();
  };

  const onPlay = () => {
    // play it once
    playSoundEffect();
    // settimeout play after ..
    const cooldown = Math.floor(
      (Math.random() * (+maxTime - +minTime + 1) + +minTime) * 1000
    );
    // console.log("cooldown " + cooldown + " milliseconds");
    // store it in ref
    loopTimeoutRef = setTimeout(onPlay, cooldown);
  };

  const onStop = () => {
    // stop the sound
    stopSoundEffect();
    // clear the timeout id
    clearTimeout(loopTimeoutRef);
  };

  // buttons listener end

  return (
    <div className={className}>
      <audio ref={audioRef} src={audioLink} />
      <div>
        <select value={selectedAudio} onChange={onSelectAudio}>
          {playlist.map(({ name, link }, index) => {
            return (
              <option key={index} value={link}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        volume{" "}
        <input
          className="slider w-36"
          type="range"
          min="1"
          max="100"
          value={volumeSlider}
          onChange={onVolumeChange}
        />
      </div>
      <div>
        <div className="">play randomly between </div>
        <input
          type="number"
          value={minTime}
          onChange={onMinTimeChanged}
          className="w-12 border-2 border-gray-200"
        />
        <div className="inline"> seconds to </div>
        <input
          type="number"
          value={maxTime}
          onChange={onMaxTimeChanged}
          className="w-12 border-2 border-gray-200"
        />
        <div className="inline"> seconds </div>
      </div>
      <div>
        <button
          className="button bg-gray-200 p-5 hover:bg-gray-100 "
          onClick={onTestPlay}
        >
          test
        </button>
        <button
          className="button bg-gray-200 p-5 hover:bg-gray-100 "
          onClick={onPlay}
        >
          play
        </button>
        <button
          className="button bg-gray-200 p-5 hover:bg-gray-100 "
          onClick={onStop}
        >
          stop
        </button>
      </div>
    </div>
  );
};

export default MemeAudioPlayer;
