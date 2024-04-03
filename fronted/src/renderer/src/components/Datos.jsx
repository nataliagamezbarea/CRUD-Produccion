import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./App.css";
import userImage from './assets/images/user.png';

function Datos() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [filtroId, setFiltroId] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroApellido, setFiltroApellido] = useState('');
  const [filtroError, setFiltroError] = useState('');
  const [serverError, setServerError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        setUsuarios(response.data);
        setServerError('');
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setServerError('No se pudo conectar con el servidor.');
      });
  }, []);

  const handleMostrarRegistro = () => {
    setModalIsOpen(true);
  };

  const handleBorrarUsuario = (id) => {
    axios.delete(`http://localhost:3000/usuarios/${id}`)
      .then(response => {
        console.log('Usuario borrado con éxito');
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      })
      .catch(error => {
        console.error('Error al borrar usuario:', error);
      });
  };

  const handleModificarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNombre(usuario.name);
    setApellido(usuario.surname);
    setModalIsOpen(true); // Abrir la ventana modal al seleccionar un usuario
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') {
      setNombre(value);
    } else if (name === 'apellido') {
      setApellido(value);
    } else if (name === 'filtroId') {
      setFiltroId(value);
    } else if (name === 'filtroNombre') {
      setFiltroNombre(value);
    } else if (name === 'filtroApellido') {
      setFiltroApellido(value);
    }
  };

  const handleFiltrarUsuarios = () => {
    axios.get(`http://localhost:3000/usuarios?id=${filtroId}&nombre=${filtroNombre}&apellido=${filtroApellido}`)
      .then(response => {
        if (response.data.length === 0) {
          setFiltroError('No se encontraron resultados.');
          setUsuarios([]);
        } else {
          setUsuarios(response.data);
          setFiltroError('');
        }
      })
      .catch(error => {
        console.error('Error al filtrar usuarios:', error);
        setFiltroError('No se pudo conectar con el servidor.');
      });
  };

  const handleQuitarFiltro = () => {
    setFiltroId('');
    setFiltroNombre('');
    setFiltroApellido('');
    setFiltroError('');
    // Recargar la lista completa de usuarios
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        setUsuarios(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        setServerError('');
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setServerError('No se pudo conectar con el servidor.');
      });
  };

  const handleGuardarCambios = () => {
    const { id } = usuarioSeleccionado;
    axios.put(`http://localhost:3000/usuarios/${id}/update`, { nombre, apellido })
      .then(response => {
        console.log('Usuario actualizado con éxito');
        const updatedUsuarios = usuarios.map(usuario => {
          if (usuario.id === id) {
            return { ...usuario, name: nombre, surname: apellido };
          }
          return usuario;
        });
        setUsuarios(updatedUsuarios);
        setUsuarioSeleccionado(null);
        setNombre('');
        setApellido('');
        setModalIsOpen(false); // Cerrar la ventana modal después de guardar los cambios
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
      });
  };

  const handleCloseModal = () => {
    setModalIsOpen(false); // Cerrar la ventana modal al hacer clic en el botón de cerrar
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '50%',
      maxHeight: '70%',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  };

  return (
    <div>

<div className="button-container" style={{ textAlign: 'left' }}>
  <button className="btn btn-primary" onClick={handleMostrarRegistro}>Registrar Usuarios</button>
</div>


    <div className="container mt-5">
     <input
        type="text"
        placeholder='Buscar por ID'
        name="filtroId"
        value={filtroId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder='Buscar por nombre'
        name="filtroNombre"
        value={filtroNombre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder='Buscar por apellido'
        name="filtroApellido"
        value={filtroApellido}
        onChange={handleInputChange}
      />
      <button onClick={handleFiltrarUsuarios}><i className="bi bi-search"></i></button>
      <button onClick={handleQuitarFiltro}><i className="bi bi-sort-alpha-up"></i></button><br /><br />
      <h3>Lista de Usuarios</h3><br />
      {serverError && <p>{serverError}</p>}
      {filtroError && <p>{filtroError}</p>}
      {usuarios.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.surname}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleModificarUsuario(usuario)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleBorrarUsuario(usuario.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Actualizar Usuario"
        style={customStyles} // Aplicamos los estilos personalizados al modal
      >
        <div className='button-container'>
          <button className="button-close" onClick={handleCloseModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
          </button>
        </div>
        <div className="container"> {/* Agregamos la clase container al div principal del modal */}
                <h2>Actualizar usuario:</h2><br />
          <div className="row"> {/* Agregamos la clase row al div que contiene la imagen y el formulario */}
            <div className="col-md-6 order-md-1">
              <img src={userImage} alt="image-user" className="img-fluid" />
            </div>
            <div className="col-md-6 order-md-2"> 
              <div className="usuario-seleccionado"> {/* Agregamos la clase usuario-seleccionado al div que contiene los campos de nombre, apellido y el botón de guardar */}
                <label htmlFor="nombre">Nombre:</label><br />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleInputChange}
                  className="form-control" // Agregamos la clase form-control al input de nombre
                /><br />
                <label htmlFor="apellido">Apellido</label><br />
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={handleInputChange}
                  className="form-control" // Agregamos la clase form-control al input de apellido
                /><br />
                <button onClick={handleGuardarCambios} className="btn btn-primary">Guardar</button> {/* Agregamos las clases btn y btn-primary al botón de guardar */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    </div>
  );
}

export default Datos;
