import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import MaterialDatatable from "material-datatable";
import axios from 'axios';

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [item, setItem] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const columns = [
    {
     name: "Nombre",
     field: "nombre",
     
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "Apellido",
     field: "apellido",
     options: {
      filter: true,
      sort: false,
     }
    }
  
   ];
    
  
   

  const onSubmit = data => {
    axios
    .post("http://localhost:5000/api/profesor", data)
    .then(
      (response) => {
        
        cargar();
      }
     
    )
    .catch((error) => {
      console.log(error);
    });


  }

   useEffect(() => {

      cargar();

  
  },[]);

 


  const cargar = async() =>{
    const { data } = await axios.get("0'i0}0'' o  ");

    //const { data } = await axios.get("/api/zona/listar");
    console.log(data);
    setItem(data.profesor);
    return null;
  }
  console.log(errors);
  
  return (
<div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="nombre" name="nombre" ref={register} />
      <input type="text" placeholder="apellido" name="apellido" ref={register} />
      <input type="text" placeholder="rut" name="rut" ref={register} />
      <input type="number" placeholder="edad" name="edad" ref={register} />

      <input type="submit" />
    </form>

<MaterialDatatable
title={"Profesores"}
data={item}
columns={columns}
options={{
  selectableRows: true,
  print: false,
  onlyOneRowCanBeSelected: false,
  textLabels: {
    body: {
      noMatch: "Lo sentimos, no se encuentran registros",
      toolTip: "Sort",
    },
    pagination: {
      next: "Siguiente",
      previous: "Página Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
  },
  download: false,
  pagination: true,
  rowsPerPage: 5,
  usePaperPlaceholder: true,
  rowsPerPageOptions: [5, 10, 25],
  sortColumnDirection: "desc",
}}

/>
</div>
  );
}