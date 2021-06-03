// import React from 'react';
// import { UserContext } from './user';
// import { ViewContext } from './view';
// import { BackgroundContext } from './background';
// import { GameContext } from './game';

// export const CombinedContextProvider = ({ children }) => {
//   const [userState, setUserState] = useState({
//     avatar: '',
//     playerName: '',
//     roomCode: '',
//     socket: '',
//     score: 0,
//     submitted: false,
//   });

//   const [gameState, setGameState] = useState({
//     timeLimit: 90,
//     gameStatus: 'setup', //playing, between, gameover
//     level: 'demo',
//     round: 1,
//   });

//   const [view, setView] = useState({
//     loading: true,
//     background: '',
//     font: '',
//   });

//   const [backgrounds, setBackgrounds] = useState([]);
//   return (
//     <UserContext.Provider value={[userState, setUserState]}>
//       <ViewContext.Provider value={[view, setView]}>
//         <BackgroundContext.Provider value={[backgrounds, setBackgrounds]}>
//           <GameContext.Provider value={[gameState, setGameState]}>
//             {children}
//           </GameContext.Provider>
//         </BackgroundContext.Provider>
//       </ViewContext.Provider>
//     </UserContext.Provider>
//   );
// };
