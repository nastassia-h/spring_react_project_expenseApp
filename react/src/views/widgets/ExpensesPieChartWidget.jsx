import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ExpensesPieChartWidget() {
   const [costsData, setCostsData] = useState([]);
   const data = {
      datasets: [
         {
            data: costsData,
            label: 'Total costs',
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
   }
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
   const labels = useSelector(state => state.categories).map(category => category.name);
   const expenses = useSelector(state => state.expenses)
   data.labels = labels

   useEffect(() => {
      const totalCosts = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      expenses.forEach(expense => totalCosts[expense.category_id - 1] += expense.cost)
      setCostsData(totalCosts);
   }, [expenses.length])

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