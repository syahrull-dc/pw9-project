import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form.css'; 

function FormFetch() {
  const [nama, setNama] = useState('');
  const [prodi, setProdi] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, prodi })
    });
    const data = await res.json();
    setResponse(data.message);
    
    toast.success('Data berhasil dikirim!', {
      position: "top-center",
      autoClose: 5000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div>
      <h2>Form Mahasiswa (Fetch API)</h2>
      <form onSubmit={handleSubmit}>
        <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" required /><br/>
        <input value={prodi} onChange={(e) => setProdi(e.target.value)} placeholder="Prodi" required /><br/>
        <button type="submit">Kirim</button>
      </form>
      <p>{response}</p>
      <ToastContainer />
    </div>
  );
}

export default FormFetch;
