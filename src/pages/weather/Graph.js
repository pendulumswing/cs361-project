import React from 'react';
import ReactApexChart from 'react-apexcharts';

function getParamFingerprint (location1, location2) {
  const p = {
    tempf: (location1.main.temp * 1.8 + 32),
    tempc: location1.main.temp,
    humidity: location1.main.humidity,
    pressure: location1.main.pressure,
    windspeed: location1.wind.speed,
    winddir: location1.wind.deg,
    windgust: location1.wind.gust,
    cloudiness: location1.clouds.all,
    pollen: location1.pollen,
  }

  const r = {
    tempf: (location2.main.temp * 1.8 + 32),
    tempc: location2.main.temp,
    humidity: location2.main.humidity,
    pressure: location2.main.pressure,
    windspeed: location2.wind.speed,
    winddir: location2.wind.deg,
    windgust: location2.wind.gust,
    cloudiness: location2.clouds.all,
    pollen: location2.pollen,
  }

  const q = {}
  q.other           = 0;    // Placeholder - does not render '0' index
  q.tempf           = r.tempf     - p.tempf;
  q.tempc           = r.tempc     - p.tempc;
  q.humidity        = r.humidity  - p.humidity;
  q.pressure        = r.pressure  - p.pressure;
  q.windspeed       = r.windspeed - p.windspeed;
  q.winddir         = (r.winddir   - p.winddir) % 10;
  q.windgust        = r.windgust  - p.windgust;
  q.cloudiness      = r.cloudiness && p.cloudiness ? ( r.cloudiness - p.cloudiness ) : 1;
  q.pollen          = r.pollen > 0 && p.pollen > 0 ? ( r.pollen - p.pollen ) : 0;


  return [
    q.other,
    q.tempf,
    q.tempc,
    q.humidity,
    q.pressure,
    q.windspeed,
    q.winddir,
    q.windgust,
    q.cloudiness,
    q.pollen
  ]
}

export default function Graph(props) {
  const { location1, location2 } = props;

  const categories = [
    'other',
    'temp F',
    'temp C',
    'humidity',
    'pressure',
    'wind speed',
    'wind direction',
    'wind gust',
    'cloudiness',
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
        // Temp (Blue=Cooler, Red=Warmer)
        if (dataPointIndex < 3) {
          if(value < 0) {
            return '#8DCFFF'
          }
          return '#FF8D8D'
        }
        // Humidity, Pressure (Orange)
        if (dataPointIndex >= 3 && dataPointIndex < 5) {
          // '#FF8D8D'
          return '#FF881A'
        }
        // Wind (Blue)
        if (dataPointIndex >= 5 && dataPointIndex < 8) {
          return '#8DCFFF'
        }
        // Cloudiness (Gray)
        if (dataPointIndex === 8) {
          return '#B2B2B2'
        }
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

  if (!location1 || !location2) {
    return (
      <div>

      </div>
    )
  }

  const configData = getParamFingerprint(location1, location2)

  const series = [
    {
      name: 'weather',
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

