import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação
    if (!email.match(/^[\w.-]+@(gmail\.com|outlook\.com)$/)) {
      alert('Por favor, insira um email válido do Gmail ou Outlook.')
      return
    }

    if (password.length < 5) {
      alert('A senha deve ter pelo menos 5 caracteres.')
      return
    }

    alert('Login com sucesso!')

    // Redireciona para página do Pomodoro com o email
    navigate('/pomodoro', { state: { email } })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      />
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Login
      </button>
    </form>
  )
}
