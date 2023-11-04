import { Avatar } from "@mui/material";

const UserImage = ({ image, size = "80px" }) => {
   return (
      <Avatar sx={{ objectFit: "cover", borderRadius: "50%", backgroundColor: image ? 'transparent' : 'grey', width: `${size}`, height: `${size}` }} src={image && `http://localhost:3000/src/assets/${image}`} >
      </Avatar>
   );
};

export default UserImage;