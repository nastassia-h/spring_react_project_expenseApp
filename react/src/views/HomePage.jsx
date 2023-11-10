import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from './widgets/UserWidget'
import AddExpenseWidget from './widgets/AddExpenseWidget'
import ExpensesWidget from './widgets/ExpensesWidget'
import ExpenseCategoriesWidget from './widgets/ExpenseCategoriesWidget'
import { user } from '../data/user.js'
import { ExpensesPieChartWidget } from './widgets/ExpensesPieChartWidget.jsx'

const HomePage = () => {
   const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
   //const user = useSelector(state => state.user)

   return (
      <Box
         width="100%"
         padding="2rem 6%"
         display={isNonMobileScreen ? "flex" : "block"}
         gap="1rem"
         justifyContent="space-between"
      >
         <Box flexBasis={isNonMobileScreen ? "26%" : undefined} gap={'1rem'} display={'flex'} flexDirection={'column'}>
            <UserWidget userId={user.id} user={user} />
            {isNonMobileScreen && (
               <ExpensesPieChartWidget />
            )}

         </Box>
         <Box display={'flex'} gap={'1rem'} flexDirection={'column'} flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "1rem"}
         >
            <AddExpenseWidget isAddOpen />
            <ExpensesWidget />
         </Box>
         <Box flexBasis="26%" mt={isNonMobileScreen ? undefined : '1rem'}>
            <ExpenseCategoriesWidget categoryList={user.category_list} />
         </Box>
      </Box>
   )
}

export default HomePage