import { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween.jsx";

const Expense = ({ expense, onDeleteClick }) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;

   const {
      id,
      title,
      date,
      cost,
      category_id
   } = expense

   if (!title) return (
      <Box
         width="100%"
         textAlign="center"
      >
         <Typography
            fontSize="14px"
         >Loading...</Typography>
      </Box>
   )

   return (
      <>
         <FlexBetween
            gap="1rem"
            pb="0.5rem"
            sx={{
               cursor: "pointer",
            }}
         >
            <Box
               onClick={() => {
                  navigate(`/categories#${category_id}`);
                  navigate(0);
               }}
            >
               <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
               >
                  {title}
               </Typography>
               <Typography
                  color={main}
                  variant="h6"
                  fontWeight="400"
               >
                  {cost}$
               </Typography>
               <Typography color={medium} fontSize="0.6rem">
                  {new Date(date).toDateString()}
               </Typography>
            </Box>
            <IconButton
               onClick={e => onDeleteClick(id)}
            >
               <DeleteOutline color="error" />
            </IconButton>
         </FlexBetween>
         <Divider />
      </>
   );
};

export default Expense;