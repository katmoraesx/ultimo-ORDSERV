import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ServiceOrderCrud = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    descricao: '',
    status: 'iniciada',
    prioridade: 'media',
    ambiente: '',
    manutentor: '',
  });
  const [ambientes, setAmbientes] = useState([]);
  const [manutentores, setManutentores] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/data/ordem-servico/');
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchAmbientes = async () => {
    try {
      const response = await axios.get('/data/ambiente/');
      setAmbientes(response.data);
    } catch (error) {
      console.error('Error fetching ambientes:', error);
    }
  };

  const fetchManutentores = async () => {
    try {
      const response = await axios.get('/data/manutentor/');
      setManutentores(response.data);
    } catch (error) {
      console.error('Error fetching manutentores:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchAmbientes();
    fetchManutentores();
  }, []);

  const handleCreateOrder = async () => {
    try {
      await axios.post('/data/ordem-servico/', newOrder);
      fetchOrders();
      setNewOrder({
        descricao: '',
        status: 'iniciada',
        prioridade: 'media',
        ambiente: '',
        manutentor: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/data/ordem-servico/${editingOrder.id}/`, newOrder);
      fetchOrders();
      setEditingOrder(null);
      setNewOrder({
        descricao: '',
        status: 'iniciada',
        prioridade: 'media',
        ambiente: '',
        manutentor: '',
      });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/data/ordem-servico/${id}/`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder(order);
  };

  const listChildren = () => {
    if (Array.isArray(orders) && orders.length > 0) {
      return orders.map((order) => (
        <li key={order.id} className="flex justify-between items-center p-4 border-b border-gray-200">
          <div>
            <p><strong>{order.descricao}</strong></p>
            <p>Status: {order.status} | Prioridade: {order.prioridade}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleEditOrder(order)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ));
    } else {
      return <p className="text-center text-gray-600">No service orders found.</p>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Service Orders</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {editingOrder ? 'Edit Order' : 'Create New Order'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={newOrder.descricao}
            onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="iniciada">Iniciada</option>
            <option value="em andamento">Em Andamento</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <select
            value={newOrder.prioridade}
            onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
          <select
            value={newOrder.ambiente}
            onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Ambiente</option>
            {ambientes.map((ambiente) => (
              <option key={ambiente.id} value={ambiente.id}>
                {ambiente.nome}
              </option>
            ))}
          </select>
          <select
            value={newOrder.manutentor}
            onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Manutentor</option>
            {manutentores.map((manutentor) => (
              <option key={manutentor.id} value={manutentor.id}>
                {manutentor.nome}
              </option>
            ))}
          </select>

          <button
            onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {editingOrder ? 'Update Order' : 'Create Order'}
          </button>
        </div>
      </div>

      <ul>
        {listChildren()}
      </ul>
    </div>
  );
};

export default ServiceOrderCrud;
