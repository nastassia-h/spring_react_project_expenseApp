import { Box, Tab, useMediaQuery, Typography, useTheme, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import TabContext from '@mui/lab/TabContext';
import AddExpenseWidget from './widgets/AddExpenseWidget'
import { useState, SyntheticEvent } from 'react';
import { TabList, TabPanel } from '@mui/lab';
import Expense from './widgets/Expense';
import { categories } from '../data/categories';
import { expenses } from '../data/expenses';

const CategoriesPage = () => {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
   const { palette } = useTheme();
   const main = palette.primary.main;
   const tabIndex = window.location.hash.replace('#', '');

   const [selectedCategory, setSelectedCategory] = useState(Number(tabIndex));
   const handleChange = (SyntheticEvent, selectedCategory) => {
      setSelectedCategory(selectedCategory);
      window.location.hash = selectedCategory;
   };
   //const user = useSelector(state => state.user)

   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreen ? "flex" : "block"}
         gap="0.5rem"
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
            <Box display={'flex'} flexDirection={'column'} gap={'2rem'} flexBasis={isNonMobileScreen ? "77%" : undefined}
               mt={isNonMobileScreen ? undefined : "2rem"}
            >
               <AddExpenseWidget selectedCategory={selectedCategory} />
               {expenses && (expenses.map(expense =>
                  <TabPanel value={expense.id}>
                     <Expense expense={expense} />
                     <Divider />
                  </TabPanel>
               ))}
               {/* <ExpensiesWidget userId={user.id} /> */}
            </Box>
         </TabContext>
      </Box>
   )
}

export default CategoriesPage