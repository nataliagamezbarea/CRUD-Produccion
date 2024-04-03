import React from 'react';
import userImage from '../../assets/images/user.png';
import './Registro.css'; 

function Registro() {
  return (
    
    <div className="center-container"> 
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
