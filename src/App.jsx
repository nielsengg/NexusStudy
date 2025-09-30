import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DesktopLogin from "./pages/DesktopLogin";
import PomodoroPage from "./pages/PomodoroPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DesktopLogin />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
      </Routes>
    </Router>
  );
}
