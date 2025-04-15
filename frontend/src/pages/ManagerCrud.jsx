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
                <li key={gestor.id}>
                    {gestor.nome} - {gestor.ni} - {gestor.area} - {gestor.cargo}
                    <button onClick={() => handleEditGestor(gestor)}>Edit</button>
                    <button onClick={() => handleDeleteGestor(gestor.id)}>Delete</button>
                </li>
            ));
        } else {
            return <p>No gestores found.</p>;
        }
    };

    return (
        <div>
            <h2>Gestores</h2>
            <div>
                <input
                    type="text"
                    placeholder="NI"
                    value={newGestor.ni}
                    onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newGestor.nome}
                    onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newGestor.area}
                    onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cargo"
                    value={newGestor.cargo}
                    onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                />
                <button onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}>
                    {editingGestor ? 'Update Gestor' : 'Create Gestor'}
                </button>
            </div>

            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default ManagerCrud;
