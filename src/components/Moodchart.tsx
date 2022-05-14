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
  Scatter, Legend,
} from 'recharts';

// custom tooltip for chart

function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className='custom-tooltip' style={{ background: "#393939", padding: 5, maxWidth: 200, wordBreak: "break-word" }}>
        <p className='label'>{`MOODZ: ${payload[0]!?.value}`}</p>
        <p className='label'>{`DATE: ${label}`}</p>

        <p className='desc'>{payload[0]!?.payload?.note}</p>
      </div>
    );
  }

  return null;
}

const trendLineShape: any = () => {
  return "";
};


const Moodchart: any = (props: any) => {


  return (
    <Card style={props.style}>
      <ResponsiveContainer height={"100%"} >
        <ComposedChart data={props.moodz}

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
            fill={props.secondaryColor}
            strokeWidth="4"
          />
          <Line
            type="monotone"
            dataKey="moodLevel"
            stroke={props.primaryColor}
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