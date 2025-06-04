export default function NoteCard({ note, onDelete }) {
  return (
    <div key={note.id} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{note.title}</h3>
      <p>{note.content}</p>
      <p className="text-sm text-gray-500 mt-2">Mood: {note.mood}</p>
      <div className="mt-2 flex justify-end space-x-2">
        <button className="text-blue-600">Edit</button>
        <button onClick={onDelete} className="text-red-600">Hapus</button>
      </div>
    </div>
  );
}