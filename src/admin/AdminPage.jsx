import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminEditor from './AdminEditor';
import { API } from '../hooks/useContent';

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) {
      fetch(`${API}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${saved}` },
      })
        .then((res) => {
          if (res.ok) {
            setToken(saved);
          } else {
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_token');
        })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return <AdminEditor token={token} onLogout={handleLogout} />;
}
