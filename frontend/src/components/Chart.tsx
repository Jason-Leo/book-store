import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Seq','Oct','Nov','Dec'
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Monthlg Revenue',
      data: labels.map(() => faker.number.int({ min: 0, max: 1200 })),
      backgroundColor: '#61da8d',
    },
  ],
};

interface ChartProps {
  labels: string[];
  values: number[];
}

export const Chart: React.FC<ChartProps> = ({ labels, values }) => {
  const chartData = {
    labels, // 使用完整的12个月标签
    datasets: [
      {
        label: 'Monthly Revenue',
        data: labels.map(() => faker.number.int({ min: 0, max: 1200 })),
        backgroundColor: '#61da8d',
      },
    ],
  };

  return <div className='w-full h-70 flex items-center justify-center'><Bar options={options} data={chartData} /></div>
}
