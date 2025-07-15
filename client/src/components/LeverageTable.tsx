import { CheckCircle, XCircle } from "lucide-react";

const leverageData = [
  { id: 1, userAddress: '0x1234...5678', amountCollateral: 1500.25, status: true },
  { id: 2, userAddress: '0x9876...5432', amountCollateral: 2300.75, status: false },
  { id: 3, userAddress: '0xabcd...efgh', amountCollateral: 890.50, status: true },
  { id: 4, userAddress: '0x5678...1234', amountCollateral: 4200.00, status: true },
  { id: 5, userAddress: '0xfedc...ba98', amountCollateral: 1750.80, status: false },
  { id: 6, userAddress: '0x3456...7890', amountCollateral: 3100.25, status: true },
];





const LeverageTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700">
        <h3 className="text-xl font-bold text-white">Leverage Positions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount Collateral
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leverageData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {row.userAddress}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  ${row.amountCollateral.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    {row.status ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Inactive
                        </span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeverageTable;