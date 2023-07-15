type AudioPlayerProps = {
  className?: string;
};

function AudioPlayer({ className }: AudioPlayerProps): JSX.Element {
  return <div className={className}>hi!</div>;
}

export default AudioPlayer;
