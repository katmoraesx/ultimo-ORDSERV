import React, { useState, useEffect } from 'react';
import axios from '../services/axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MaintainerCrud = () => {
  const [manutentores, setManutentores] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [newManutentor, setNewManutentor] = useState({ ni: '', nome: '', area: '', gestor: '' });
  const [editingManutentor, setEditingManutentor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [manutentorRes, gestorRes] = await Promise.all([
          axios.get('/data/manutentor/'),
          axios.get('/data/gestor/')
        ]);
        setManutentores(manutentorRes.data);
        setGestores(gestorRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateOrUpdate = async () => {
    try {
      if (editingManutentor) {
        await axios.put(`/data/manutentor/${editingManutentor.id}/`, newManutentor);
      } else {
        await axios.post('/data/manutentor/', newManutentor);
      }
      setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
      setEditingManutentor(null);
      const updated = await axios.get('/data/manutentor/');
      setManutentores(updated.data);
    } catch (error) {
      console.error('Erro ao salvar manutentor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/data/manutentor/${id}/`);
      setManutentores((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleEdit = (manutentor) => {
    setEditingManutentor(manutentor);
    setNewManutentor(manutentor);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-center text-[#1A202C] mb-10 tracking-tight">
         Gerenciar Manutentores
      </h2>

      <div className="bg-white shadow-lg rounded-3xl p-8 mb-12 max-w-2xl mx-auto transition-all border border-[#B2B2B2]">
        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-6 text-center">
          {editingManutentor ? '✏️ Editar Manutentor' : '➕ Novo Manutentor'}
        </h3>

        <div className="space-y-6">
          {['ni', 'nome', 'area'].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.toUpperCase()}
              value={newManutentor[field]}
              onChange={(e) => setNewManutentor({ ...newManutentor, [field]: e.target.value })}
              className="w-full p-4 rounded-lg border border-[#E2E8F0] bg-[#F7FAFC] focus:ring-2 focus:ring-[#4A90E2] transition"
            />
          ))}

          <select
            value={newManutentor.gestor}
            onChange={(e) => setNewManutentor({ ...newManutentor, gestor: e.target.value })}
            className="w-full p-4 rounded-lg border border-[#E2E8F0] bg-[#F7FAFC] text-gray-700 focus:ring-2 focus:ring-[#4A90E2]"
          >
            <option value="">Selecione um Gestor</option>
            {gestores.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateOrUpdate}
            className="w-full py-3 mt-4 rounded-lg bg-[#4A90E2] hover:bg-[#357ABD] text-white font-semibold shadow-md transition-all"
          >
            {editingManutentor ? 'Salvar Alterações' : 'Criar Manutentor'}
          </button>
        </div>
      </div>

      <ul className="space-y-4 max-w-3xl mx-auto">
        {manutentores.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum manutentor cadastrado.</p>
        ) : (
          manutentores.map((manutentor) => (
            <li
              key={manutentor.id}
              className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center border border-[#E2E8F0] transition-all hover:shadow-xl"
            >
              <div>
                <p><span className="font-semibold text-[#1A202C]">👤 Nome:</span> {manutentor.nome}</p>
                <p><span className="font-semibold text-[#1A202C]">🔧 Área:</span> {manutentor.area}</p>
                <p><span className="font-semibold text-[#1A202C]">🧑‍💼 Gestor:</span> {manutentor.gestor}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(manutentor)} className="text-[#4A90E2] hover:text-[#357ABD]">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(manutentor.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MaintainerCrud;
