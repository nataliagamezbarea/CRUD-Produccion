import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Registro from './components/Registro/Registro';
import Datos from './components/Datos/';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const themeElement = document.querySelector('html');
    themeElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

 
  const closeModal = () => {
    setModalIsOpen(false);
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark-theme' : ''}`}>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <label className="switch">
        <input type="checkbox" onClick={toggleTheme} checked={darkMode} />
        <span className="slider round"></span>
      </label>
    </div>
  
      
      <Datos />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registro Modal"
        style={customStyles}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Crear usuario</h1>
          <div className='button-container'>
            <button className="button-close" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </div>
        </div>
        <Registro />
      </Modal>
    </div>
  );
}

export default App;
