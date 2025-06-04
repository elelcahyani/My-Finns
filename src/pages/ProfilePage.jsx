export default function ProfilePage({ currentUser, onLogout }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Profil Pengguna</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img src="https://placehold.co/100x100"  alt="Foto Profil" className="rounded-full w-20 h-20" />
          <div>
            <h3 className="font-medium">Username: {currentUser?.email.split("@")[0]}</h3>
            <p>Email: {currentUser?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" defaultValue="John Doe" className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input type="tel" defaultValue="+628123456789" className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <input type="text" defaultValue="Jakarta, Indonesia" className="border p-2 w-full rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" defaultValue="••••••••" disabled className="border p-2 w-full rounded bg-gray-100" />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Perubahan</button>
        <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}