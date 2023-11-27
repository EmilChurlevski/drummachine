import React, { useState, useEffect, useRef } from "react";
import './App.scss';


const updatedKeys = {
  'Q': 'Heater-1',
  'W': 'Heater-2',
  'E': 'Heater-3',
  'A': 'Heater-4_1',
  'S': 'Heater-6',
  'D': 'Dsc_Oh',
  'Z': 'Kick_n_Hat',
  'X': 'RP4_KICK_1',
  'C': 'Cev_H2'
}

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const audioRefs = useRef({});

  const playAudio = (audioId) => {
    const audioElement = audioRefs.current[audioId];

    if (audioElement && audioElement.play instanceof Function) {
      if (audioElement.paused) {
        audioElement.currentTime = 0;
        audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        setDisplay(audioElement.dataset.drumPadId);
      } else {
        audioElement.currentTime = 0;
      }
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = document.getElementById(key);
    if (drumPad) {
      playAudio(key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const audioElements = document.querySelectorAll('.clip');

    audioElements.forEach((audio) => {
      const key = audio.id;
      audioRefs.current[key] = audio;
    });
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pads">
        {['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map((key) => (
          <div
            className="drum-pad"
            id={key}
            key={key}
            onClick={() => playAudio(key)}
          >
            {key}
            <audio
              className="clip"
              id={key}
              data-drum-pad-id={key}
              src={`https://s3.amazonaws.com/freecodecamp/drums/${updatedKeys[key]}.mp3`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
