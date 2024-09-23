import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

const pieData = [
  {
    name: 'Closed',
    value: 70,
  },
  {
    name: 'Opened',
    value: 30,
  },
];

const dummySensorData = [
  {
    month: 'January',
    lightIntensity: 500,
    humidity: 40,
    doorActivity: 10,
  },
  {
    month: 'February',
    lightIntensity: 600,
    humidity: 45,
    doorActivity: 15,
  },
  {
    month: 'March',
    lightIntensity: 550,
    humidity: 50,
    doorActivity: 12,
  },
  {
    month: 'April',
    lightIntensity: 620,
    humidity: 55,
    doorActivity: 20,
  },
  {
    month: 'May',
    lightIntensity: 630,
    humidity: 52,
    doorActivity: 25,
  },
  {
    month: 'June',
    lightIntensity: 640,
    humidity: 58,
    doorActivity: 22,
  },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const lightHumidityData = useMemo(() => {
    return dummySensorData.map(({ month, lightIntensity, humidity }) => ({
      name: month.substring(0, 3),
      'Light Intensity': lightIntensity,
      Humidity: humidity,
    }));
  }, []);

  const doorActivityData = useMemo(() => {
    return pieData;
  }, []);

  const sensorScatterData = useMemo(() => {
    return dummySensorData.map(({ month, lightIntensity, humidity }) => ({
      id: month,
      lightIntensity,
      humidity,
    }));
  }, []);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="d">
        <BoxHeader title="Light Intensity vs Humidity" sideText="+3%" />
        <ResponsiveContainer>
          <LineChart
            data={lightHumidityData}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }} />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
              domain={[30, 70]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
              domain={[400, 700]}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: '0 0 10px 0' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Humidity"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Light Intensity"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="e">
        <BoxHeader title="Door Activity (Opened vs Closed)" sideText="+2%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={doorActivityData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {doorActivityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Door Status</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              70% Closed
            </Typography>
            <Typography variant="h6">Monitoring door activity throughout the day</Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Opened Door Instances</Typography>
            <Typography variant="h6">30% of the time</Typography>
            <Typography mt="0.4rem" variant="h5">
              Closed Door Instances
            </Typography>
            <Typography variant="h6">70% of the time</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="f">
        <BoxHeader title="Light Intensity vs Humidity (Scatter)" sideText="+3%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="lightIntensity"
              name="Light Intensity"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `${v} lux`}
            />
            <YAxis
              type="number"
              dataKey="humidity"
              name="Humidity"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip formatter={(v) => `${v}`} />
            <ZAxis type="number" range={[20]} />
            <Scatter name="Light vs Humidity" data={sensorScatterData} fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
