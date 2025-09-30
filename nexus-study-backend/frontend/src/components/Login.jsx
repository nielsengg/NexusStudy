import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null) // Estado para exibir mensagens de erro
  const [loading, setLoading] = useState(false) // Estado para indicar carregamento

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Limpa erros anteriores
    setLoading(true) // Inicia o estado de carregamento

    const API_URL = 'http://localhost:3000/auth/login';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'usuario@email.com', 
          password: 'senha123' 
        }),
      });
      const data = await response.json()
      
      if (response.ok) {
        // Sucesso no Login
        console.log('Login bem-sucedido!', data)
        // Aqui você deve armazenar o token (ex: no Local Storage) e redirecionar o usuário
        localStorage.setItem('authToken', data.token)
        alert('Login bem-sucedido! Token: ' + data.token) 
        // Exemplo: window.location.href = '/dashboard'
      } else {
        // Erro no Login
        console.error('Erro no Login:', data.error)
        // Exibe uma mensagem de erro específica baseada na resposta do backend
        if (data.error === 'invalid_credentials') {
            setError('Credenciais inválidas. Verifique seu email e senha.')
        } else {
            setError('Ocorreu um erro desconhecido durante o login.')
        }
      }
    } catch (err) {
      console.error('Erro de rede ou servidor:', err)
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.')
    } finally {
      setLoading(false) // Finaliza o estado de carregamento
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
      
      {/* Exibição da Mensagem de Erro */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
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
        className={`font-semibold py-2 rounded-lg transition-colors ${
            loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-teal-600 hover:bg-teal-700 text-white'
        }`}
        disabled={loading} // Desabilita o botão enquanto carrega
      >
        {loading ? 'Entrando...' : 'Login'}
      </button>
    </form>
  )
}
