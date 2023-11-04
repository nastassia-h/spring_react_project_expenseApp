import { useEffect, useState } from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../store/index.js";
import axiosClient from "../../axios-client.js";
import Expense from "./Expense.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { expenses } from "../../data/expenses.js";

const ExpensesWidget = () => {
   const dispatch = useDispatch();
   //const expenses = useSelector((state) => state.expenses);
   const [loading, setLoading] = useState(false)
   const { palette } = useTheme();

   const getExpenses = async () => {
      setLoading(true)
      axiosClient.get(`/expense`)
         .then(({ data }) => {
            dispatch(setExpenses({ expenses: data.data }))
            setLoading(false)
         })
         .catch(() => {
            setLoading(false)
         })
   };

   const onDeleteClick = (expenseId) => {
      axiosClient.delete(`/expensee/${expenseId}`).then(() => {
         getExpenses()
      });
   }

   useEffect(() => {
      getExpenses();
   }, []);

   if (loading) return (
      <Box
         width="100%"
         textAlign="center"
      >
         <Typography
            fontWeight="bold"
            fontSize="18px"
            color="primary"
         >Loading...</Typography>
      </Box>
   )

   if (expenses.length == 0) return (
      <WidgetWrapper>
         <Box
            width="100%"
            textAlign="center"
         >
            <Typography
               fontWeight="bold"
               fontSize="18px"
               color="primary"
            >Expenses haven't been added yet...</Typography>
         </Box>
      </WidgetWrapper>
   )

   return (
      <WidgetWrapper>
         <Box display={'grid'} gap={'0.7rem'}>
            <Typography
               color={palette.primary.mediumMain}
               variant="h4"
               fontWeight="500"
            >
               Your last expenses...
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
               {expenses.map(expense =>
                  <>
                     <Expense
                        expense={expense}
                        onDeleteClick={onDeleteClick}
                     />
                     <Divider />
                  </>

               )}
            </Box>
         </Box>
      </WidgetWrapper>
   );
};


export default ExpensesWidget