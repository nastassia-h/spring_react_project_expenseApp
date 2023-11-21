import {
   AddCircle,
   CloseOutlined
} from "@mui/icons-material";
import {
   Box,
   Typography,
   InputBase,
   useTheme,
   Button,
   IconButton,
   Select,
   InputLabel,
   useMediaQuery,
   MenuItem,
   FormControl
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useState, useMemo } from "react";
import axiosClient from '../../axios-client.js'
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../data/categories.js";
import { setExpenses } from "../../store/index.js";

const AddExpenseWidget = ({ isAddOpen = false, selectedCategory = 1 }) => {
   const [expense, setExpense] = useState({ title: '', category: selectedCategory, cost: '', date: dayjs() })
   const [isOpen, setIsOpen] = useState(isAddOpen);
   const expenses = useSelector(state => state.expenses);
   const user = useSelector(state => state.user)
   const dispatch = useDispatch()
   const { palette } = useTheme();
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   const mediumMain = palette.primary.mediumMain;

   useMemo(() => {
      setExpense({ ...expense, category: selectedCategory })
   }, [selectedCategory])

   const handlePost = async () => {
      const formData = new FormData();
      formData.append("title", expense.title);
      formData.append("cost", expense.cost);
      formData.append("date", new Date(expense.date).toISOString());
      formData.append("category_id", expense.category);
      formData.append("userId", user.id);

      axiosClient.post('/expenses', formData)
         .then(({ data }) => {
            dispatch(setExpenses({
               expenses: [data, ...expenses]
            }))
         })
      setExpense({ title: '', category: selectedCategory, cost: '', date: dayjs() })
   };

   return (
      <WidgetWrapper>
         <FlexBetween pb="1.5rem">
            <Typography
               color={mediumMain}
               variant="h3"
               fontWeight="500"
            >
               Add new expense
            </Typography>
            {isOpen ?
               <IconButton
                  onClick={e => { setIsOpen(false); setExpense({}) }}
               >
                  <CloseOutlined />
               </IconButton>
               :
               <IconButton
                  onClick={e => setIsOpen(true)}
               >
                  <AddCircle />
               </IconButton>
            }
         </FlexBetween>

         <Box gap="1.5rem" display={isOpen ? "flex" : "none"} flexDirection="column">
            <InputBase
               placeholder="Title..."
               onChange={(e) => setExpense({ ...expense, title: e.target.value })}
               value={expense.title}
               sx={{
                  width: "100%",
                  border: `2px solid ${palette.primary.light}`,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
               }}
            />
            <FlexBetween gap="1rem" sx={{ flexWrap: "wrap" }}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     label="Choose expense date"
                     maxDate={dayjs()}
                     value={expense.date}
                     onChange={(e) => setExpense({ ...expense, date: e.toISOString() })}
                  />
               </LocalizationProvider>
               <FormControl>
                  <InputLabel id="demo-select-small-label">Category</InputLabel>
                  <Select
                     sx={{ minWidth: "100px" }}
                     label="Category"
                     color="primary"
                     labelId="demo-select-small-label"
                     value={expense.category}
                     onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                  >
                     {categories.map(category =>
                        <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                     )}
                  </Select>
               </FormControl>
               <InputBase
                  type="number"
                  placeholder="Cost..."
                  onChange={(e) => setExpense({ ...expense, cost: e.target.value })}
                  value={expense.cost}
                  sx={{
                     border: `2px solid ${palette.primary.light}`,
                     borderRadius: "2rem",
                     padding: "1rem 2rem",
                  }}
               />
            </FlexBetween>
            <FlexBetween>
               <Button
                  disabled={!expense.title || !expense.date || !expense.cost}
                  onClick={handlePost}
                  sx={{
                     color: palette.background.alt,
                     backgroundColor: palette.primary.main,
                     borderRadius: "3rem",
                  }}
               >
                  ADD
               </Button>
            </FlexBetween>
         </Box>
      </WidgetWrapper>
   )
}

export default AddExpenseWidget