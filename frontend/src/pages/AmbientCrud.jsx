import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const AmbientCrud = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [newAmbiente, setNewAmbiente] = useState({ ni: '', nome: '' });
    const [editingAmbiente, setEditingAmbiente] = useState(null);

    const fetchAmbientes = async () => {
        try {
            const response = await axios.get('/data/ambiente/');
            setAmbientes(response.data);
        } catch (error) {
            console.error('Error fetching ambientes:', error);
        }
    };

    useEffect(() => {
        fetchAmbientes();
    }, []);

    const handleCreateAmbiente = async () => {
        try {
            await axios.post('/data/ambiente/', newAmbiente);
            fetchAmbientes();
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating ambiente:', error);
        }
    };

    const handleDeleteAmbiente = async (id) => {
        try {
            await axios.delete(`/data/ambiente/${id}/`);
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting ambiente:', error);
        }
    };

    const handleEditAmbiente = (ambiente) => {
        setEditingAmbiente(ambiente);
        setNewAmbiente(ambiente);
    };

    const handleUpdateAmbiente = async () => {
        try {
            await axios.put(`/data/ambiente/${editingAmbiente.id}/`, newAmbiente);
            fetchAmbientes();
            setEditingAmbiente(null);
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error updating ambiente:', error);
        }
    };

    const listChildren = () => {
        if (ambientes.length > 0) {
            return ambientes.map((ambiente) => (
                <li key={ambiente.id} className="flex justify-between items-center p-4 border-b border-sky-200 hover:bg-sky-50 rounded-lg transition-all">
                    <div>
                        <p className="font-semibold text-lg text-sky-800">{ambiente.ni}</p>
                        <p className="text-gray-600">{ambiente.nome}</p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleEditAmbiente(ambiente)}
                            className="text-sky-500 hover:text-sky-700 transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteAmbiente(ambiente.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">Nenhum ambiente encontrado.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-sky-700 mb-8">🌍 Gerenciar Ambientes</h2>

            <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 max-w-3xl mx-auto transition-all">
                <h3 className="text-2xl font-semibold text-sky-600 mb-6 text-center">
                    {editingAmbiente ? '✏️ Editar Ambiente' : '➕ Criar Novo Ambiente'}
                </h3>
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Número de Identificação (NI)"
                        value={newAmbiente.ni}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, ni: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newAmbiente.nome}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, nome: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                    />

                    <button
                        onClick={editingAmbiente ? handleUpdateAmbiente : handleCreateAmbiente}
                        className="w-full py-3 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
                    >
                        {editingAmbiente ? 'Atualizar Ambiente' : 'Criar Ambiente'}
                    </button>
                </div>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default AmbientCrud;
