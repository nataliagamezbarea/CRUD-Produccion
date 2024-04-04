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
<<<<<<< HEAD
=======

>>>>>>> dbf7e0b660deeb2192e1984c369abe3c5b9e197a
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xl sm:mx-auto">
<div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 to blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
<div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
<div className='max-w-md mx-auto'>
<div>
<<<<<<< HEAD
=======
          </div>
>>>>>>> dbf7e0b660deeb2192e1984c369abe3c5b9e197a
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
          Login
        </h1>
        </div>

        <form className="space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="habitissimo@mail.com"
            error={error} className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            type="password"
            placeholder="Introduce tu contraseña"
            error={error} className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          />
          {error && <p className="text-red-500 text-sm">Email y/o contraseña incorrectos</p>}

          <Button onClick={handleSubmit}>Iniciar sesión</Button>
        </form>
      </div>
    </div>
    </div>
<<<<<<< HEAD
    </div>
=======
>>>>>>> dbf7e0b660deeb2192e1984c369abe3c5b9e197a

  )
}
