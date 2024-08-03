import React from 'react';
import { Box, Button, TextField, Typography, useTheme, Snackbar, Alert } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    warna: '',
    ukuran: '',
    harga: '',
    stok: '',
};

const validationSchema = yup.object().shape({
    warna: yup.string().required("Warna is required"),
    ukuran: yup.string().required("Ukuran is required"),
    harga: yup.number().required("Harga is required").positive("Harga must be a positive number"),
    stok: yup.number().required("Stok is required").integer("Stok must be an integer"),
});

const ShirtInput = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleInputSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await fetch('http://localhost:5001/shirts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSnackbarMessage('Data submitted successfully');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error('Failed to submit data:', error);
            setErrors({ api: 'Failed to submit data. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: isNonMobile ? '2rem 6rem' : '2rem',
                boxSizing: 'border-box',
                overflow: 'auto',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: isNonMobile ? '1200px' : '100%', // Increased maxWidth for non-mobile screens
                    padding: '2rem',
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3],
                    margin: '0 auto', // Center the form horizontally
                }}
            >
                <Header title={"Create Shirt"} />

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleInputSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    width: '100%',
                                    padding: '1rem',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <Typography variant="h6">Shirt Details</Typography>
                                <Field
                                    as={TextField}
                                    name="warna"
                                    label="Warna"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={<ErrorMessage name="warna" />}
                                    helperText={<ErrorMessage name="warna" />}
                                />
                                <Field
                                    as={TextField}
                                    name="ukuran"
                                    label="Ukuran"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={<ErrorMessage name="ukuran" />}
                                    helperText={<ErrorMessage name="ukuran" />}
                                />
                                <Field
                                    as={TextField}
                                    name="harga"
                                    label="Harga"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={<ErrorMessage name="harga" />}
                                    helperText={<ErrorMessage name="harga" />}
                                />
                                <Field
                                    as={TextField}
                                    name="stok"
                                    label="Stok"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    error={<ErrorMessage name="stok" />}
                                    helperText={<ErrorMessage name="stok" />}
                                />

                                <ErrorMessage name="api" component="div" style={{ color: 'red', marginTop: '1rem' }} />

                                <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default ShirtInput;
