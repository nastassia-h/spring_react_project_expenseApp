import { Box, Typography, useTheme, Tab } from "@mui/material"
import Category from "../../components/Category.jsx"
import WidgetWrapper from "../../components/WidgetWrapper.jsx"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { MoreHorizOutlined } from "@mui/icons-material"
import { categories } from "../../data/categories.js";

const ExpenseCategoriesWidget = ({ categoryList }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { palette } = useTheme();

   return (
      <WidgetWrapper>
         <Typography
            color={palette.primary.dark}
            variant="h5"
            fontWeight="500"
            sx={{
               "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
               },
               mb: "1.5rem"
            }}
            onClick={() => {
               navigate('/categories');
               navigate(0);
            }}
         >
            Expense categories
         </Typography>
         <Box display="flex" flexDirection="column" gap="1.5rem">
            {categories && (categories.slice(0, 5).map(category =>
               <Category
                  name={category.name}
                  subtitle={category.subtitle}
                  key={category.id}
                  categoryId={category.id}
                  categoryPicturePath={category.categoryPicturePath}
               />
            ))}
            <MoreHorizOutlined sx={{ color: palette.primary.dark }} style={{ alignSelf: "center" }} />
         </Box>
      </WidgetWrapper>
   )
}

export default ExpenseCategoriesWidget