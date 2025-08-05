import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate('/');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '20px' }}>Admin Dashboard</h1>

      <nav style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px'
      }}>
        <button onClick={() => handleTabClick('/datamanipulation')}> Data Creation</button>
        <button onClick={() => handleTabClick('/history')}> History</button>
        <button onClick={() => handleTabClick('/bulkupdated')}>Bulk Update</button>
        <button onClick={handleLogout}> Logout</button>
      </nav>

      <p>Select a tab above to manage data.</p>
    </div>
  );
}

export default AdminHome;
