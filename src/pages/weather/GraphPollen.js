import React, {useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';

function getParamFingerprint (pollen1, pollen2) {
  const p = {
    pollen: pollen1 || 0,
  }

  const r = {
    pollen: pollen2 || 0,
  }

  const q = {}
  q.other           = 0;    // Placeholder - does not render '0' index
  q.pollen          = r.pollen - p.pollen;


  return [
    q.other,
    q.pollen
  ]
}

export default function Graph(props) {
  const { pollen1, pollen2 } = props;

  const categories = [
    'other',
    'pollen',
  ]

  const options = {
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true  // Hides all elements of a chart other than primary paths
      }
    },
    yaxis: {
      min: -10,
      max: 10
    },
    colors: [
      function({dataPointIndex, value}) {
        // Pollen (Yellow)
        return '#FFDA1A'
      }
    ],
    plotOptions: {
      bar: {
        columnWidth: '80%',
        horizontal: true,
        barHeight: '80%',
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

  if (!pollen1 || !pollen2) {
    return (
      <div>

      </div>
    )
  }

  let configData = getParamFingerprint(pollen1, pollen2)

  let series = [
    {
      name: 'pollen',
      data: configData,
    },
  ]

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

