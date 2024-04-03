import React from 'react';
import userImage from '../../assets/images/user.png';
import './Registro.css'; 

function Registro({ onCloseModal }) {
  return (
    
    <div className="center-container">
       <div  className='button-container'>
      <button className='button-close' onClick={onCloseModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button> 
      </div>
       <h1>Registrar usuarios</h1><br />
      <div className="container">
        <div className="row">
          <div className="col-md-6 order-md-1">
            <img src={userImage} alt="image-user" className="img-fluid" />
          </div>
          
          <div className="col-md-6 order-md-2"> 
            <form action="http://localhost:3000" method="POST"> 
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" className="form-control" id="apellido" name="apellido" />
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
