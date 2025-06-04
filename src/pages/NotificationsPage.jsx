export default function NotificationsPage({ currentUser, onLogout }) {
  const notifications = [
    { id: 1, message: "Anda belum menambahkan transaksi hari ini.", time: "10:00 AM" },
    { id: 2, message: "Deadline tabungan Anda tinggal 7 hari lagi!", time: "Yesterday" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Notifikasi</h2>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-4 border rounded shadow-sm">
            <p>{notif.message}</p>
            <small className="text-gray-500">{notif.time}</small>
          </div>
        ))}
        {notifications.length === 0 && <p className="text-gray-500">Belum ada notifikasi.</p>}
      </div>
    </div>
  );
}