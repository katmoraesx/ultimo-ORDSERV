import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HistoricoCrud = () => {
    const [historicos, setHistoricos] = useState([]);
    const [newHistorico, setNewHistorico] = useState({ ordem: '', data_encerramento: '' });
    const [orders, setOrders] = useState([]); // Estado para armazenar ordens de serviço
    const [editingHistorico, setEditingHistorico] = useState(null);

    // Função para buscar históricos
    const fetchHistoricos = async () => {
        try {
            const response = await axios.get('/data/historico/');
            setHistoricos(response.data);
        } catch (error) {
            console.error('Error fetching historicos:', error);
        }
    };

    // Função para buscar ordens de serviço
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/data/ordem-servico/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchHistoricos();
        fetchOrders(); // Buscar ordens de serviço
    }, []);

    // Função para criar um novo histórico
    const handleCreateHistorico = async () => {
        try {
            await axios.post('/data/historico/', newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error creating historico:', error);
        }
    };

    // Função para atualizar um histórico
    const handleUpdateHistorico = async () => {
        try {
            await axios.put(`/data/historico/${editingHistorico.id}/`, newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setEditingHistorico(null); // Resetar o estado de edição
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error updating historico:', error);
        }
    };

    // Função para excluir um histórico
    const handleDeleteHistorico = async (id) => {
        try {
            await axios.delete(`/data/historico/${id}/`);
            fetchHistoricos(); // Atualizar lista de históricos
        } catch (error) {
            console.error('Error deleting historico:', error);
        }
    };

    // Função para editar um histórico
    const handleEditHistorico = (historico) => {
        setEditingHistorico(historico);
        setNewHistorico(historico);
    };

    // Função para listar os históricos
    const listChildren = () => {
        if (historicos.length > 0) {
            return historicos.map((historico) => (
                <li key={historico.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <p><strong>Ordem:</strong> {historico.ordem?.descricao}</p>
                        <p><strong>Data de Encerramento:</strong> {historico.data_encerramento}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEditHistorico(historico)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteHistorico(historico.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">No historicos found.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Manage Historicos</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {editingHistorico ? 'Edit Historico' : 'Create New Historico'}
                </h3>
                <div className="space-y-4">
                    {/* Select dropdown para ordens de serviço */}
                    <select
                        value={newHistorico.ordem}
                        onChange={(e) => setNewHistorico({ ...newHistorico, ordem: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Ordem</option>
                        {orders.map((order) => (
                            <option key={order.id} value={order.id}>
                                {order.descricao}
                            </option>
                        ))}
                    </select>

                    <input
                        type="datetime-local"
                        placeholder="Data de Encerramento"
                        value={newHistorico.data_encerramento}
                        onChange={(e) => setNewHistorico({ ...newHistorico, data_encerramento: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={editingHistorico ? handleUpdateHistorico : handleCreateHistorico}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {editingHistorico ? 'Update Historico' : 'Create Historico'}
                    </button>
                </div>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default HistoricoCrud;
