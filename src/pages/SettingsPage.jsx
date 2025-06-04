export default function SettingsPage({ currentUser, onLogout }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Pengaturan Akun</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 border rounded">
          <span>Aktifkan Notifikasi</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-11 h-6 bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between items-center p-4 border rounded">
          <span>Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between items-center p-4 border rounded">
          <span>Sinkronisasi dengan Akun Lain</span>
          <button className="text-blue-600">Konfigurasi</button>
        </div>
        <div className="pt-4">
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded mr-2">Logout</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Hapus Akun</button>
        </div>
      </div>
    </div>
  );
}