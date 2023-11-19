import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
               'rgba(100, 100, 100, 0.2)',
               'rgba(100, 255, 100, 0.2)',
               'rgba(100, 255, 170, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(100, 100, 100, 1)',
               'rgba(100, 255, 100, 1)',
               'rgba(100, 255, 170, 1)'
            ],
            borderWidth: 1,
         },
      ],
   }
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
   const labels = useSelector(state => state.categories).map(category => category.name);
   const expenses = useSelector(state => state.expenses)
   data.labels = labels
   const [date, setDate] = useState(dayjs());

   const checkDate = (expenseDate) => {
      let startDate = new Date(expenseDate)
      let endDate = new Date(date)
      let monthDiff = endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
      console.log(monthDiff);
      return monthDiff == 0;
   }

   useEffect(() => {
      const totalCosts = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      let filteredExpenses = expenses.filter(expense => checkDate(expense.date))
      console.log(expenses)
      filteredExpenses.forEach(expense => totalCosts[expense.category_id - 1] += expense.cost)
      setCostsData(totalCosts);
   }, [expenses.length, date])

   return (
      <WidgetWrapper mt={isNonMobileScreen ? undefined : "2rem"}>
         <Box textAlign={"center"}>
            <Typography
               fontWeight="bold"
               fontSize="18px"
               color="primary"
               pb={"1rem"}
            >Expenses costs chart</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
                  views={['month', 'year']}
                  maxDate={dayjs()}
                  label="Choose month"
                  value={date}
                  onChange={(e) => setDate(e.toISOString())}
                  sx={{
                     '.MuiInputBase-root': {
                        borderRadius: 16,
                     },
                     'pb': "1rem"
                  }}
               />
            </LocalizationProvider>
            <Pie data={data} />
         </Box>
      </WidgetWrapper>
   )
}