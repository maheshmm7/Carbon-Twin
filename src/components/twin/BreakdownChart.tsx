// src/components/twin/BreakdownChart.tsx
'use client';
const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } = require('recharts');

interface BreakdownEntry {
  name: string;
  value: number;
  color: string;
  icon: string;
}

interface BreakdownChartProps {
  data: BreakdownEntry[];
}

export default function BreakdownChart({ data }: BreakdownChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart 
        data={data} 
        layout="vertical"
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} />
        <YAxis 
          type="category" 
          dataKey="name" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false}
          width={80}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          contentStyle={{ 
            backgroundColor: '#171717', 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#ffffff'
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
