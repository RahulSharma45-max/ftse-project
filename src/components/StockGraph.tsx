import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock FTSE 100 data for demonstration
const mockData = [
  { time: '09:00', price: 7450 },
  { time: '10:00', price: 7465 },
  { time: '11:00', price: 7440 },
  { time: '12:00', price: 7475 },
  { time: '13:00', price: 7490 },
  { time: '14:00', price: 7485 },
  { time: '15:00', price: 7505 },
  { time: '16:00', price: 7520 },
];

const StockGraph = () => {
  const currentPrice = mockData[mockData.length - 1].price;
  const previousPrice = mockData[mockData.length - 2].price;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="financial-card bg-white">
        {/* Header with current price */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">FTSE 100 Index</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">{currentPrice.toLocaleString()}</div>
              <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange}%)
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">London Stock Exchange • Real-time data</p>
        </div>

        {/* Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(213 89% 37%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(213 89% 37%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(213 89% 37%)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Day High</div>
            <div className="text-lg font-semibold text-foreground">7,525</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Day Low</div>
            <div className="text-lg font-semibold text-foreground">7,435</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="text-lg font-semibold text-foreground">1.2M</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-lg font-semibold text-foreground">£2.1T</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockGraph;