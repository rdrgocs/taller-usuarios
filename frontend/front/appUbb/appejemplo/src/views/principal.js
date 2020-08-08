import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './login';
import Producto from './productos/productos';
import axios from 'axios';
export default function Principal() {
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {

    renderizadoCondicional();


  }, []);

  function renderizadoCondicional() {

    axios
      .post("http://localhost:5000/api/usuario/vigencia")
      .then(
        (response) => {
          console.log(response.data);
          if (response.status == 200) {
            setAutorizado(true)
            alert('Autorizado')
          }
        }
      )
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            setAutorizado(false)
            //   window.location='/login'
            let motivo = err.response.data.mensaje;
            alert(`No autorizado:${motivo}`)
          }
          console.log(err.response.data.mensaje)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }

      });

   
   

  }


  return (
 
    <Home/>
  );


function Home() {
  if(autorizado){
  return (
    <Router>
    <div>
      <h1>Bienvenidos</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <Link to="/productos">productos</Link>
          </li>
        </ul>
      </nav>



      <Switch>

        <Route path="/productos">
          <Producto />
        </Route>


      </Switch>
    </div>
  </Router>
   )
  }else{
    return <h2>Cargando...</h2>;
  }
 
}
}
