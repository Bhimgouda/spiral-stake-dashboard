import { Users } from "lucide-react";

const usersData = [
  { date: "2025-01-13", users: 1200 },
  { date: "2025-01-14", users: 1800 },
  { date: "2025-01-15", users: 2400 },
  { date: "2025-01-16", users: 3200 },
  { date: "2025-01-17", users: 2800 },
  { date: "2025-01-18", users: 3600 },
  { date: "2025-01-19", users: 4100 },
];

const UsersChart = () => {
  const maxUsers = Math.max(...usersData.map((d) => d.users));
  const minUsers = Math.min(...usersData.map((d) => d.users));
  const range = maxUsers - minUsers;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 py-10 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Number of Users</h3>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">
            {usersData[usersData.length - 1].users}
          </span>
        </div>
      </div>

      <div className="relative h-48 mt-4">
        <svg className="w-full h-full" viewBox="0 0 400 192">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 48}
              x2="400"
              y2={i * 48}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Line path */}
          <path
            d={usersData
              .map((data, index) => {
                const x = (index / (usersData.length - 1)) * 400;
                const y = 192 - ((data.users - minUsers) / range) * 160;
                return `${index === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="url(#blueGradient)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {usersData.map((data, index) => {
            const x = (index / (usersData.length - 1)) * 400;
            const y = 192 - ((data.users - minUsers) / range) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all duration-200 cursor-pointer"
              />
            );
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {usersData.map((data, index) => (
            <div key={index} className="text-center">
              <span className="text-xs text-gray-600 font-medium">
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersChart;
