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
import { setPosts } from "../../store/index.js";
import { categories } from "../../data/categories.js";

const AddExpenseWidget = ({ isAddOpen = false, selectedCategory }) => {
   const [expense, setExpense] = useState({ title: '', category: selectedCategory, cost: null, date: dayjs() })
   const [isOpen, setIsOpen] = useState(isAddOpen);
   //const expenses = useSelector(state => state.expenses)
   const dispatch = useDispatch()
   const { palette } = useTheme();
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   const mediumMain = palette.primary.mediumMain;

   useMemo(() => {
      setExpense({ ...expense, category: selectedCategory })
   }, [selectedCategory])

   const handlePost = async () => {
      const formData = new FormData();
      formData.append("description", post);

      axiosClient.post('/expense', formData)
         .then(({ data }) => {
            dispatch(setPosts({
               expenses: [data, ...expenses]
            }))
         })
      setTitle("")
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
            <FlexBetween gap="1rem">
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     label="Choose expense date"
                     value={expense.date}
                     onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                  />
               </LocalizationProvider>
               <InputBase
                  type="number"
                  placeholder="Cost..."
                  onChange={(e) => setExpense({ ...expense, cost: e.target.value })}
                  value={expense.cost}
                  sx={{
                     width: "80%",
                     border: `2px solid ${palette.primary.light}`,
                     borderRadius: "2rem",
                     padding: "1rem 2rem",
                  }}
               />
            </FlexBetween>
            <FormControl >
               <InputLabel id="demo-select-small-label">Category</InputLabel>
               <Select
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