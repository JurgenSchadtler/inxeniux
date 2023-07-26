import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./EditClientModal.css";

const EditClientModal = ({ show, onClose, clientData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(clientData);
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? [...formData[name], value] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
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

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSave}>
          <div>
            <label> Nombre:</label>
            <input
              className="formInput"
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              Edad:
              <input
                className="formInput"
                type="number"
                name="edad"
                value={formData.edad || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Sexo:
              <input
                className="formInput"
                type="radio"
                name="sexo"
                value="M"
                checked={formData.sexo === "M"}
                onChange={handleChange}
              />{" "}
              Masculino
              <input
                type="radio"
                name="sexo"
                value="F"
                checked={formData.sexo === "F"}
                onChange={handleChange}
              />{" "}
              Femenino
            </label>
          </div>
          <div>
            <label>
              Domicilio Completo:
              <input
                type="text"
                name="domicilio"
                value={formData.domicilio || ""}
                onChange={handleChange}
                className="formInput"
              />
            </label>
          </div>
          <div>
            <label>
              Intereses personales:
              <input
                className="formInput"
                type="checkbox"
                name="Música"
                checked={formData.intereses?.includes("Música")}
                onChange={handleInteresesChange}
              />{" "}
              Música
              <input
                type="checkbox"
                className="formInput"
                name="Cine"
                checked={formData.intereses?.includes("Cine")}
                onChange={handleInteresesChange}
              />{" "}
              Cine
              <input
                type="checkbox"
                name="Modelado"
                className="formInput"
                checked={formData.intereses?.includes("Modelado")}
                onChange={handleInteresesChange}
              />{" "}
              Modelado
              <input
                type="checkbox"
                name="Compras"
                className="formInput"
                checked={formData.intereses?.includes("Compras")}
                onChange={handleInteresesChange}
              />{" "}
              Compras
            </label>
          </div>
          <div>
            <label>
              Destinos de viajes preferidos:
              <input
                type="checkbox"
                className="formInput"
                name="Desierto"
                checked={formData.destinos?.includes("Desierto")}
                onChange={handleDestinosChange}
              />{" "}
              Desierto
              <input
                type="checkbox"
                className="formInput"
                name="Playa"
                checked={formData.destinos?.includes("Playa")}
                onChange={handleDestinosChange}
              />{" "}
              Playa
              <input
                type="checkbox"
                name="Ciudad"
                className="formInput"
                checked={formData.destinos?.includes("Ciudad")}
                onChange={handleDestinosChange}
              />{" "}
              Ciudad
              <input
                type="checkbox"
                className="formInput"
                name="Montaña"
                checked={formData.destinos?.includes("Montaña")}
                onChange={handleDestinosChange}
              />{" "}
              Montaña
            </label>
          </div>
          <div>
            <label>
              Tipo de habitación:
              <select
                className="formInput"
                name="tipo_hab"
                value={formData.tipo_hab || ""}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Casa propia">Casa propia</option>
                <option value="Departamento">Departamento</option>
                <option value="Renta">Renta</option>
              </select>
            </label>
          </div>
          <label>
            Ingreso mensual:
            <select
              className="formInput"
              name="ingreso"
              value={formData.ingreso || ""}
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
              className="formInput"
              name="viajes"
              value={formData.viajes || ""}
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
              className="formInput"
              type="checkbox"
              name="Romance"
              checked={formData.libros?.includes("Romance")}
              onChange={handleLibrosChange}
            />{" "}
            Romance
            <input
              className="formInput"
              type="checkbox"
              name="Novela"
              checked={formData.libros?.includes("Novela")}
              onChange={handleLibrosChange}
            />{" "}
            Novela
            <input
              className="formInput"
              type="checkbox"
              name="Fantasía"
              checked={formData.libros?.includes("Fantasía")}
              onChange={handleLibrosChange}
            />{" "}
            Fantasía
            <input
              className="formInput"
              type="checkbox"
              name="Política"
              checked={formData.libros?.includes("Política")}
              onChange={handleLibrosChange}
            />{" "}
            Política
            <input
              className="formInput"
              type="checkbox"
              name="Científicos"
              checked={formData.libros?.includes("Científicos")}
              onChange={handleLibrosChange}
            />{" "}
            Científicos
          </label>
          <div className="saveContainer">
            <button type="submit" className="saveEdit">
              Guardar
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditClientModal;
