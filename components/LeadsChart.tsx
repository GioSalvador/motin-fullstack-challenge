'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export default function LeadsChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-[260px] md:h-[320px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid stroke="#1f1f1f" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            stroke="#888"
            tick={{ fontSize: 10 }}
            tickMargin={8}
            interval="preserveStartEnd"
          />

          <YAxis
            stroke="#888"
            tick={{ fontSize: 10 }}
            tickMargin={8}
            width={30}
          />

          <Tooltip
            wrapperStyle={{ outline: 'none' }}
            contentStyle={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              padding: '8px 10px',
            }}
            labelStyle={{ color: '#aaa', fontSize: 11 }}
            itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}