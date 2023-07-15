import Image from 'next/image'
import AudioPlayer, { IAudio } from "./audio-player";

export default function Home() {
  const generatePlaylist = () => {
    let playlist: IAudio[] = [
      {
        name: "metal pipe",
        link: "metal_pipe.mp3",
      },
    ];
    return playlist;
  };

  return (
    <main className="min-h-screen p-24 container">
      <p className="text-9xl font-bold">Silence</p>
      <div>
        <div className="text-xl ml-2">Occasionally broken up by ..</div>
        <AudioPlayer
          className="ml-2"
          playlist={generatePlaylist()}
        ></AudioPlayer>
      </div>
    </main>
  );
}
