import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import AddClientModal from "../components/AddClientModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import supabase from "../supabase";
import "./ClientList.css";
import EditClientModal from "./EditClientModal";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clientIdToEdit, setClientIdToEdit] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error("Error fetching clients:", error);
        return;
      }
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchClients();
  };

  const handleDeleteClient = async (clientId) => {
    try {
      // Send the request to delete the client to Supabase using axios
      const { data, error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);
      if (error) {
        console.error("Error deleting client:", error);
        return;
      }
      console.log("Client deleted successfully:", data);
      // Update the client list after successful deletion
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleShowDeleteModal = (clientId) => {
    setClientIdToDelete(clientId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setClientIdToDelete(null); // Reset the client ID after closing the modal
  };

  const handleConfirmDelete = async () => {
    if (clientIdToDelete) {
      await handleDeleteClient(clientIdToDelete);
      handleCloseDeleteModal();
    }
  };

  const handleShowEditModal = (clientId) => {
    const clientToEdit = clients.find((client) => client.id === clientId);
    setFormData(clientToEdit);
    console.log(clientToEdit);
    setClientIdToEdit(clientId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setFormData({}); // Reset the form data after closing the modal
    setClientIdToEdit(null); // Reset the client ID after closing the modal
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      // Send the request to update the client to Supabase using axios
      const { data, error } = await supabase
        .from("clients")
        .update(updatedData)
        .eq("id", clientIdToEdit);
      if (error) {
        console.error("Error updating client:", error);
        return;
      }
      console.log("Client updated successfully:", data);
      // Update the client list after successful update
      fetchClients();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return (
    <div className="clientList-table">
      <h1>Lista de Clientes</h1>

      <Table responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Domicilio</th>
            <th>Intereses Personales</th>
            <th>Destinos</th>
            <th>Tipo de Habitación</th>
            <th>Ingreso Mensual</th>
            <th>Viajes Realizados</th>
            <th>Libros</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <>
              <tr>
                <th>{client.nombre}</th>
                <th>{client.edad} </th>
                <th>{client.sexo}</th>
                <th>{client.domicilio}</th>
                <th>{client.intereses.join(", ")}</th>
                <th>{client.destinos.join(", ")}</th>
                <th>{client.tipo_hab}</th>
                <th>{client.ingreso}</th>
                <th>{client.viajes}</th>
                <th>{client.libros.join(", ")}</th>
                <th>
                  <Button
                    variant="secondary"
                    onClick={() => handleShowEditModal(client.id)}
                  >
                    Editar
                  </Button>
                </th>
                <th>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(client.id)}
                  >
                    Eliminar
                  </Button>
                </th>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>
        Agregar Cliente
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddClientModal
            onClose={handleCloseModal}
            onClientAdded={fetchClients}
          />
        </Modal.Body>
      </Modal>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />

      <EditClientModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        clientData={formData}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ClientList;
