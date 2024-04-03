import React, { useState, useEffect } from 'react'
import Registro from './components/Registro/Registro'
import Datos from './components/Datos/'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './components/Login'
import Modal from './components/Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function openModifyModal() {
    setIsModifyModalOpen(true)
  }

  function closeModifyModal() {
    setIsModifyModalOpen(false)
  }
  const [isLogged, setIsLogged] = useState(false)

  function handleLogin() {
    setIsLogged(true)
  }

  return (
    <>
      {!isLogged &&<Login onLogin={handleLogin} /> }
      {isLogged && (
      <>
        <Datos
          modalOpen={openModal}        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Registro />
        </Modal>
      </>
      )}
    </>
  )
}

export default App
