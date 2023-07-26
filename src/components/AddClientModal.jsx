import React, { useState } from "react";
import supabase from "../supabase";

const AddClientModal = ({ onClose, onClientAdded }) => {
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

      const { data, error } = await supabase.from("clients").insert([newData]);
      if (error) {
        console.error("Error creating client:", error);
        return;
      }
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
      onClientAdded();
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
      onClose();
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
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            className="formInput"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Paterno:
          <input
            className="formInput"
            type="text"
            name="apellidoP"
            value={formData.apellidoP}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido Materno:
          <input
            className="formInput"
            type="text"
            name="apellidoM"
            value={formData.apellidoM}
            onChange={handleChange}
          />
        </label>
        <label>
          Edad:
          <input
            className="formInput"
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
        </label>
        <label>
          Sexo:
          <input
            className="formInput"
            type="radio"
            name="sexo"
            value="M"
            onChange={handleChange}
          />{" "}
          Masculino
          <input
            className="formInput"
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
            className="formInput"
            type="text"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
          />
        </label>
        <label>
          Intereses personales:
          <input
            className="formInput"
            type="checkbox"
            name="Música"
            onChange={handleInteresesChange}
          />{" "}
          Música
          <input
            className="formInput"
            type="checkbox"
            name="Cine"
            onChange={handleInteresesChange}
          />{" "}
          Cine
          <input
            className="formInput"
            type="checkbox"
            name="Modelado"
            onChange={handleInteresesChange}
          />{" "}
          Modelado
          <input
            className="formInput"
            type="checkbox"
            name="Compras"
            onChange={handleInteresesChange}
          />{" "}
          Compras
        </label>
        <label>
          Destinos de viajes preferidos:
          <input
            className="formInput"
            type="checkbox"
            name="Desierto"
            onChange={handleDestinosChange}
          />{" "}
          Desierto
          <input
            className="formInput"
            type="checkbox"
            name="Playa"
            onChange={handleDestinosChange}
          />{" "}
          Playa
          <input
            className="formInput"
            type="checkbox"
            name="Ciudad"
            onChange={handleDestinosChange}
          />{" "}
          Ciudad
          <input
            className="formInput"
            type="checkbox"
            name="Montaña"
            onChange={handleDestinosChange}
          />{" "}
          Montaña
        </label>
        <label>
          Tipo de habitación:
          <select
            className="formInput"
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
            className="formInput"
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
            className="formInput"
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
            className="formInput"
            type="checkbox"
            name="Romance"
            onChange={handleLibrosChange}
          />{" "}
          Romance
          <input
            className="formInput"
            type="checkbox"
            name="Novela"
            onChange={handleLibrosChange}
          />{" "}
          Novela
          <input
            className="formInput"
            type="checkbox"
            name="Fantasía"
            onChange={handleLibrosChange}
          />{" "}
          Fantasía
          <input
            className="formInput"
            type="checkbox"
            name="Política"
            onChange={handleLibrosChange}
          />{" "}
          Política
          <input
            className="formInput"
            type="checkbox"
            name="Científicos"
            onChange={handleLibrosChange}
          />{" "}
          Científicos
        </label>
        <div className="saveContainer">
          <button type="submit" className="saveEdit">
            Create Client
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientModal;
