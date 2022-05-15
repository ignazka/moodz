import React from 'react';
import Card from '@mui/material/Card';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  Scatter,
  Legend
} from 'recharts';
import { useTheme } from '@mui/material/styles'
import { dark } from '@mui/material/styles/createPalette';

// custom tooltip for chart

function CustomTooltip({ payload, label, active }: any) {
  const theme = useTheme()


  if (active) {
    return (
      <div className='custom-tooltip' style={theme.palette.mode === 'dark' ? {
        backgroundColor: "#393939", padding: 5, maxWidth: 200, wordBreak: "break-word"
      } : {
        backgroundColor: "#eeeee", color: "#393939", padding: 5, maxWidth: 200, wordBreak: "break-word"
      }
      }
      >
        <p className='label'>{`MOODZ: ${payload[0]!?.value}`}</p>
        <p className='label'>{`DATE: ${label} `}</p>

        <p className='desc'>{payload[0]!?.payload?.note}</p>
      </div >
    );
  }

  return null;
}

const trendLineShape: any = () => {
  return "";
};


function Moodchart({ style, moodz }: any) {
  const theme = useTheme()

  return (
    <Card style={style}>
      <ResponsiveContainer height={"100%"} >
        <ComposedChart data={moodz}

          style={{ marginLeft: "-25px" }}>
          <CartesianGrid />
          <XAxis dataKey='name' />
          <YAxis
            // label={{ value: 'moodz Level', angle: -90 }}
            type='number'
            domain={[-10, 10]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            name="TREND"
            dataKey="moodLevel"
            legendType="line"
            lineType='fitting'
            line
            shape={trendLineShape}
            fill={
              theme.palette.secondary.main}
            strokeWidth="4"
          />
          <Line
            type="monotone"
            dataKey="moodLevel"
            stroke={theme.palette.primary.main}
            strokeWidth="1"
            activeDot={{ r: 4 }}
            name="MOOD LEVEL"
            legendType='circle'
            dot={{ r: 1 }}
          />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Moodchart;