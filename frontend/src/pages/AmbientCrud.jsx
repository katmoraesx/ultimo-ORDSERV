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
                <li key={ambiente.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <p><strong>{ambiente.ni}</strong> - {ambiente.nome}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEditAmbiente(ambiente)}
                            className="text-sky-500 hover:text-sky-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteAmbiente(ambiente.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">No ambientes found.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-sky-700 mb-6">Manage Ambientes</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-semibold text-sky-600 mb-4">
                    {editingAmbiente ? 'Edit Ambiente' : 'Create New Ambiente'}
                </h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="NI"
                        value={newAmbiente.ni}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, ni: e.target.value })}
                        className="w-full p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newAmbiente.nome}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, nome: e.target.value })}
                        className="w-full p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />

                    <button
                        onClick={editingAmbiente ? handleUpdateAmbiente : handleCreateAmbiente}
                        className="w-full py-3 bg-sky-400 text-white font-semibold rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    >
                        {editingAmbiente ? 'Update Ambiente' : 'Create Ambiente'}
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
