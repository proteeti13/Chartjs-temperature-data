

import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, LineController, Chart, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, TimeScale);

const generateData = (startDate, endDate) => {
  let dataPoints = [];
  let timeLabels = [];
  const fiveMinutesInMilliseconds = 5 * 60 * 1000; // 5 minutes

  // Generate initial temperature
  let temperature = Math.random() * (30 - (-10)) + (-10);

  for (let date = new Date(startDate); date <= endDate; date.setTime(date.getTime() + fiveMinutesInMilliseconds)) {
    // Generate random noise
    const noise = Math.random() * 4 - 2; // Random noise between -2 and 2

    // Apply the noise to the temperature
    temperature += noise;

    // Clip temperature to be within -10 and 30
    temperature = Math.max(-10, Math.min(temperature, 30));

    dataPoints.push(temperature);
    timeLabels.push(new Date(date));
  }

  return {
    labels: timeLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dataPoints,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };
};

const ChartComponent = () => {
  let currentDate = new Date();
  let twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
  
  let startDate = new Date(currentDate.getTime() - twoDaysInMilliseconds);
  let endDate = new Date(currentDate.getTime() + twoDaysInMilliseconds);

  // Set time to 00:00:00 for the start date and 23:59:59 for the end date
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  let data = generateData(startDate, endDate);

  return (
    <Line 
      data={data}
      options={{
        scales: {
          x: {
            type: 'time',
            title: {
              display: true,
              text: 'Date'
            },
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM d'
              },
              min: startDate,
              max: endDate
            }
          },
          y: {
            min: -15,
            max: 35,
            stepSize: 5,
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }}
    />
  );
};

export default ChartComponent;