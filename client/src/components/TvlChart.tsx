import { TrendingUp } from "lucide-react";
import type { Metrics } from "../types";


const TvlChart = ({ metrics }: { metrics: Metrics[] }) => {
  const maxTvl = Math.max(...metrics.map((d) => d.amountLeveraged));
  const minTvl = Math.min(...metrics.map((d) => d.amountLeveraged));
  const range = maxTvl - minTvl;

  return (
    metrics && (
      <div className="bg-white rounded-xl shadow-lg p-6 py-10 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Total Value Locked
          </h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              ${metrics[metrics.length - 1].amountLeveraged.toLocaleString()}
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
              d={metrics
                .map((data, index) => {
                  const x = (index / (metrics.length - 1)) * 400;
                  const y =
                    192 - ((data.amountLeveraged - minTvl) / range) * 160;
                  return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="url(#greenGradient)"
              strokeWidth="3"
              className="drop-shadow-sm"
            />

            {/* Data points */}
            {metrics.map((data, index) => {
              const x = (index / (metrics.length - 1)) * 400;
              const y = 192 - ((data.amountLeveraged - minTvl) / range) * 160;
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
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels */}
          {/* <div className="flex justify-between mt-2">
          {metrics.map((data, index) => (
            <div key={index} className="text-center">
              <span className="text-xs text-gray-600 font-medium">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div> */}
        </div>
      </div>
    )
  );
};

export default TvlChart;
