import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FormEditar from './FormEditar'

function Datos({ modalOpen }) {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [filtroId, setFiltroId] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroApellido, setFiltroApellido] = useState('')
  const [filtroError, setFiltroError] = useState('')
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
    setRegistroModalIsOpen(false);
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

  const handleFiltrarUsuarios = () => {
    axios
      .get(
        `http://localhost:3000/usuarios?id=${filtroId}&nombre=${filtroNombre}&apellido=${filtroApellido}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setFiltroError('No se encontraron resultados.')
          setUsuarios([])
        } else {
          setUsuarios(response.data)
          setFiltroError('')
        }
      })
      .catch((error) => {
        console.error('Error al filtrar usuarios:', error)
        setFiltroError('No se pudo conectar con el servidor.')
      })
  }

  const handleQuitarFiltro = () => {
    setFiltroId('')
    setFiltroNombre('')
    setFiltroApellido('')
    setFiltroError('')
    // Recargar la lista completa de usuarios
    axios
      .get('http://localhost:3000/usuarios')
      .then((response) => {
        setUsuarios(response.data.sort((a, b) => a.name.localeCompare(b.name)))
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error)
      })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'nombre') {
      setNombre(value)
    } else if (name === 'apellido') {
      setApellido(value)
    } else if (name === 'filtroId') {
      setFiltroId(value)
    } else if (name === 'filtroNombre') {
      setFiltroNombre(value)
    } else if (name === 'filtroApellido') {
      setFiltroApellido(value)
    }
  }

  const handleModificarClick = (usuario) => {
    setUsuarioSeleccionado(usuario)
    console.log(usuario)
  }

  return (
    <div className="container mt-5">
      <div className="flex space-x-4">
        <input
          className='class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
          type="text"
          placeholder="Buscar por ID"
          name="filtroId"
          value={filtroId}
          onChange={handleInputChange}
        />
        <input
          className='class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
          type="text"
          placeholder="Buscar por nombre"
          name="filtroNombre"
          value={filtroNombre}
          onChange={handleInputChange}
        />
        <input
          className='class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
          type="text"
          placeholder="Buscar por apellido"
          name="filtroApellido"
          value={filtroApellido}
          onChange={handleInputChange}
        />
        <button onClick={handleFiltrarUsuarios}>
          <svg
            className="h-8 w-8 text-cyan-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <circle cx="11" cy="11" r="8" /> <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <button onClick={handleQuitarFiltro}>
          <svg
            className="h-8 w-8 text-cyan-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="6" x2="11" y2="6" />{' '}
            <line x1="4" y1="12" x2="11" y2="12" /> <line x1="4" y1="18" x2="13" y2="18" />{' '}
            <polyline points="15 9 18 6 21 9" /> <line x1="18" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <button
        onClick={modalOpen}
        className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 "
      >
        Registrar Usuarios
      </button>

      <br />
      <br />
      <h3>Lista de Usuarios</h3>
      <br />
      {filtroError && <p>{filtroError}</p>}
      {usuarios.length > 0 && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {' '}
                  ID{' '}
                </th>
                <th scope="col" className="px-6 py-3">
                  {' '}
                  Nombre{' '}
                </th>
                <th scope="col" className="px-6 py-3">
                  {' '}
                  Apellido{' '}
                </th>
                <th scope="col" className="px-6 py-3">
                  {' '}
                  Email{' '}
                </th>
                <th scope="col" className="px-6 py-3">
                  {' '}
                  Acciones{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={usuario.id}
                >
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
                      onClick={() => {
                        handleBorrarUsuario(usuario.id)
                      }}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {usuarioSeleccionado && <FormEditar usuarioSeleccionado={usuarioSeleccionado} />}
    </div>
  )
}

export default Datos
