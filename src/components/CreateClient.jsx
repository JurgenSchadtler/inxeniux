import React, { useState } from "react";
import axios from "axios";
import supabase from "../supabase";

function CreateClient() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    edad: "",
    sexo: "",
    domicilio: "",
    intereses: [],
    destinos: [],
    tipo_hab: "",
    ingreso: "",
    viajes: "",
    libros: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInteresesChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      intereses: checked
        ? [...prevData.intereses, name]
        : prevData.intereses.filter((interes) => interes !== name),
    }));
  };

  const handleDestinosChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      destinos: checked
        ? [...prevData.destinos, name]
        : prevData.destinos.filter((destino) => destino !== name),
    }));
  };

  const handleLibrosChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      libros: checked
        ? [...prevData.libros, name]
        : prevData.libros.filter((libro) => libro !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nombreCompleto = `${formData.nombre} ${formData.apellidoP} ${formData.apellidoM}`;

      const { apellidoP, apellidoM, ...newData } = formData;

      newData.nombre = nombreCompleto;

      const { data: newClient, error } = await supabase
        .from("clients")
        .insert([newData]);
      if (error) {
        console.error("Error creating client:", error);
        return;
      }
      console.log("New client created:", newClient[0]);
      setFormData({
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        edad: "",
        sexo: "",
        domicilio: "",
        intereses: [],
        destinos: [],
        tipo_hab: "",
        ingreso: "",
        viajes: "",
        libros: [],
      });
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <>
      {" "}
      <div>
        <h1>Create New Client</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido Paterno:
            <input
              type="text"
              name="apellidoP"
              value={formData.apellidoP}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido Materno:
            <input
              type="text"
              name="apellidoM"
              value={formData.apellidoM}
              onChange={handleChange}
            />
          </label>
          <label>
            Edad:
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
            />
          </label>
          <label>
            Sexo:
            <input
              type="radio"
              name="sexo"
              value="M"
              onChange={handleChange}
            />{" "}
            Masculino
            <input
              type="radio"
              name="sexo"
              value="F"
              onChange={handleChange}
            />{" "}
            Femenino
          </label>
          <label>
            Domicilio Completo:
            <input
              type="text"
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
            />
          </label>
          <label>
            Intereses personales:
            <input
              type="checkbox"
              name="Música"
              onChange={handleInteresesChange}
            />{" "}
            Música
            <input
              type="checkbox"
              name="Cine"
              onChange={handleInteresesChange}
            />{" "}
            Cine
            <input
              type="checkbox"
              name="Modelado"
              onChange={handleInteresesChange}
            />{" "}
            Modelado
            <input
              type="checkbox"
              name="Compras"
              onChange={handleInteresesChange}
            />{" "}
            Compras
          </label>
          <label>
            Destinos de viajes preferidos:
            <input
              type="checkbox"
              name="Desierto"
              onChange={handleDestinosChange}
            />{" "}
            Desierto
            <input
              type="checkbox"
              name="Playa"
              onChange={handleDestinosChange}
            />{" "}
            Playa
            <input
              type="checkbox"
              name="Ciudad"
              onChange={handleDestinosChange}
            />{" "}
            Ciudad
            <input
              type="checkbox"
              name="Montaña"
              onChange={handleDestinosChange}
            />{" "}
            Montaña
          </label>
          <label>
            Tipo de habitación:
            <select
              name="tipo_hab"
              value={formData.tipo_hab}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="Casa propia">Casa propia</option>
              <option value="Departamento">Departamento</option>
              <option value="Renta">Renta</option>
            </select>
          </label>
          <label>
            Ingreso mensual:
            <select
              name="ingreso"
              value={formData.ingreso}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="2,500 – 5,000">2,500 – 5,000</option>
              <option value="5,001 – 7,000">5,001 – 7,000</option>
              <option value="7,001 – 10,000">7,001 – 10,000</option>
            </select>
          </label>
          <label>
            Viajes realizados durante el año:
            <select
              name="viajes"
              value={formData.viajes}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1 – 3">1 – 3</option>
              <option value="4 – 6">4 – 6</option>
              <option value="7 – 10">7 – 10</option>
            </select>
          </label>
          <label>
            Libros:
            <input
              type="checkbox"
              name="Romance"
              onChange={handleLibrosChange}
            />{" "}
            Romance
            <input
              type="checkbox"
              name="Novela"
              onChange={handleLibrosChange}
            />{" "}
            Novela
            <input
              type="checkbox"
              name="Fantasía"
              onChange={handleLibrosChange}
            />{" "}
            Fantasía
            <input
              type="checkbox"
              name="Política"
              onChange={handleLibrosChange}
            />{" "}
            Política
            <input
              type="checkbox"
              name="Científicos"
              onChange={handleLibrosChange}
            />{" "}
            Científicos
          </label>
          <button type="submit">Crear Cliente</button>
        </form>
      </div>
    </>
  );
}

export default CreateClient;
