export default function TransactionForm({ newTransaction, setNewTransaction, onAddTransaction }) {
  return (
    <form onSubmit={onAddTransaction} className="mb-6 bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
        <input
          type="number"
          placeholder="Jumlah"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Detail"
          value={newTransaction.detail}
          onChange={(e) => setNewTransaction({ ...newTransaction, detail: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Kategori"
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Tambah Transaksi
        </button>
      </div>
    </form>
  );
}