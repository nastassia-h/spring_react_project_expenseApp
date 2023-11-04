import { useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Tab } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import FlexBetween from "../../components/FlexBetween.jsx";

const Expense = ({ expense, onDeleteClick }) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   //const { id } = useSelector((state) => state.user);
   //const categories = useSelector((state) => state.user.category_list);

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;

   // const getCategory = async () => {
   //    axiosClient.get(`/category/${categoryId}`)
   //       .then(({ data }) => {
   //          setCategory({
   //             name: data.name,
   //             subtitle: data.subtitle,
   //             categoryPicturePath: data.imagePath
   //          })
   //       })
   //       .catch(() => {
   //       })
   // };

   // useEffect(() => {
   //    if (fetch) {
   //       getCategory(categoryId);
   //    }
   // }, [])

   if (!expense.title) return (
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
      <FlexBetween
         gap="1rem"
         pb="0.5rem"
         onClick={() => {
            navigate(`/categories#${expense.category_id}`);
            navigate(0);
         }}
         sx={{
            cursor: "pointer",
         }}
      >
         <Box>
            <Typography
               color={main}
               variant="h5"
               fontWeight="500"
            >
               {expense.title}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
               {expense.subtitle}
            </Typography>
            <Typography
               color={main}
               variant="h6"
               fontWeight="400"
            >
               {expense.cost}$
            </Typography>
            <Typography color={medium} fontSize="0.6rem">
               {expense.date}
            </Typography>
         </Box>
         <IconButton
            onClick={onDeleteClick}
         >
            <DeleteOutline color="error" />
         </IconButton>
      </FlexBetween>
   );
};

export default Expense;