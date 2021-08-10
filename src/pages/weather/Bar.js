import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Bar(props) {
  const { location1, location2, color, category } = props;

  const categories = [
    `${category}`
  ]

  const configData = location2 - location1

  const series = [
    {
      name: 'property',
      data: configData,
    },
  ]

  const options = {
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true  // Hides all elements of a chart other than primary paths
      }
    },
    colors: [
      function({color}) {
        return color
      }
    ],
    plotOptions: {
      bar: {
        columnWidth: '80%',
        horizontal: true,
        barHeight: '90%',
      },
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        formatter: function(value) {
          return Number.parseFloat(value).toPrecision(2)
        },
        title: {
          formatter: function (value, {dataPointIndex}) {
            return categories[dataPointIndex]
          },
        }
      },
      marker: {
        show: false
      }
    }
  }

  return (
    <div className="h-full w-full">
      <ReactApexChart
        height="100%"
        width="100%"
        options={options}
        series={series}
        type="bar"
      />
    </div>
  );
}

