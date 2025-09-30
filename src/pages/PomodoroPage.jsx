import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PomodoroPage() {
  const location = useLocation();
  const email = location.state?.email || "usuário@nexus.com";

  const [task, setTask] = useState("");
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl window-shadow border border-white/20 w-[900px] h-[600px] overflow-hidden text-white flex flex-col">
      {/* Efeito do mouse */}
      <div className="pointer-events-none fixed w-40 h-40 rounded-full bg-teal-400 opacity-30 blur-3xl transition-transform animate-pulse" style={{
        transform: `translate(50px, 50px)`
      }}></div>

      {/* Header com título, avatar e ranking */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/20 bg-gradient-to-r from-[#0b2540] to-[#0f3f3a]">
        <div className="flex items-center gap-2">
          <div className="dot bg-red-500"></div>
          <div className="dot bg-yellow-400"></div>
          <div className="dot bg-green-500"></div>
          <span className="ml-4 font-semibold">Nexus Study</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">Olá, <span className="font-semibold">{email}</span></div>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${email}`}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-white/20"
          />
        </div>
      </div>

      {/* Ranking */}
      <div className="flex items-center justify-around border-b border-white/10 py-3 text-sm bg-white/5">
        <div className="flex flex-col items-center">
          🥇 <span className="font-bold">Lucas</span> <span>45 pts</span>
        </div>
        <div className="flex flex-col items-center">
          🥈 <span className="font-bold">Julia</span> <span>38 pts</span>
        </div>
        <div className="flex flex-col items-center">
          🥉 <span className="font-bold">Daniel</span> <span>0 pts</span>
        </div>
      </div>

      {/* Corpo principal */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        {/* Tarefa */}
        <input
          type="text"
          placeholder="Digite sua tarefa atual..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
        />

        {/* Temporizador */}
        <div className="text-6xl font-bold font-mono">{formatTime(seconds)}</div>

        {/* Botões */}
        <div className="flex gap-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-md font-semibold transition-colors"
            >
              Iniciar
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold transition-colors"
            >
              Pausar
            </button>
          )}
          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(25 * 60);
            }}
            className="bg-white/10 border border-white/20 px-6 py-2 rounded-md font-semibold hover:bg-white/20 transition-colors"
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}
