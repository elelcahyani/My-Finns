export default function BarChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">Data belum tersedia</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="h-64 flex items-end space-x-4">
      {data.map((bar, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className={`w-full rounded-t ${bar.name === "Pemasukan" ? "bg-green-500" : "bg-red-500"}`}
            style={{ height: `${(bar.value / maxValue) * 100}%` }}
          ></div>
          <span className="text-xs mt-1">{bar.name}</span>
        </div>
      ))}
    </div>
  );
}