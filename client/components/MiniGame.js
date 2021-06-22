import React, { useState } from 'react';
import BB8 from '../../public/minigame_characters/BB8.png';
import trooperOne from '../../public/minigame_characters/8-bit-stormtroopers_0002_Layer-0.png';
import trooperTwo from '../../public/minigame_characters/8-bit-stormtroopers_0001_Layer-1.png';
import trooperThree from '../../public/minigame_characters/8-bit-stormtroopers_0000_Layer-2.png';
import background from '../../public/backgrounds/star-wars-backgrounds-25.jpg';
import styles from './css/MiniGame.module.css';
import { urlToRequest } from 'loader-utils';

const MiniGame = () => {
  const [count, setCount] = useState(0);
  const [gameOn, setGameOn] = useState(false);

  const jump = async () => {
    if (character.classList !== 'animate') {
      const jump = await character.classList.add('animate');
      setTimeout(function () {
        character.classList.remove('animate');
      }, 450);
      setCount(count + 1);
      if (count >= 5 && count <= 10) {
        block.classList.remove('stormtrooperOne');
        document.getElementById('block').style.width = '100px';
        block.classList.add('stormtrooperTwo');
      }
      if (count > 10) {
        block.classList.remove('stormtrooperTwo');
        document.getElementById('block').style.width = '100px';
        block.classList.add('stormtrooperThree');
      }
      console.log(block.classList);
      return jump;
    }
  };

  setInterval(() => {
    let characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue('top')
    );
    let blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue('left')
    );
    if (blockLeft < 60 && blockLeft > 20 && characterTop >= 330) {
      block.style.animation = 'none';
      //block.style.display = 'none';
      setGameOn(false);
    }
    if (blockLeft < 20) {
    }
  });

  const onSpacebar = (e) => {
    if (e.key === ' ') {
      jump();
    }
  };

  const startMiniGame = () => {
    setGameOn(true);
    setCount(0);
  };

  return (
    <div>
      {!gameOn ? (
        <div>
          <div
            id="game"
            style={{
              background: `url(${background})`,
            }}
          >
            <button onClick={startMiniGame}>Start Mini-Game</button>
            <h1>Final Score: {count}</h1>
            <div id="character"></div>
            <div id="block"></div>
          </div>
        </div>
      ) : (
        <div
          id="game"
          onClick={() => jump()}
          onKeyDown={onSpacebar}
          tabIndex="0"
        >
          <h2 id="counter">{count}</h2>
          <div
            id="character"
            className="bb8"
            style={{
              background: `url(${BB8})`,
            }}
          ></div>
          <div
            id="block"
            style={{
              content: `url(${trooperOne})`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
