import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Input from './Input'
import Button from './Button'

function Datos({ modalOpen }) {
  const [usuarios, setUsuarios] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [userEdited, setUserEdited] = useState()
  const [filtroNombre, setFiltroNombre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usuariosPorPagina] = useState(7)
  const [orderByAlphabet, setOrderByAlphabet] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

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

  const handleBorrarUsuario = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        console.log('Usuario borrado con éxito')
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
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
    setUserEdited({ ...userEdited, name: event.target.value })
  }

  const handleInputChangeSurname = (event) => {
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
    setFiltroNombre(event.target.value)
    setCurrentPage(1)
    setSelectedRows([])
  }

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(filtroNombre.toLowerCase())
  )

  const usuariosOrdenados = orderByAlphabet
    ? [...usuariosFiltrados].sort((a, b) => a.name.localeCompare(b.name))
    : usuariosFiltrados

  const indexOfLastUsuario = currentPage * usuariosPorPagina
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina
  const usuariosPaginados = usuariosOrdenados.slice(indexOfFirstUsuario, indexOfLastUsuario)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleDeleteSelected = () => {
    selectedRows.forEach((id) => handleBorrarUsuario(id))
    setSelectedRows([])
  }

  const handleCheckboxChange = (event) => {
    const { checked } = event.target
    if (checked) {
      const filteredIds = usuariosPaginados.map((usuario) => usuario.id)
      setSelectedRows(filteredIds)
    } else {
      setSelectedRows([])
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mt-5">
        <div className="flex flex-col items-stretch justify-between">
          <Input
            type="text"
            value={filtroNombre}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre"
            name="filtroNombre"
          />
          <div className="flex justify-between mt-2">
            <Button onClick={() => setOrderByAlphabet(!orderByAlphabet)} color="yellow">
              Filtrar por orden alfabética {orderByAlphabet ? '(DESC)' : '(ASC)'}
            </Button>
            <Button onClick={modalOpen} color="green">
              Registra un nuevo usuario
            </Button>
            {selectedRows.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
              >
                Eliminar seleccionados
              </button>
            )}
          </div>
        </div>
        <p>Total usuarios: {usuarios.length}</p>
        {usuarios.length > 0 && (
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded">
              <thead className="text-xs text-gray-900 uppercase bg-green-300 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      checked={
                        selectedRows.length === usuariosPaginados.length &&
                        usuariosPaginados.length !== 0
                      }
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 border-green-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuariosPaginados.map((usuario) => (
                  <tr
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-900`}
                    key={usuario.id}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(usuario.id)}
                        onChange={() => handleRowSelect(usuario.id)}
                      />
                    </td>
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
                          <Input
                            type="text"
                            onChange={handleInputChangeEmail}
                            defaultValue={usuario.email}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleSubmit(usuario, userEdited)}
                            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4"
                          >
                            Guardar cambios
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{usuario.id}</td>
                        <td className="px-6 py-4">{usuario.name}</td>
                        <td className="px-6 py-4">{usuario.surname}</td>
                        <td className="px-6 py-4">{usuario.email}</td>
                        <td>
                          <button
                            onClick={() => handleModificarClick(usuario)}
                            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4"
                          >
                            Modificar
                          </button>
                          <button
                            onClick={() => handleBorrarUsuario(usuario.id)}
                            className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4"
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
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(usuariosFiltrados.length / usuariosPorPagina)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className="mx-1 px-3 py-1 border rounded hover:bg-gray-200"
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Datos
