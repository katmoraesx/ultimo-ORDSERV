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
        <li key={order.id} className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
          <div>
            <p className="font-semibold text-lg text-gray-800">{order.descricao}</p>
            <p className="text-gray-600 text-sm">Status: {order.status} | Prioridade: {order.prioridade}</p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => handleEditOrder(order)}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Deletar
            </button>
          </div>
        </li>
      ));
    } else {
      return <p className="text-center text-gray-600">Nenhuma ordem de serviço encontrada.</p>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-8">📋 Ordens de Serviço</h2>

      <div className="bg-white shadow-lg rounded-3xl p-6 mb-8 max-w-3xl mx-auto transition-all">
        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6 text-center">
          {editingOrder ? '✏️ Editar Ordem' : '➕ Criar Nova Ordem'}
        </h3>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Descrição da Ordem"
            value={newOrder.descricao}
            onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
          />
          <select
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
          >
            <option value="iniciada">Iniciada</option>
            <option value="em andamento">Em Andamento</option>
            <option value="finalizada">Finalizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <select
            value={newOrder.prioridade}
            onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
          <select
            value={newOrder.ambiente}
            onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
          >
            <option value="">Selecione o Ambiente</option>
            {ambientes.map((ambiente) => (
              <option key={ambiente.id} value={ambiente.id}>
                {ambiente.nome}
              </option>
            ))}
          </select>
          <select
            value={newOrder.manutentor}
            onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
          >
            <option value="">Selecione o Manutentor</option>
            {manutentores.map((manutentor) => (
              <option key={manutentor.id} value={manutentor.id}>
                {manutentor.nome}
              </option>
            ))}
          </select>

          <button
            onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}
            className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition-all"
          >
            {editingOrder ? 'Atualizar Ordem' : 'Criar Ordem'}
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
