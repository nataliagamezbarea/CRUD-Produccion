import React from 'react'
import './Registro.css'
import Input from '../Input'
import Button from '../Button'
import { useState } from 'react'

function Registro() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password || !nombre || !apellido) {
      setError(true)
      return
    }
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, email, password })
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      console.error('Error:', response.status, response.statusText)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
          Registra un nuevo usuario
        </h1>
        <form className="space-y-6" action="http://localhost:3000" method="POST">
          <div className="form-group">
            <Input
              type="text"
              label="Nombre"
              id="nombre"
              error={error}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              label="Apellidos"
              id="apellido"
              error={error}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              type="email"
              label="Email"
              id="email"
              error={error}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              label="Contraseña"
              id="password"
              error={error}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit}>Registrar</Button>
        </form>
      </div>
    </div>
  )
}

export default Registro
