import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Box, Typography, useMediaQuery } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
   labels: ['Housing', 'Utilities', 'Food', 'Transportation', 'Insurance', 'Healthcare', 'Saving/Investing', 'Recreation', 'Personal spending'],
   datasets: [
      {
         label: 'Total costs',
         data: [12, 19, 3, 5, 2, 3, 0, 0, 0],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1,
      },
   ],
};

export function ExpensesPieChartWidget() {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
   return (
      <WidgetWrapper mt={isNonMobileScreen ? undefined : "2rem"}>
         <Box>
            <Typography
               fontWeight="bold"
               fontSize="18px"
               color="primary"
            >Expenses costs chart</Typography>
            <Pie data={data} />
         </Box>
      </WidgetWrapper>
   )
}