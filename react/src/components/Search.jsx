import React, { useEffect, useState } from 'react'
import { Search } from "@mui/icons-material"
import { InputBase, IconButton, MenuItem, Typography, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosClient from '../axios-client';
import { NavLink } from 'react-router-dom';

const ExpenseSearch = () => {
   const [searchExpense, setSearchExpense] = useState("")
   const [foundExpensies, setFoundExpensies] = useState([])
   const [isOptionsShown, setIsOptionsShown] = useState(false)
   const mode = useSelector(state => state.mode)

   const searchExpensies = async (searchExpense) => {
      if (searchExpense === "") return
      axiosClient.get(`/expense?expense_title=${searchExpense}`)
         .then(({ data }) => {
            setFoundExpensies([...data])
         })
         .catch(() => {
         })
   };

   const handleBlur = async () => {
      setTimeout(() => {
         setIsOptionsShown(false)
         setFoundExpensies([])
      }, 200)
   }

   useEffect(() => {
      searchExpensies(searchExpense)
   }, [searchExpense])

   return (
      <>
         <InputBase onFocus={() => setIsOptionsShown(true)} onBlur={handleBlur} zIndex={20} value={searchExpense} onChange={(e) => setSearchExpense(e.target.value)} sx={{ color: mode === 'dark' ? 'white' : 'black' }} placeholder='Search...'>
            <IconButton>
               <Search />
            </IconButton>
         </InputBase>
         {isOptionsShown &&
            <Box position='absolute' top='99%' left={0} width='100%' zIndex={10}
               sx={{
                  backgroundColor: '#42a5f5',
                  maxHeight: '400px',
                  overflow: 'auto',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
               }}
            >
               {foundExpensies?.map(foundExpense =>
                  <>
                     <MenuItem key={foundExpense.id}>
                        <NavLink reloadDocument={true} to={`expense/${foundExpense.id}`}>
                           <Typography color='white' style={{ textDecoration: 'none' }} fontSize='12px'>{foundExpense.title}: {foundExpense.cost}$</Typography>
                        </NavLink>
                     </MenuItem>
                     <Divider style={{ padding: 0, margin: 0 }} />
                  </>
               )}
            </Box>
         }

      </>

   )
}

export default ExpenseSearch