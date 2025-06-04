import React, { useState } from "react";

export default function LoginPage({ setActivePage, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Form Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Belum punya akun?{" "}
            <button onClick={() => setActivePage("register")} className="text-green-500 hover:text-green-700">
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}