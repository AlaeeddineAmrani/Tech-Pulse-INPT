import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { name: 'React', x: 85, y: 92, z: 180000, color: '#06b6d4' },
  { name: 'Vue.js', x: 72, y: 78, z: 45000, color: '#10b981' },
  { name: 'Angular', x: 68, y: 71, z: 89000, color: '#a855f7' },
  { name: 'TensorFlow', x: 91, y: 88, z: 165000, color: '#f59e0b' },
  { name: 'PyTorch', x: 89, y: 85, z: 72000, color: '#ef4444' },
  { name: 'Node.js', x: 80, y: 82, z: 98000, color: '#22d3ee' },
  { name: 'Django', x: 75, y: 76, z: 68000, color: '#84cc16' },
  { name: 'Spring Boot', x: 70, y: 74, z: 55000, color: '#8b5cf6' },
  { name: 'Next.js', x: 88, y: 90, z: 110000, color: '#06b6d4' },
  { name: 'Svelte', x: 78, y: 81, z: 68000, color: '#f43f5e' },
  { name: 'FastAPI', x: 82, y: 79, z: 62000, color: '#10b981' },
  { name: 'Express', x: 76, y: 77, z: 59000, color: '#a855f7' },
];

function BubbleChart() {
  return (
    <div className="relative w-full h-full">
      <div />

      <ResponsiveContainer width="100%" height="100%" position="relative">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            {mockData.map((entry, index) => (
              <radialGradient key={index} id={`gradient-${index}`}>
                <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0.2} />
              </radialGradient>
            ))}
          </defs>

          <XAxis
            type="number"
            dataKey="x"
            name="Activity Score"
            stroke="currentColor"
            strokeOpacity={0.2}
            tick={{ fontSize: 12 }}
            domain={[60, 100]}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Community Health"
            stroke="currentColor"
            strokeOpacity={0.2}
            tick={{ fontSize: 12 }}
            domain={[60, 100]}
          />
          <ZAxis
            type="number"
            dataKey="z"
            range={[400, 4000]}
            name="Stars"
          />

          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-xl">
                    <p className="font-semibold mb-1">{data.name}</p>
                    <p className="text-xs text-muted-foreground">Activity: {data.x}</p>
                    <p className="text-xs text-muted-foreground">Health: {data.y}</p>
                    <p className="text-xs text-muted-foreground">Stars: {data.z.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Scatter data={mockData} fill="#8884d8">
            {mockData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                stroke={entry.color}
                strokeWidth={2}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {mockData.map((entry, index) => {
        const x = ((entry.x - 60) / 40) * 100;
        const y = 100 - ((entry.y - 60) / 40) * 100;

        return (
          <div
            key={index}
            className="absolute text-xs font-medium pointer-events-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              color: entry.color,
              textShadow: `0 0 10px ${entry.color}40`,
            }}
          >
            {entry.name}
          </div>
        );
      })}
    </div>
  );
}


export default BubbleChart;