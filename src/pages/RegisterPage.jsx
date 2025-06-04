import React, { useState } from "react";

export default function RegisterPage({ setActivePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      alert("Email sudah terdaftar!");
      return;
    }

    const newUser = { id: Date.now(), email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    setActivePage("login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Form Registrasi</h2>
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Masukkan ulang password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Daftar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Sudah punya akun?{" "}
            <button onClick={() => setActivePage("login")} className="text-green-500 hover:text-green-700">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}