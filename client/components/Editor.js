import React, { useState, useEffect, useContext } from "react";
import Sval from 'sval';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import { BackgroundContext } from './context/background';

const Editor = () => {
    const [backgrounds, setBackgrounds] = useContext(BackgroundContext);
    const [theme, setTheme] = useState('monokai');
    const [userCode, setUserCode] = useState(`function() {
    return 2
  }()`);
  // Sval options
  const options = {
    // ECMA Version of the code (5 | 6 | 7 | 8 | 9 | 10 | 2015 | 2016 | 2017 | 2018 | 2019)
    ecmaVer: 2015,
    // Whether the code runs in a sandbox
    sandBox: true,
  };

  function onChange(newValue) {
    setUserCode(newValue);
  }

  function onClickTest() {
    const interpreter = new Sval(options);
    console.log('interpreter', interpreter)
    interpreter.import('window.console');
    interpreter.run(`
      const result = ${userCode}
      exports.result = result;
    `);
    const outputDiv = document.querySelector('#result');
    console.log('interpreter.exports.result', interpreter.exports.result);
    outputDiv.innerText = interpreter.exports.result;
  }

  const resetCode = () => {
      document.getElementById('result').innerText = ''
  }

    function checkSubmission() {
        const interpreter = new Sval(options);
        interpreter.import('window.console');
        interpreter.run(`
        const result = ${userCode}
        exports.result = result;
        `);
        const outputDiv = document.querySelector('#result');
        console.log(interpreter.exports.result);
        outputDiv.innerText = interpreter.exports.result;
        if (Number(interpreter.exports.result) === 2) {
            alert('correct')
        }
  }

   const changeTheme = () => {
        if (theme === 'monokai') {
        setTheme('github')
        document.body.style.backgroundImage = `url(/jedi-prof.png), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
        } else {
        setTheme('monokai');
        const randomNum = Math.floor(Math.random() * backgrounds.length);
        document.body.style.backgroundImage = `url(/backgrounds/${backgrounds[randomNum]}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
        }
  }

    return (
        <div className='wrapper'>
        <div className='switch'>
          <label
            style={{
              fontFamily: 'StarJedi',
              textShadow: 'black 0px 0px 2px',
              color: 'white',
              letterSpacing: '.1em',
            }}
          >
            Dark Side
            <input onClick={changeTheme} type='checkbox' />
            <span className='lever'></span>
            Prof Side
          </label>
        </div>
        <AceEditor
            height='30rem'
            width='50%'
            placeholder=""
            mode="javascript"
            theme={theme}
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={userCode}
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false
            }}
        />
        <div className="editor__footer">
                <div className="editor__footer--left">
                    <button onClick={onClickTest} className="editor__btn editor__run">{`Run >`}</button>
                    <button onClick={resetCode} className="editor__btn editor__reset">{`Reset >`}</button>
                    <button onClick={checkSubmission} className="editor__btn editor__submit">{`Submit >`}</button>
                </div>
                <div className="editor__footer--right">
                    <div id='result' className="editor__console">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor
