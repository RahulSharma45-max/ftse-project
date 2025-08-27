import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, AreaChart, ReferenceLine } from 'recharts';

// Mock FTSE 100 data with technical indicators for demonstration
// BACKEND INTEGRATION: Replace this mock data with API call
// Expected API endpoint: GET /api/stocks/ftse100/data?period=1d&indicators=sma,rsi
// API Response format should match this structure:
const mockData = [
  { 
    time: '09:00', 
    price: 7450, 
    sma: 7445,      // Simple Moving Average (20-period default)
    rsi: 55.2       // Relative Strength Index (14-period default)
  },
  { 
    time: '10:00', 
    price: 7465, 
    sma: 7450, 
    rsi: 58.7 
  },
  { 
    time: '11:00', 
    price: 7440, 
    sma: 7448, 
    rsi: 45.3 
  },
  { 
    time: '12:00', 
    price: 7475, 
    sma: 7452, 
    rsi: 62.1 
  },
  { 
    time: '13:00', 
    price: 7490, 
    sma: 7458, 
    rsi: 68.4 
  },
  { 
    time: '14:00', 
    price: 7485, 
    sma: 7462, 
    rsi: 65.9 
  },
  { 
    time: '15:00', 
    price: 7505, 
    sma: 7468, 
    rsi: 72.3 
  },
  { 
    time: '16:00', 
    price: 7520, 
    sma: 7475, 
    rsi: 75.1 
  },
];

// BACKEND INTEGRATION: API call function example
// const fetchStockData = async (symbol = 'FTSE100', period = '1d') => {
//   try {
//     const response = await fetch(`/api/stocks/${symbol}/data?period=${period}&indicators=sma,rsi`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//     return mockData; // Fallback to mock data
//   }
// };

const StockGraph = () => {
  // BACKEND INTEGRATION: Replace mockData with API call
  // Example: const [stockData, setStockData] = useState(mockData);
  // useEffect(() => {
  //   fetchStockData().then(setStockData);
  // }, []);

  const currentPrice = mockData[mockData.length - 1].price;
  const previousPrice = mockData[mockData.length - 2].price;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);
  
  // Current technical indicator values for display
  const currentSMA = mockData[mockData.length - 1].sma;
  const currentRSI = mockData[mockData.length - 1].rsi;

  // Custom tooltip to show all indicators
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="text-sm font-medium text-foreground">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value?.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="financial-card bg-white">
        {/* Header with current price and indicators */}
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
          
          {/* Technical Indicators Summary */}
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">SMA(20): </span>
              <span className="font-medium text-foreground">{currentSMA.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">RSI(14): </span>
              <span className={`font-medium ${currentRSI > 70 ? 'text-red-600' : currentRSI < 30 ? 'text-green-600' : 'text-foreground'}`}>
                {currentRSI.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Price & SMA Chart */}
        <div className="space-y-4">
          <div className="h-80 w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Price & Moving Average</h3>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                <Tooltip content={<CustomTooltip />} />
                
                {/* Main price line */}
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name="Price"
                  stroke="hsl(213 89% 37%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(213 89% 37%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(213 89% 37%)', strokeWidth: 2 }}
                />
                
                {/* SMA line */}
                <Line 
                  type="monotone" 
                  dataKey="sma" 
                  name="SMA(20)"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 4, stroke: '#f97316', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* RSI Chart */}
          <div className="h-32 w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">RSI (Relative Strength Index)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  fontSize={10}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={10}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value: any) => [`${value?.toFixed(1)}`, 'RSI']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                
                {/* RSI overbought level (70) */}
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="2 2" />
                {/* RSI oversold level (30) */}
                <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="2 2" />
                
                {/* RSI area */}
                <Area 
                  type="monotone" 
                  dataKey="rsi" 
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Statistics - Updated to include technical indicators */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6 pt-6 border-t border-border">
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
          {/* New technical indicator statistics */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">SMA(20)</div>
            <div className="text-lg font-semibold text-foreground">{currentSMA.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">RSI(14)</div>
            <div className={`text-lg font-semibold ${currentRSI > 70 ? 'text-red-600' : currentRSI < 30 ? 'text-green-600' : 'text-foreground'}`}>
              {currentRSI.toFixed(1)}
            </div>
          </div>
        </div>
        
        {/* BACKEND INTEGRATION NOTES */}
        {/* 
        To connect this component to your backend:
        
        1. API Endpoint Structure:
           GET /api/stocks/{symbol}/data?period={period}&indicators=sma,rsi
           
        2. Expected Response Format:
           {
             "data": [
               {
                 "time": "09:00",
                 "price": 7450.50,
                 "sma": 7445.25,
                 "rsi": 55.2
               },
               ...
             ],
             "metadata": {
               "symbol": "FTSE100",
               "period": "1d",
               "last_updated": "2024-01-15T16:00:00Z"
             }
           }
           
        3. Implementation Steps:
           - Replace mockData with useState hook
           - Add useEffect to fetch data on component mount
           - Add loading and error states
           - Implement real-time updates using WebSocket or polling
           
        4. Technical Indicator Parameters:
           - SMA: Simple Moving Average (default 20 periods)
           - RSI: Relative Strength Index (default 14 periods, range 0-100)
           - RSI > 70: Overbought (potentially sell signal)
           - RSI < 30: Oversold (potentially buy signal)
           
        5. Error Handling:
           - Network errors: Show fallback message
           - Invalid data: Validate response structure
           - Missing indicators: Handle partial data gracefully
        */}
      </div>
    </div>
  );
};

export default StockGraph;