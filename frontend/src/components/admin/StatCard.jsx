import React from 'react';

// ✅ FIX: Tailwind JIT purges dynamic class names like bg-${color}-100
// We must use static complete class strings instead
const colorMap = {
  blue:    { bg: 'bg-blue-100',    text: 'text-blue-600' },
  green:   { bg: 'bg-green-100',   text: 'text-green-600' },
  yellow:  { bg: 'bg-yellow-100',  text: 'text-yellow-600' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  purple:  { bg: 'bg-purple-100',  text: 'text-purple-600' },
  orange:  { bg: 'bg-orange-100',  text: 'text-orange-600' },
  red:     { bg: 'bg-red-100',     text: 'text-red-600' },
};

const StatCard = ({ icon, title, value, color = 'blue' }) => {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 ${colors.bg} rounded-lg ${colors.text} shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{value ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
