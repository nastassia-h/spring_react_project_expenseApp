import { Box, Tab, useMediaQuery, Typography, useTheme, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import TabContext from '@mui/lab/TabContext';
import AddExpenseWidget from './widgets/AddExpenseWidget'
import { useState, SyntheticEvent, useEffect } from 'react';
import { TabList, TabPanel } from '@mui/lab';
import Expense from './widgets/Expense';
import { ExpensesPieChartWidget } from './widgets/ExpensesPieChartWidget';
import axiosClient from '../axios-client';
import { setExpenses } from '../store';

const CategoriesPage = () => {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
   const { palette } = useTheme();
   const main = palette.primary.main;
   const tabIndex = window.location.hash ? window.location.hash.replace('#', '') : '1';

   const [selectedCategory, setSelectedCategory] = useState(Number(tabIndex));
   const handleChange = (SyntheticEvent, selectedCategory) => {
      setSelectedCategory(selectedCategory);
      window.location.hash = selectedCategory;
   };
   const user = useSelector(state => state.user)
   const categories = useSelector(state => state.categories)
   const expenses = useSelector(state => state.expenses)
   const dispatch = useDispatch();
   const getExpenses = async () => {
      axiosClient.get(`/expenses?userId=${user.id}`)
         .then(({ data }) => {
            dispatch(setExpenses({ expenses: data }))
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

   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreen ? "flex" : "block"}
         gap="1rem"
         justifyContent="space-between"
      >
         <TabContext value={selectedCategory}>
            <Box flexBasis={isNonMobileScreen ? "18%" : undefined}>
               <Typography
                  color={main}
                  variant="h3"
                  fontWeight="500"
                  sx={{
                     pb: "1rem",
                     textAlign: "center"
                  }}
               >
                  Expense Categories
               </Typography>
               <TabList
                  onChange={handleChange}
                  orientation={isNonMobileScreen ? 'vertical' : 'horizontal'}
               >
                  {categories && (categories.map(category =>
                     <Tab label={category.name} key={category.id} value={category.id} />
                  ))}
               </TabList>
            </Box>
            <Box
               display={isNonMobileScreen ? "flex" : "block"}
               sx={{ width: "100%", alignItems: "flex-start", gap: "1rem" }}>
               <Box display={'flex'} flexDirection={'column'} flexBasis={isNonMobileScreen ? "80%" : undefined}
                  mt={isNonMobileScreen ? undefined : "2rem"}
               >
                  <AddExpenseWidget selectedCategory={selectedCategory} />
                  {expenses && (expenses.map(expense =>
                     <TabPanel value={expense.category_id} key={expense.id} sx={{ p: "0.75rem" }}>
                        <Expense expense={expense} onDeleteClick={onDeleteClick} />
                     </TabPanel>
                  ))}
               </Box>
               {isNonMobileScreen &&
                  <ExpensesPieChartWidget />
               }
            </Box>
         </TabContext>
      </Box>
   )
}

export default CategoriesPage