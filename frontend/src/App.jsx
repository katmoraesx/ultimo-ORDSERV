import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ServiceOrderCrud from './pages/ServiceOrderCrud';
import AmbientCrud from './pages/AmbientCrud';
import Logout from './pages/Logout';
import MaintainerCrud from './pages/MaintainerCrud';
import HeritageCrud from './pages/HeritageCrud';
import ManagerCrud from './pages/ManagerCrud';
import ResponsibleCrud from './pages/ResponsibleCrud';
import HistoricoCrud from './pages/HistoryCrud';
import Register from './pages/Register';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwt_token'));

  const menuItems = [
    { to: '/register', label: 'Registrar' },
    { to: '/login', label: 'Entrar' },
    { to: '/serviceorder', label: 'Ordens de Serviço' },
    { to: '/maintainer', label: 'Manutentores' },
    { to: '/heritage', label: 'Patrimônios' },
    { to: '/ambient', label: 'Ambientes' },
    { to: '/manager', label: 'Gestores' },
    { to: '/responsible', label: 'Responsáveis' },
    { to: '/history', label: 'Histórico' },
    { to: '/logout', label: 'Sair' },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#D1EEFC] via-[#C5DFF8] to-[#D1EEFC] text-[#2C3E50] font-sans">

        {/* Header elegante e criativo */}
        <header className="bg-white/30 backdrop-blur-xl shadow-md rounded-b-3xl py-8 px-6 border-b border-white/20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold text-[#508AA8] drop-shadow-sm">🔧 OrdsServ</h1>
            <p className="text-md mt-2 text-[#7FB7E0] tracking-wide">Gestão moderna, visual encantador 💙</p>
          </div>
        </header>

        {/* Navegação em estilo card glass */}
        <nav className="container mx-auto my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
          {menuItems.map((item, index) => {
            if ((item.to === '/login' || item.to === '/register') && authenticated) return null;
            if (authenticated || item.to === '/login' || item.to === '/register') {
              return (
                <Link
                  key={index}
                  to={item.to}
                  className="bg-white/40 backdrop-blur-md border border-white/30 hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl p-4 text-center text-[#2C3E50] font-semibold hover:bg-[#eaf6fd] hover:text-[#508AA8]"
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}
        </nav>

        {/* Conteúdo central com efeito vidro */}
        <main className="flex-1 container mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 my-8 transition-all duration-500">
            <Routes>
              <Route path="/register" element={<Register setAuthenticated={setAuthenticated} />} />
              <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
              <Route path="/serviceorder" element={authenticated ? <ServiceOrderCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/maintainer" element={authenticated ? <MaintainerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/heritage" element={authenticated ? <HeritageCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/ambient" element={authenticated ? <AmbientCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/manager" element={authenticated ? <ManagerCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/responsible" element={authenticated ? <ResponsibleCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/history" element={authenticated ? <HistoricoCrud /> : <Login setAuthenticated={setAuthenticated} />} />
              <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
            </Routes>
          </div>
        </main>

        {/* Footer criativo */}
        <footer className="bg-[#C5DFF8] text-[#2C3E50] py-5 rounded-t-3xl shadow-inner">
          <div className="container mx-auto text-center text-sm font-light">
            <p>&copy; 2025 <span className="font-bold text-[#508AA8]">OrdsServ</span>. Design com 💙, inovação e beleza.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
