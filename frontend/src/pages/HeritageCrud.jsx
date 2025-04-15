import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const HeritageCrud = () => {
    const [patrimonios, setPatrimonios] = useState([]);
    const [newPatrimonio, setNewPatrimonio] = useState({ ni: '', descricao: '', localizacao: '' });
    const [editingPatrimonio, setEditingPatrimonio] = useState(null);

    const fetchPatrimonios = async () => {
        try {
            const response = await axios.get('/data/patrimonio/');
            setPatrimonios(response.data);
        } catch (error) {
            console.error('Error fetching patrimonios:', error);
        }
    };

    useEffect(() => {
        fetchPatrimonios();
    }, []);

    const handleCreatePatrimonio = async () => {
        try {
            await axios.post('/data/patrimonio/', newPatrimonio);
            fetchPatrimonios();
            setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
        } catch (error) {
            console.error('Error creating patrimonio:', error);
        }
    };

    const handleDeletePatrimonio = async (id) => {
        try {
            await axios.delete(`/data/patrimonio/${id}/`);
            fetchPatrimonios();
        } catch (error) {
            console.error('Error deleting patrimonio:', error);
        }
    };

    const handleEditPatrimonio = (patrimonio) => {
        setEditingPatrimonio(patrimonio);
        setNewPatrimonio(patrimonio);
    };

    const handleUpdatePatrimonio = async () => {
        try {
            await axios.put(`/data/patrimonio/${editingPatrimonio.id}/`, newPatrimonio);
            fetchPatrimonios();
            setEditingPatrimonio(null);
            setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
        } catch (error) {
            console.error('Error updating patrimonio:', error);
        }
    };

    const listChildren = () => {
        if (patrimonios.length > 0) {
            return patrimonios.map((patrimonio) => (
                <li key={patrimonio.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <p><strong>{patrimonio.ni}</strong> - {patrimonio.descricao}</p>
                        <p className="text-sm text-gray-500">{patrimonio.localizacao}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEditPatrimonio(patrimonio)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeletePatrimonio(patrimonio.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">No patrimonios found.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Manage Patrimonios</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    {editingPatrimonio ? 'Edit Patrimonio' : 'Create New Patrimonio'}
                </h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="NI"
                        value={newPatrimonio.ni}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, ni: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={newPatrimonio.descricao}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, descricao: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Localização"
                        value={newPatrimonio.localizacao}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, localizacao: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={editingPatrimonio ? handleUpdatePatrimonio : handleCreatePatrimonio}
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {editingPatrimonio ? 'Update Patrimonio' : 'Create Patrimonio'}
                    </button>
                </div>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default HeritageCrud;
