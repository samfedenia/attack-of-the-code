import React, { useState, useEffect } from "react";
import Sval from 'sval';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";

const Editor = () => {
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
    interpreter.import('window.console');
    interpreter.run(`
      const result = ${userCode}
      exports.result = result;
    `);
    const outputDiv = document.querySelector('#result');
    console.log(interpreter.exports.result);
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
        document.body.style.backgroundImage = `url(/public/jedi-prof.png), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
        } else {
        setTheme('monokai');
        document.body.style.backgroundImage = 'none';
        }
  }

    return (
        <div className='wrapper'>
        <button onClick={changeTheme}>Dark Side/Prof Side</button>
         <br />
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
