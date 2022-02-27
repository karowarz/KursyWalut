import React from 'react';
import { Line } from 'react-chartjs-2';

function Chart(props) {
  const data = props.chartData;
  const name = props.name;
  return (
    <div>
      <Line
        data={{
          labels: [...props.labels],
          datasets: [
            {
              label: name,
              data: [...data],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        }}
        height={200}
      />
    </div>
  );
}

export default Chart;
