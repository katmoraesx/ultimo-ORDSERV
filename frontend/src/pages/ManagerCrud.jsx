import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ManagerCrud = () => {
    const [gestores, setGestores] = useState([]);
    const [newGestor, setNewGestor] = useState({
        ni: '',
        nome: '',
        area: '',
        cargo: '',
    });
    const [editingGestor, setEditingGestor] = useState(null);

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchGestores();
    }, []);

    const handleCreateGestor = async () => {
        try {
            await axios.post('/data/gestor/', newGestor);
            fetchGestores();
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error creating gestor:', error);
        }
    };

    const handleUpdateGestor = async () => {
        try {
            await axios.put(`/data/gestor/${editingGestor.id}/`, newGestor);
            fetchGestores();
            setEditingGestor(null);
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
    };

    const handleDeleteGestor = async (id) => {
        try {
            await axios.delete(`/data/gestor/${id}/`);
            fetchGestores();
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    const handleEditGestor = (gestor) => {
        setEditingGestor(gestor);
        setNewGestor(gestor);
    };

    const listChildren = () => {
        if (Array.isArray(gestores) && gestores.length > 0) {
            return gestores.map((gestor) => (
                <li key={gestor.id} className="flex justify-between items-center p-4 border-b border-sky-200 hover:bg-sky-50 rounded-lg transition-all">
                    <div className="flex-grow">
                        <p className="font-semibold text-lg text-sky-800">{gestor.nome}</p>
                        <p className="text-gray-600">{gestor.ni} - {gestor.area} - {gestor.cargo}</p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleEditGestor(gestor)}
                            className="text-sky-500 hover:text-sky-700 transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteGestor(gestor.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">Nenhum gestor encontrado.</p>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-sky-700 mb-8">👥 Gerenciar Gestores</h2>

            <div className="bg-white p-6 rounded-3xl shadow-lg mb-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold text-sky-600 mb-6 text-center">
                    {editingGestor ? '✏️ Editar Gestor' : '➕ Criar Novo Gestor'}
                </h3>
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Número de Identificação (NI)"
                        value={newGestor.ni}
                        onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newGestor.nome}
                        onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        placeholder="Área"
                        value={newGestor.area}
                        onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <input
                        type="text"
                        placeholder="Cargo"
                        value={newGestor.cargo}
                        onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                        className="w-full p-4 rounded-lg border border-sky-200 bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />

                    <button
                        onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}
                        className="w-full py-3 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    >
                        {editingGestor ? 'Atualizar Gestor' : 'Criar Gestor'}
                    </button>
                </div>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default ManagerCrud;
