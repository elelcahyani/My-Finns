import React, { useState } from "react";
import BarChart from "../components/BarChart";
import TransactionForm from "../components/TransactionForm";
import NoteCard from "../components/NoteCard";
import GoalBar from "../components/GoalBar";

// Mock data
const initialTransactions = [
  { id: 1, type: "income", amount: 5000000, date: "2025-04-01", detail: "Gaji Bulanan", category: "Pemasukan" },
  { id: 2, type: "expense", amount: 300000, date: "2025-04-05", detail: "Beli beras", category: "Kebutuhan Sehari-hari" },
];

const initialNotes = [{ id: 1, title: "Belanja Mingguan", content: "Beli sayur dan daging", mood: "Senang" }];
const initialGoals = [{ id: 1, targetAmount: 100000000, goalName: "Mobil Impian", saved: 20000000 }];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [notes, setNotes] = useState(initialNotes);
  const [goals, setGoals] = useState(initialGoals);
  const [newTransaction, setNewTransaction] = useState({
    type: "income",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    detail: "",
    category: "",
  });
  const [newNote, setNewNote] = useState({ title: "", content: "", mood: "" });
  const [newGoal, setNewGoal] = useState({ targetAmount: "", goalName: "", saved: "0" });

  // 🔹 Tambah Transaksi
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transactionToAdd = {
      ...newTransaction,
      id: Date.now(),
      amount: parseFloat(newTransaction.amount),
    };
    if (!isNaN(transactionToAdd.amount)) {
      setTransactions([...transactions, transactionToAdd]);
      setNewTransaction({
        type: "income",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        detail: "",
        category: "",
      });
    }
  };

  // 🔹 Hapus Transaksi
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // 🔹 Edit Transaksi
  const handleEditTransaction = (updated) => {
    const newAmount = prompt("Ubah jumlah", updated.amount);
    if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
      updated.amount = parseFloat(newAmount);
      setTransactions(
        transactions.map((t) => (t.id === updated.id ? updated : t))
      );
    }
  };

  // 🔹 Tambah Catatan
  const handleAddNote = (e) => {
    e.preventDefault();
    const noteToAdd = {
      ...newNote,
      id: Date.now(),
    };
    setNotes([...notes, noteToAdd]);
    setNewNote({ title: "", content: "", mood: "" });
  };

  // 🔹 Hapus Catatan
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // 🔹 Tambah Goals
  const handleAddGoal = (e) => {
    e.preventDefault();
    const goalToAdd = {
      ...newGoal,
      id: Date.now(),
      targetAmount: parseFloat(newGoal.targetAmount),
      saved: parseFloat(newGoal.saved),
    };
    if (!isNaN(goalToAdd.targetAmount) && !isNaN(goalToAdd.saved)) {
      setGoals([...goals, goalToAdd]);
      setNewGoal({ targetAmount: "", goalName: "", saved: "0" });
    }
  };

  // 🔹 Hapus Goals
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Laporan Keuangan */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Laporan Keuangan</h2>
        <div className="bg-white p-6 rounded shadow">
          <BarChart
            data={[
              {
                name: "Pemasukan",
                value: transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0),
              },
              {
                name: "Pengeluaran",
                value: transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0),
              },
            ]}
          />
        </div>
      </section>

      {/* Transaksi */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Transaksi</h2>
        <TransactionForm
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          onAddTransaction={handleAddTransaction}
        />

        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Tanggal</th>
                <th className="p-2">Jenis</th>
                <th className="p-2">Detail</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">{t.date}</td>
                    <td className="p-2 capitalize">{t.type}</td>
                    <td className="p-2">{t.detail}</td>
                    <td className="p-2">{t.category}</td>
                    <td
                      className={`p-2 ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"} Rp{t.amount.toLocaleString()}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() =>
                          handleEditTransaction({ ...t })
                        }
                        className="mr-2 text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(t.id)}
                        className="text-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Catatan Harian */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Catatan Harian</h2>
        <form onSubmit={handleAddNote} className="mb-6 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Judul"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Isi Catatan"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Mood Hari Ini"
              value={newNote.mood}
              onChange={(e) =>
                setNewNote({ ...newNote, mood: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              Simpan Catatan
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))
          ) : (
            <p>Belum ada catatan.</p>
          )}
        </div>
      </section>

      {/* Goals Tabungan */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Goals Tabungan</h2>
        <form onSubmit={handleAddGoal} className="mb-6 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Target Nominal"
              value={newGoal.targetAmount}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetAmount: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Nama Tujuan"
              value={newGoal.goalName}
              onChange={(e) =>
                setNewGoal({ ...newGoal, goalName: e.target.value })
              }
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Sudah Terkumpul"
              value={newGoal.saved}
              onChange={(e) =>
                setNewGoal({ ...newGoal, saved: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              Tambah Goals
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = Math.min(
              100,
              (parseFloat(goal.saved) / parseFloat(goal.targetAmount)) * 100 || 0
            );

            const onUpdateGoal = (currentGoal) => {
              const newSaved = prompt(
                "Ubah tabungan tersimpan",
                currentGoal.saved
              );
              if (newSaved !== null && !isNaN(parseFloat(newSaved))) {
                const updated = {
                  ...currentGoal,
                  saved: parseFloat(newSaved),
                };
                setGoals(
                  goals.map((g) =>
                    g.id === currentGoal.id ? updated : g
                  )
                );
              }
            };

            return (
              <GoalBar
                key={goal.id}
                goal={goal}
                percentage={percentage}
                onUpdate={() => onUpdateGoal(goal)}
                onDelete={() => handleDeleteGoal(goal.id)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}