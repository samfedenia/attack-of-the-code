import React, { useState, useEffect, useContext } from "react";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import { BackgroundContext } from './context/background';

const CodePenClone = ({ value, onChange }) => {
    const { backgroundsState, backgroundsDispatch} = useContext(BackgroundContext);
    const [theme, setTheme] = useState('material');

    const handleChange = (editor, data, value) => {
        //console.log(value)
        onChange(value)
    }

    const changeTheme = () => {
        if (theme === 'material') {
          setTheme('default')
          document.body.style.backgroundImage = `url(/jedi-prof.png), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
        } else {
          console.log('backgroundsState', backgroundsState)
          setTheme('material');
          const randomNum = Math.floor(Math.random() * backgroundsState.length);
          document.body.style.backgroundImage = `url(/backgrounds/${backgroundsState[randomNum]}), linear-gradient(rgba(5, 8, 46, 0.712), rgba(53, 0, 0, 0.801))`;
        }
  }


    return (
        <>
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
        <div className="editor-container">
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: 'javascript',
                    theme: theme,
                    lineNumbers: true,
                    autoCloseBrackets: true,
                    matchBrackets: true
                }}
            />
        </div>
        </>
    )
}

export default CodePenClone
