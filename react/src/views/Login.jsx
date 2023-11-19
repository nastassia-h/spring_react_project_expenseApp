import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, useTheme, Link, Alert } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/index.js'
import axiosClient from '../axios-client.js'

const loginSchema = yup.object().shape({
   username: yup.string().email("invalid email").required("required"),
   password: yup.string().required("required"),
})

const initialValuesLogin = {
   username: "",
   password: "",
}

const Login = () => {

   const { palette } = useTheme()
   const dispatch = useDispatch()
   const isNonMobile = useMediaQuery("(min-width:600px)")
   const [errors, setErrors] = useState(null)

   const login = (values, onSubmitProps) => {
      setErrors(null)

      axiosClient.post('rest/api/login', values)
         .then(({ data }) => {
            dispatch(setUser({ user: data.user }))
            dispatch(setToken({ token: data.token }))
         })
         .catch(err => {
            const response = err.response;
            if (response && response.data.status !== 200) {
               console.log(response.data.message)
               setErrors(response.data.message)
            }
         })
      onSubmitProps.resetForm()
   }

   const handleFormSubmit = (values, onSubmitProps) => {
      login(values, onSubmitProps)
   }

   return (
      <>
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
         >
            {({
               values,
               errors,
               touched,
               handleBlur,
               handleSubmit,
               handleChange,
               isSubmitting,
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
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        name="username"
                        error={Boolean(touched.username) && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
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
                  </Box>
                  {/* Buttons */}
                  <Box>
                     <Button
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                           m: "2rem 0",
                           p: "1rem",
                           backgroundColor: palette.primary.main,
                           color: palette.background.alt,
                           "&:hover": { color: palette.primary.main },
                        }}
                     >
                        LOGIN
                     </Button>
                     <Link
                        href='/signup'
                        sx={{
                           textDecoration: "underline",
                           color: palette.primary.main,
                           "&:hover": {
                              cursor: "pointer",
                              color: palette.primary.light,
                           },
                        }}
                     >
                        Dont't have an account? Sing Up here
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

export default Login