import { useEffect, useState } from "react";
import { Box, Link, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../store/index.js";
import axiosClient from "../../axios-client.js";
import Expense from "./Expense.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";

const ExpensesWidget = () => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const expenses = useSelector((state) => state.expenses);
   const [loading, setLoading] = useState(false)
   const { palette } = useTheme();

   const getExpenses = async () => {
      setLoading(true)
      axiosClient.get(`/expenses?userId=${user.id}`)
         .then(({ data }) => {
            dispatch(setExpenses({ expenses: data }))
            setLoading(false)
         })
         .catch(() => {
            setLoading(false)
         })
   };

   const onDeleteClick = (expenseId) => {
      if (window.confirm('Are you sure you want to delete this expense?')) {
         axiosClient.delete(`/expenses/${expenseId}`).then(() => {
            getExpenses()
         });
      }
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
               {expenses && [...expenses].sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 5).map(expense =>
                  <Expense
                     expense={expense}
                     onDeleteClick={onDeleteClick}
                     key={expense.id}
                  />
               )}
            </Box>
            <Link href="/categories" underline="none">
               <Typography
                  color={palette.primary.mediumMain}
                  variant="h6"
                  fontWeight="400"
               >
                  Go to all...
               </Typography>
            </Link>
         </Box>
      </WidgetWrapper>
   );
};


export default ExpensesWidget