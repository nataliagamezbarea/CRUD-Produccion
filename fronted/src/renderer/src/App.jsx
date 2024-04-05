import React, { useState } from 'react'
import Registro from './components/Registro/Registro'
import Datos from './components/Datos/'
import Login from './components/Login'
import Modal from './components/Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  const [isLogged, setIsLogged] = useState(false)

  function handleLogin() {
    setIsLogged(true)
  }


  return (
    <>
      {!isLogged && <Login onLogin={handleLogin} />}
      {isLogged && 
        <>
          <Datos  modalOpen={openModal} />
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Registro onClose={closeModal} />
          </Modal>
        </>
}
    </>
  )
}

export default App
