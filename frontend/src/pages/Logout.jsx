import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthenticated }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando algum atraso para uma experiência mais suave (opcional)
    setTimeout(() => {
      localStorage.removeItem('jwt_token'); // Remove o token do localStorage
      setAuthenticated(false); // Atualiza o estado de autenticação
      setIsLoggingOut(false); // Finaliza o estado de logout
      navigate('/login'); // Redireciona para a página de login
    }, 500); // Adiciona um atraso de 500ms (pode ser ajustado conforme necessidade)
  }, [navigate, setAuthenticated]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isLoggingOut ? (
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Desconectando...</h2>
          <p className="text-gray-500 mt-2">Aguarde enquanto finalizamos sua sessão.</p>
        </div>
      ) : (
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Você foi desconectado com sucesso!</h2>
          <p className="text-gray-500 mt-2">Redirecionando para a página de login...</p>
        </div>
      )}
    </div>
  );
};

export default Logout;

