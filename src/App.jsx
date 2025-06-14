import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcompage from "./assets/components/welcompage";
import LoginPage from "./assets/components/LoginPage";
import Home from "./assets/pages/Home";
import RegisterPage from "./assets/components/RegisterPage";

import AdminPage from "./assets/pages/AdminPage";
import UsersPage from "./assets/pages/UsersPage";
import DashboardPage from "./assets/pages/DashboardPage";
// import Userform from "./assets/components/Userform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcompage />} />
        <Route path="/" element={<Home />} />
        <Route path="/formuse" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UsersPage />} />
        <Route path="/dash" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './assets/context/AuthContext';

// import Header from './assets/components/Header';
// import AudioPlayer from './assets/components/AudioPlayer';

// // Pages
// import Home from './assets/pages/Home';
// import Login from './assets/pages/Login';
// import Upload from './assets/pages/Upload';
// import SongDetailPage from './assets/pages/SongDetailPage';

// function App() {
//   const [currentSong, setCurrentSong] = useState(null);
//   return (
//     <AuthProvider>
//       <Router>
//         <Header />
//         <main className="p-4">
//           <AuthProvider>
//             <PlayerProvider>

//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/" element={<Home onPlay={setCurrentSong} />} /> {/* ✔️ */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/upload" element={<Upload />} />
//             <Route path="/songs/:id" element={<SongDetailPage />} />
//           </Routes>
//             </PlayerProvider>
//           </AuthProvider>
//         </main>
//         <AudioPlayer /> {/* ← Visible partout */}
//         <AudioPlayer song={currentSong} />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
