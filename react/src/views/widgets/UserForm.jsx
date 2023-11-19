import { useState, useEffect } from 'react'
import { Box, Button, TextField, useMediaQuery, Stack, Typography, useTheme, Alert, Avatar } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import axiosClient from '../../axios-client.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/index.js'

const registerSchema = yup.object().shape({
   firstname: yup.string().required("required"),
   lastname: yup.string().required("required"),
   email: yup.string().email("invalid email").required("required"),
   location: yup.string().required("required"),
   occupation: yup.string().required("required")
})

const UserForm = () => {
   const currentUser = useSelector(state => state.user)
   const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
   const { palette } = useTheme()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)
   const [updatedUser, setUpdatedUser] = useState({
      ...currentUser,
      image: null,
   })

   const update = (values) => {
      setErrors(null)
      const payload = { ...values }

      if (payload.email) {
         payload.username = payload.email;
      }

      payload.id = currentUser.id;

      axiosClient.put(`/user/${currentUser.id}`, payload)
         .then(({ data }) => {
            dispatch(setUser({ user: data }))
            navigate('/homepage')
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
               setErrors(response.data.errors)
            }
         })
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      update(values, onSubmitProps)
   }

   return (
      <Box width={isNonMobileScreen ? "50%" : "95%"} p="1rem" m="1.5rem auto" borderRadius="1.5rem" textAlign={'center'}>
         <>
            <Formik
               onSubmit={handleFormSubmit}
               initialValues={updatedUser}
               validationSchema={registerSchema}
            >
               {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
               }) => (
                  <form onSubmit={handleSubmit} method="POST">
                     <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                           "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                     >
                        <TextField
                           label="First Name"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.firstname}
                           name="firstname"
                           error={Boolean(touched.firstname) && Boolean(errors.firstname)}
                           helperText={touched.firstname && errors.firstname}
                           sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                           label="Last Name"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.lastname}
                           name="lastname"
                           error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                           helperText={touched.lastname && errors.lastname}
                           sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                           label="Location"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.location}
                           name="location"
                           error={Boolean(touched.location) && Boolean(errors.location)}
                           helperText={touched.location && errors.location}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                           label="Occupation"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.occupation}
                           name="occupation"
                           error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                           helperText={touched.occupation && errors.occupation}
                           sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                           label="Email"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.email}
                           name="email"
                           error={Boolean(touched.email) && Boolean(errors.email)}
                           helperText={touched.email && errors.email}
                           sx={{ gridColumn: "span 4" }}
                        />
                     </Box>
                     {/* Buttons */}
                     <Box
                        display='flex'
                        justifyContent={'flex-end'}
                        gap='20px'
                     >
                        <Button
                           type="submit"
                           sx={{
                              width: '100px',
                              m: "2rem 0",
                              p: "1rem",
                              backgroundColor: palette.primary.main,
                              color: palette.background.alt,
                              "&:hover": { color: palette.primary.main },
                           }}
                        >
                           Save
                        </Button>
                        <Button
                           onClick={() => navigate('/homepage')}
                           variant="outlined"
                           color="error"
                           sx={{
                              width: '100px',
                              m: "2rem 0",
                              p: "1rem",
                           }}
                        >
                           Cancel
                        </Button>
                     </Box>
                  </form>
               )}
            </Formik>
            &nbsp;
            {errors && <Alert variant="outlined" severity="error">
               {Object.keys(errors).map(key =>
                  <p key={key}>{errors[key][0]}</p>
               )}
            </Alert>}
         </>
      </Box>
   )
}

export default UserForm