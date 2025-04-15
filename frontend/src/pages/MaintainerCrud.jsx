import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const MaintainerCrud = () => {
    const [manutentores, setManutentores] = useState([]);
    const [gestores, setGestores] = useState([]);  // State for gestores
    const [newManutentor, setNewManutentor] = useState({ ni: '', nome: '', area: '', gestor: '' });
    const [editingManutentor, setEditingManutentor] = useState(null);

    const fetchManutentores = async () => {
        try {
            const response = await axios.get('/data/manutentor/');
            setManutentores(response.data);
        } catch (error) {
            console.error('Error fetching manutentores:', error);
        }
    };

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchManutentores();
        fetchGestores();
    }, []);

    const handleCreateManutentor = async () => {
        try {
            await axios.post('/data/manutentor/', newManutentor);
            fetchManutentores();
            setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
        } catch (error) {
            console.error('Error creating manutentor:', error);
        }
    };

    const handleDeleteManutentor = async (id) => {
        try {
            await axios.delete(`/data/manutentor/${id}/`);
            fetchManutentores();
        } catch (error) {
            console.error('Error deleting manutentor:', error);
        }
    };

    const handleEditManutentor = (manutentor) => {
        setEditingManutentor(manutentor);
        setNewManutentor(manutentor);
    };

    const handleUpdateManutentor = async () => {
        try {
            await axios.put(`/data/manutentor/${editingManutentor.id}/`, newManutentor);
            fetchManutentores();
            setEditingManutentor(null);
            setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
        } catch (error) {
            console.error('Error updating manutentor:', error);
        }
    };

    const listChildren = () => {
        if (manutentores.length > 0) {
            return manutentores.map((manutentor) => (
                <li key={manutentor.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <p><strong>Nome:</strong> {manutentor.nome}</p>
                        <p><strong>Área:</strong> {manutentor.area}</p>
                        <p><strong>Gestor:</strong> {manutentor.gestor}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEditManutentor(manutentor)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteManutentor(manutentor.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">No manutentores found.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Manutentores</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {editingManutentor ? 'Edit Manutentor' : 'Create New Manutentor'}
                </h3>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="NI"
                        value={newManutentor.ni}
                        onChange={(e) => setNewManutentor({ ...newManutentor, ni: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newManutentor.nome}
                        onChange={(e) => setNewManutentor({ ...newManutentor, nome: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Área"
                        value={newManutentor.area}
                        onChange={(e) => setNewManutentor({ ...newManutentor, area: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={newManutentor.gestor}
                        onChange={(e) => setNewManutentor({ ...newManutentor, gestor: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gestor</option>
                        {gestores.map((gestor) => (
                            <option key={gestor.id} value={gestor.id}>
                                {gestor.nome}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={editingManutentor ? handleUpdateManutentor : handleCreateManutentor}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {editingManutentor ? 'Update Manutentor' : 'Create Manutentor'}
                    </button>
                </div>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default MaintainerCrud;
