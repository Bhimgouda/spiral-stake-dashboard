import { TrendingUp } from "lucide-react";

const tvlData = [
  { date: '2025-01-13', tvl: 45000 },
  { date: '2025-01-14', tvl: 52000 },
  { date: '2025-01-15', tvl: 68000 },
  { date: '2025-01-16', tvl: 75000 },
  { date: '2025-01-17', tvl: 82000 },
  { date: '2025-01-18', tvl: 95000 },
  { date: '2025-01-19', tvl: 102000 },
];

const TvlChart = () => {
  const maxTvl = Math.max(...tvlData.map(d => d.tvl));
  const minTvl = Math.min(...tvlData.map(d => d.tvl));
  const range = maxTvl - minTvl;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 py-10 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Total Value Locked</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-2xl font-bold text-green-600">${tvlData[tvlData.length - 1].tvl.toLocaleString()}</span>
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
            d={tvlData.map((data, index) => {
              const x = (index / (tvlData.length - 1)) * 400;
              const y = 192 - ((data.tvl - minTvl) / range) * 160;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="url(#greenGradient)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {tvlData.map((data, index) => {
            const x = (index / (tvlData.length - 1)) * 400;
            const y = 192 - ((data.tvl - minTvl) / range) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                className="hover:r-6 transition-all duration-200 cursor-pointer"
              />
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
        {tvlData.map((data, index) => (
            <div key={index} className="text-center">
              <span className="text-xs text-gray-600 font-medium">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default TvlChart;