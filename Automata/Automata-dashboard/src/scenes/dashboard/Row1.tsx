import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, Legend, LineChart, BarChart, Bar } from 'recharts';

const dummySensorData = [
  {
    monthlyData: [
      { month: 'January', temperature: 22, airQuality: 85, energyWastage: 120, co2: 400 },
      { month: 'February', temperature: 23, airQuality: 80, energyWastage: 110, co2: 420 },
      { month: 'March', temperature: 24, airQuality: 78, energyWastage: 100, co2: 430 },
      { month: 'April', temperature: 25, airQuality: 75, energyWastage: 90, co2: 410 },
      { month: 'May', temperature: 26, airQuality: 72, energyWastage: 95, co2: 440 },
      { month: 'June', temperature: 27, airQuality: 70, energyWastage: 88, co2: 450 },
      { month: 'July', temperature: 28, airQuality: 65, energyWastage: 85, co2: 460 },
      { month: 'August', temperature: 29, airQuality: 68, energyWastage: 80, co2: 470 },
      { month: 'September', temperature: 30, airQuality: 60, energyWastage: 78, co2: 480 },
      { month: 'October', temperature: 31, airQuality: 55, energyWastage: 75, co2: 490 },
    ],
  },
];

const Row1 = () => {
  const { palette } = useTheme();

  const temperatureAirQuality = useMemo(() => {
    return (
      dummySensorData[0].monthlyData.map(({ month, temperature, airQuality }) => ({
        name: month.substring(0, 3),
        temperature,
        airQuality,
      }))
    );
  }, []);

  const energyWastage = useMemo(() => {
    return (
      dummySensorData[0].monthlyData.map(({ month, energyWastage }) => ({
        name: month.substring(0, 3),
        energyWastage,
      }))
    );
  }, []);

  const co2Levels = useMemo(() => {
    return (
      dummySensorData[0].monthlyData.map(({ month, co2 }) => ({
        name: month.substring(0, 3),
        co2,
      }))
    );
  }, []);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="a">
        <BoxHeader title="Temperature and Air Quality" subtitle="Sensor Data" sideText="-2%" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={temperatureAirQuality}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAirQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.secondary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temperature"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorTemperature)"
            />
            <Area
              type="monotone"
              dataKey="airQuality"
              dot={true}
              stroke={palette.secondary.main}
              fillOpacity={1}
              fill="url(#colorAirQuality)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="b">
        <BoxHeader title="Energy Wastage" subtitle="Sensor Data" sideText="+3%" />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={energyWastage}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorEnergyWastage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.tertiary[300]} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.tertiary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
            <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
            <Tooltip />
            <Bar dataKey="energyWastage" fill="url(#colorEnergyWastage)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="c">
        <BoxHeader title="Carbon Dioxide Levels" subtitle="Sensor Data" sideText="+1%" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={co2Levels}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: '0 0 10px 0' }} />
            <Line
              type="monotone"
              dataKey="co2"
              stroke={palette.error.main}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
