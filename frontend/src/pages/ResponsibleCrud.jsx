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
                <li key={responsavel.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-blue-50">
                    <div>
                        <p className="text-lg font-semibold text-blue-700">{responsavel.nome}</p>
                        <p className="text-sm text-gray-600">{responsavel.ni}</p>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleEditResponsavel(responsavel)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteResponsavel(responsavel.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-center text-gray-600">Nenhum responsável encontrado.</p>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Gerenciar Responsáveis</h2>

            {/* Exibição da mensagem de erro */}
            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg shadow-md">
                    {errorMessage}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
                    {editingResponsavel ? 'Editar Responsável' : 'Criar Novo Responsável'}
                </h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Número de Identificação (NI)"
                        value={newResponsavel.ni}
                        onChange={(e) => setNewResponsavel({ ...newResponsavel, ni: e.target.value })}
                        className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newResponsavel.nome}
                        onChange={(e) => setNewResponsavel({ ...newResponsavel, nome: e.target.value })}
                        className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={editingResponsavel ? handleUpdateResponsavel : handleCreateResponsavel}
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {loading ? 'Processando...' : editingResponsavel ? 'Atualizar Responsável' : 'Criar Responsável'}
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {listChildren()}
            </ul>
        </div>
    );
};

export default ResponsibleCrud;
