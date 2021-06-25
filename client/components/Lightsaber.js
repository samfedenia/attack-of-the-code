import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const blade = useRef(null);
  const [roundOver, setRoundOver] = useState(false)

  const setLoader = () => {
    const loader = setInterval(() => {
      const computedStyle = getComputedStyle(blade.current);
      const width =
        parseFloat(computedStyle.getPropertyValue("--width")) || 100;

      //console.log(width)

      if (width <= 0) {
        clearInterval(loader);
        setRoundOver(true)
        blade.current.classList.add("fade-out");
        setInterval(() => {
          blade.current.style.visibility = "hidden";
        }, 900);
      }

      blade.current.style.setProperty("--width", width - 0.83);
      console.log('width', width)
    }, 500);

    return loader;
  };



  useEffect(() => {
    setLoader();
  }, []);


  return (
    <div className="App">
    {
        roundOver ? <h1>Round Over</h1> : null 
    }
      <div className="lightsaber">
        <div className="hilt">
          <div className="button"></div>
        </div>
        <div
          className="blade"
          ref={blade}
          data-label="Loading..."
          style={{ "--width": "20" }}
        ></div>
      </div>
    </div>
  );
}
