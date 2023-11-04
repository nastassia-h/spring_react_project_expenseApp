import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import FlexBetween from "./FlexBetween.jsx";
import UserImage from "./UserImage.jsx";

const Category = ({ categoryId, name, subtitle, categoryPicturePath, fetch = false }) => {

   const [category, setCategory] = useState({
      id: categoryId,
      name: name,
      subtitle: subtitle,
      categoryPicturePath: categoryPicturePath,
   })

   const dispatch = useDispatch();
   const navigate = useNavigate();
   //const { id } = useSelector((state) => state.user);
   //const categories = useSelector((state) => state.user.category_list);

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.primary.main;
   const medium = palette.primary.medium;

   const getCategory = async () => {
      axiosClient.get(`/category/${categoryId}`)
         .then(({ data }) => {
            setCategory({
               name: data.name,
               subtitle: data.subtitle,
               categoryPicturePath: data.imagePath
            })
         })
         .catch(() => {
         })
   };

   // const patchFriend = async () => {
   //    axiosClient.patch(`/user/${id}/${friendId}`)
   //       .then(({ data }) => {
   //          dispatch(setFriends({ friends: data }))
   //       })
   // };

   useEffect(() => {
      if (fetch) {
         getCategory(categoryId);
      }
   }, [])

   if (!category.name) return (
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
      <FlexBetween>
         <FlexBetween
            gap="1rem"
            onClick={() => {
               navigate(`/categories#${category.id}`);
               navigate(0);
            }}
            sx={{
               cursor: "pointer",
            }}
         >
            <UserImage image={category.categoryPicturePath} size="55px" />
            <Box>
               <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                     "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                     },
                  }}
               >
                  {category.name}
               </Typography>
               <Typography color={medium} fontSize="0.75rem">
                  {category.subtitle}
               </Typography>
            </Box>
         </FlexBetween>
      </FlexBetween>
   );
};

export default Category;