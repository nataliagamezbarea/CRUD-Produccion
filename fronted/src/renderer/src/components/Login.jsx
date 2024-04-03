import Button from './Button'
import Input from './Input'
import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError(true)
      return
    }
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      onLogin()
    } else {
      {setError(true)}
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
          Login
        </h1>
        <form className="space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="habitissimo@mail.com"
            error={error}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            type="password"
            placeholder="Introduce tu contraseña"
            error={error}
          />
          {error && <p className="text-red-500 text-sm">Email y/o contraseña incorrectos</p>}

          <Button onClick={handleSubmit}>Iniciar sesión</Button>
        </form>
      </div>
    </div>
  )
}
