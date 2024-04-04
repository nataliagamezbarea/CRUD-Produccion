import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Input from './Input'

function Datos({ modalOpen }) {
  const [usuarios, setUsuarios] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [userEdited, setUserEdited] = useState()
  const [filtroNombre, setFiltroNombre] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:3000/usuarios')
      .then((response) => {
        setUsuarios(response.data)
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error)
      })
  }, [])

  const handleCloseRegistroModal = () => {
    setRegistroModalIsOpen(false)
  }

  const handleBorrarUsuario = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        console.log('Usuario borrado con éxito')
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
      })
      .catch((error) => {
        console.error('Error al borrar usuario:', error)
      })
  }

  const handleModificarClick = (usuario) => {
    setEditingId(usuario.id)
    setUserEdited(usuario)
  }

  const handleInputChangeName = (event) => {
    console.log(event.target.value)
    setUserEdited({ ...userEdited, name: event.target.value })
  }

  const handleInputChangeSurname = (event) => {
    console.log(event.target.value)
    setUserEdited({ ...userEdited, surname: event.target.value })
  }

  const handleInputChangeEmail = (event) => {
    setUserEdited({ ...userEdited, email: event.target.value })
  }



  const handleSubmit = (user, userEdited) => {
    setEditingId(null)
    fetch(`http://localhost:3000/usuarios/${user.id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        nombre: userEdited.name,
        apellido: userEdited.surname,
        email: userEdited.email
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar usuario con ID ${user.id}`)
        }
        return response.text()
      })
      .then((message) => {
        console.log(message)
        setUsuarios(usuarios.map((usuario) => (usuario.id === user.id ? userEdited : usuario)))
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const handleSearchChange = (event) => { 
    setFiltroNombre(event.target.value);
  }

  const usuariosFiltrados = usuarios.filter((usuario) => { 
    return usuario.name.toLowerCase().includes(filtroNombre.toLowerCase())
  })

  return (

    <div className='flex justify-center items-center h-screen'>
  
    <div className="container mt-5">
      <div className="flex items-stretch justify-between">
        <button
          onClick={modalOpen}
          className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 "
        >
          Registrar Usuarios
        </button>
        <Input type="text" value={filtroNombre} onChange={handleSearchChange} placeholder="Buscar por nombre" name="filtroNombre" />
      </div>
      {usuarios.length > 0 && (
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={usuario.id}
                >
                  {editingId === usuario.id ? (
                    <>
                      <td className="px-6 py-4">{usuario.id}</td>
                      <td className="px-6 py-4">
                        <Input
                          type="text"
                          onChange={handleInputChangeName}
                          defaultValue={usuario.name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          type="text"
                          onChange={handleInputChangeSurname}
                          defaultValue={usuario.surname}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {' '}
                        <Input
                          type="text"
                          onChange={handleInputChangeEmail}
                          defaultValue={usuario.email}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSubmit(usuario, userEdited)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 "
                        >
                          Guardar cambios
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4"> {usuario.id} </td>
                      <td className="px-6 py-4"> {usuario.name} </td>
                      <td className="px-6 py-4"> {usuario.surname} </td>
                      <td className="px-6 py-4"> {usuario.email} </td>
                      <td>
                        <button
                          onClick={() => handleModificarClick(usuario)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
                        >
                          Modificar
                        </button>
                        <button
                          onClick={() => handleBorrarUsuario(usuario.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  )
}

export default Datos
