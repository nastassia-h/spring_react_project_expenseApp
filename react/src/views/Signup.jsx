import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Link, Alert, Avatar, Stack } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import axiosClient from '../axios-client.js'
import { setToken, setUser } from '../store'

const registerSchema = yup.object().shape({
   firstname: yup.string().required("required"),
   lastname: yup.string().required("required"),
   email: yup.string().email("invalid email").required("required"),
   password: yup.string().required("required"),
   confirmPassword: yup.string().required("required"),
   location: yup.string().required("required"),
   occupation: yup.string().required("required")
})

const initialValuesRegister = {
   firstname: "",
   lastname: "",
   email: "",
   password: "",
   confirmPassword: "",
   location: "",
   occupation: "",
}

const Signup = () => {
   const { palette } = useTheme()
   const dispatch = useDispatch()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)

   const register = (values, onSubmitProps) => {
      setErrors(null)
      const formData = new FormData()
      for (let value in values) {
         formData.append(value, values[value])
      }
      formData.append('username', values['email'])

      axiosClient.post('rest/api/registration', formData)
         .then(({ data }) => {
            dispatch(setUser({ user: data.user }))
            dispatch(setToken({ token: data.token }))
         })
         .catch(err => {
            const response = err.response;
            if (response && response.status !== 200) {
               console.log(response.data.message)
               setErrors(response.data.message)
            }
         })

      onSubmitProps.resetForm()
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      register(values, onSubmitProps)
   }

   return (
      <>
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
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
               resetForm,
            }) => (
               <form onSubmit={handleSubmit}>
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
                     <TextField
                        label="Password"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 4" }}
                     />
                     <TextField
                        label="Password Comfirmation"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 4" }}
                     />
                  </Box>
                  {/* Buttons */}
                  <Box>
                     <Button
                        fullWidth
                        type="submit"
                        sx={{
                           m: "2rem 0",
                           p: "1rem",
                           backgroundColor: palette.primary.main,
                           color: palette.background.alt,
                           "&:hover": { color: palette.primary.main },
                        }}
                     >
                        REGISTER
                     </Button>
                     <Link
                        href='/login'
                        sx={{
                           textDecoration: "underline",
                           color: palette.primary.main,
                           "&:hover": {
                              cursor: "pointer",
                              color: palette.primary.light,
                           },
                        }}
                     >
                        Already have an account? Login here
                     </Link>
                  </Box>
               </form>
            )}
         </Formik>
         &nbsp;
         {errors && <Alert variant="outlined" severity="error">
            {/* {Object.keys(errors).map(key => */}
            <p>{errors}</p>
            {/* )} */}
         </Alert>}
      </>
   )
}

export default Signup