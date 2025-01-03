import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminVerification } from './pages/AdminVerification';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { SMEDashboard } from './pages/SMEDashboard';
import { VerificationPending } from './components/auth/VerificationPending';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            <Route path="/dashboard/sme" element={<SMEDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verification-pending" element={<VerificationPending />} />
            <Route path="/admin/verification" element={<AdminVerification />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;