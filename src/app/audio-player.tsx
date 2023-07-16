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

  const [playlist, setPlaylist] = useState<IAudio[]>([
    {
      name: "silence",
      link: "silence.mp3",
    },
  ]);

  // const getPlaylist = async (): IAudio[] => {
  //   await
  //   process.env.STORAGE_HOST
  // };

  interface IAudioInfoResponse {
    name: string;
    isFile: boolean;
  }

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // when playlist updated from server
    // update the selected default value
    setSelectedAudio(playlist[0].link);
    setAudioLink(playlist[0].link);
  }, [playlist]);

  const onSelectAudio = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudio(event.target.value);
    setAudioLink(event.target.value);
  };

  const onTestPlay = () => {
    audioRef.current!.currentTime = 0;
    audioRef.current!.play();
  };

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
        volume <input type="range" min="1" max="100" className="slider w-36" />
      </div>
      <div>
        <button
          className="button rounded-full bg-gray-200 p-5 hover:bg-gray-100 "
          onClick={onTestPlay}
        >
          test
        </button>
      </div>
    </div>
  );
};

export default MemeAudioPlayer;
