import {
   ManageAccountsOutlined,
   EditOutlined,
   LocationOnOutlined,
   WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from '../../data/user'

const UserWidget = ({ userId, user }) => {
   //const currentUser = useSelector(state => state.user)
   const { palette } = useTheme();
   const navigate = useNavigate();
   const dark = palette.primary.dark;
   const medium = palette.primary.medium;
   const main = palette.primary.main;

   const currentUser = user

   if (!user) {
      return null;
   }

   const {
      firstname,
      lastname,
      location,
      occupation,
      image_path,
   } = user;

   return (
      <WidgetWrapper>
         {/* FIRST ROW */}
         <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
         >
            <FlexBetween gap="1rem">
               <UserImage image={image_path} />
               <Box>
                  <Typography
                     variant="h4"
                     color={dark}
                     fontWeight="500"
                     sx={{
                        "&:hover": {
                           color: palette.primary.light,
                           cursor: "pointer",
                        },
                     }}
                     onClick={() => navigate(`/profile/${userId}`)}
                  >
                     {firstname} {lastname}
                  </Typography>
               </Box>
            </FlexBetween>
            {user.id === currentUser.id &&
               <ManageAccountsOutlined color={dark}
                  onClick={() => navigate('/homepage/edit')}
                  sx={{
                     "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                     },
                  }}
               />
            }
         </FlexBetween>

         <Divider />

         {/* SECOND ROW */}
         <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
               <LocationOnOutlined fontSize="large" sx={{ color: main }} />
               <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
               <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
               <Typography color={medium}>{occupation}</Typography>
            </Box>
         </Box>

         <Divider />

         {/* THIRD ROW */}
         <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
               <Typography color={medium}>Number of payments this month</Typography>
               <Typography color={main} fontWeight="500">
                  {/* {viewedProfile} */}
                  386
               </Typography>
            </FlexBetween>
            <FlexBetween>
               <Typography color={medium}>Total costs</Typography>
               <Typography color={main} fontWeight="500">
                  {/* {impressions} */}
                  1279$
               </Typography>
            </FlexBetween>
         </Box>
      </WidgetWrapper>
   );
};

export default UserWidget