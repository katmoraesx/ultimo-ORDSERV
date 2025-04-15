import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ResponsibleCrud = () => {
    const [responsaveis, setResponsaveis] = useState([]);
    const [newResponsavel, setNewResponsavel] = useState({ ni: '', nome: '' });
    const [editingResponsavel, setEditingResponsavel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Função para buscar responsáveis
    const fetchResponsaveis = async () => {
        try {
            setLoading(true);  // Inicia o loading ao buscar dados
            const response = await axios.get('/data/responsavel/');
            setResponsaveis(response.data);
        } catch (error) {
            setErrorMessage('Error fetching responsaveis.');
            console.error('Error fetching responsaveis:', error);
        } finally {
            setLoading(false);  // Finaliza o loading
        }
    };

    // Hook para carregar dados ao montar o componente
    useEffect(() => {
        fetchResponsaveis();
    }, []);

    // Função para criar responsável
    const handleCreateResponsavel = async () => {
        try {
            setLoading(true);
            await axios.post('/data/responsavel/', newResponsavel);
            fetchResponsaveis();
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            setErrorMessage('Error creating responsavel.');
            console.error('Error creating responsavel:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para atualizar responsável
    const handleUpdateResponsavel = async () => {
        try {
            setLoading(true);
            await axios.put(`/data/responsavel/${editingResponsavel.id}/`, newResponsavel);
            fetchResponsaveis();
            setEditingResponsavel(null);
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            setErrorMessage('Error updating responsavel.');
            console.error('Error updating responsavel:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para deletar responsável
    const handleDeleteResponsavel = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`/data/responsavel/${id}/`);
            fetchResponsaveis();
        } catch (error) {
            setErrorMessage('Error deleting responsavel.');
            console.error('Error deleting responsavel:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para editar responsável
    const handleEditResponsavel = (responsavel) => {
        setEditingResponsavel(responsavel);
        setNewResponsavel(responsavel);
    };

    // Função para listar os responsáveis
    const listChildren = () => {
        if (Array.isArray(responsaveis) && responsaveis.length > 0) {
            return responsaveis.map((responsavel) => (
                <li key={responsavel.id} className="flex justify-between items-center py-2">
                    <span>{responsavel.nome} - {responsavel.ni}</span>
                    <div>
                        <button
                            onClick={() => handleEditResponsavel(responsavel)}
                            className="text-teal-500 hover:text-teal-700 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteResponsavel(responsavel.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p>No responsaveis found.</p>;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Responsaveis</h2>

            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="NI"
                    value={newResponsavel.ni}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, ni: e.target.value })}
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newResponsavel.nome}
                    onChange={(e) => setNewResponsavel({ ...newResponsavel, nome: e.target.value })}
                    className="border p-2 rounded mr-2"
                />
                <button
                    onClick={editingResponsavel ? handleUpdateResponsavel : handleCreateResponsavel}
                    disabled={loading}
                    className="bg-teal-600 text-white p-2 rounded"
                >
                    {loading ? 'Processing...' : editingResponsavel ? 'Update Responsavel' : 'Create Responsavel'}
                </button>
            </div>

            <ul className="space-y-4">
                {listChildren()}
            </ul>
        </div>
    );
};

export default ResponsibleCrud;
