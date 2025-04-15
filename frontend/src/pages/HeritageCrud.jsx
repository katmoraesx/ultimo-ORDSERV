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
                <li key={patrimonio.id} className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    <div>
                        <p className="font-semibold text-lg text-gray-800">{patrimonio.ni}</p>
                        <p className="text-gray-600 text-sm">{patrimonio.descricao}</p>
                        <p className="text-gray-500 text-xs">{patrimonio.localizacao}</p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleEditPatrimonio(patrimonio)}
                            className="text-blue-500 hover:text-blue-700 transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeletePatrimonio(patrimonio.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">Nenhum patrimônio encontrado.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-[#2C3E50] mb-6">📚 Gerenciar Patrimônios</h2>

            <div className="bg-white shadow-lg rounded-3xl p-6 mb-8 max-w-3xl mx-auto transition-all">
                <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6 text-center">
                    {editingPatrimonio ? '✏️ Editar Patrimônio' : '➕ Criar Novo Patrimônio'}
                </h3>
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Número de Identificação (NI)"
                        value={newPatrimonio.ni}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, ni: e.target.value })}
                        className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={newPatrimonio.descricao}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, descricao: e.target.value })}
                        className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
                    />
                    <input
                        type="text"
                        placeholder="Localização"
                        value={newPatrimonio.localizacao}
                        onChange={(e) => setNewPatrimonio({ ...newPatrimonio, localizacao: e.target.value })}
                        className="w-full p-4 rounded-lg border border-gray-300 bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
                    />

                    <button
                        onClick={editingPatrimonio ? handleUpdatePatrimonio : handleCreatePatrimonio}
                        className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition-all"
                    >
                        {editingPatrimonio ? 'Atualizar Patrimônio' : 'Criar Patrimônio'}
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
