export default function GoalBar({ goal, percentage, onUpdate, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{goal.goalName}</h3>
      <p>Target: Rp{parseFloat(goal.targetAmount).toLocaleString()}</p>
      <p>Tersimpan: Rp{parseFloat(goal.saved).toLocaleString()}</p>
      <div className="w-full bg-gray-200 h-4 rounded mt-2">
        <div className="bg-green-500 h-4 rounded" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        <button className="text-blue-600" onClick={() => onUpdate({ ...goal, saved: prompt("Ubah tabungan tersimpan", goal.saved) || goal.saved })}>
          Update
        </button>
        <button className="text-red-600" onClick={onDelete}>
          Hapus
        </button>
      </div>
    </div>
  );
}