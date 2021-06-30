import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import styles from './css/Editor.module.css';

const MiniGame = () => {
  const [count, setCount] = useState(0);
  const [gameOn, setGameOn] = useState(false);

  const character = useRef();
  const block = useRef();

  const jump = async () => {
    console.log(character.current);
    if (character.classList !== 'animate') {
      const jump = await character.current.classList.add('animate');
      setTimeout(function () {
        character.current.classList.remove('animate');
      }, 450);
      setCount(count + 1);
      if (count >= 5 && count <= 10) {
        block.classList.remove('stormtrooperOne');
        document.getElementById('block').style.width = '45px';
        block.classList.add('stormtrooperTwo');
      }
      if (count > 10) {
        block.classList.remove('stormtrooperTwo');
        document.getElementById('block').style.width = '45px';
        block.classList.add('stormtrooperThree');
      }
      return jump;
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      let characterTop = parseInt(
        window.getComputedStyle(character.current).getPropertyValue('top')
      );
      let blockLeft = parseInt(
        window.getComputedStyle(block.current).getPropertyValue('left')
      );
      console.log('CHARACTER TOP', characterTop);
      console.log('BLOCK LEFT', blockLeft);
      if (blockLeft < 50 && blockLeft > 20 && characterTop >= 150) {
        block.current.style.animation = 'none';
        setGameOn(false);
        return clearInterval(interval);
      }
    });
    if (!gameOn) {
      return clearInterval(interval);
    }
  }, [gameOn]);

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
          <div id="game">
            <Button className={styles.submitBtn} onClick={startMiniGame}>
              Start Mini-Game
            </Button>
            <h2
              style={{
                color: '#fff103',
                font: 'StarJedi',
              }}
            >
              Final Score: {count}
            </h2>
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
          <div ref={character} id="character" className="bb8"></div>
          <div ref={block} id="block" className="stormtrooperOne"></div>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
