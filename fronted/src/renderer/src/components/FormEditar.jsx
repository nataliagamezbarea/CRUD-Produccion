import Button from './Button'
import Input from './Input'
import { useState, useEffect } from 'react'
function FormEditar({ usuarioSeleccionado }) {
    const [usuario, setUsuario] = useState(usuarioSeleccionado);
  
    useEffect(() => {
      setUsuario(usuarioSeleccionado);
    }, [usuarioSeleccionado]);
  
    const handleNombreChange = (event) => {
      setUsuario({ ...usuario, name: event.target.value });
    };
  
    const handleApellidoChange = (event) => {
      setUsuario({ ...usuario, surname: event.target.value });
    };
  
    const handleEmailChange = (event) => {
      setUsuario({ ...usuario, email: event.target.value });
    };
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/usuarios/${usuarioSeleccionado.id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: usuarioSeleccionado.id,
        nombre: usuario.name,
        apellido: usuario.apellido,
        email: usuario.email
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar usuario con ID ${usuarioSeleccionado.id}`)
        }
        return response.text()
      })
      .then((message) => {
        console.log(message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
          Modificar usuario
        </h1>

        <form onSubmit={handleSubmit}>
          <Input type="text" value={usuario.name} onChange={handleNombreChange} />
          <Input type="text" value={usuario.surname} onChange={handleApellidoChange} />
          <Input type="text" value={usuario.email} onChange={handleEmailChange} />
          <Button type="submit">Guardar cambios</Button>{' '}
        </form>
      </div>
    </div>
  )
}

export default FormEditar