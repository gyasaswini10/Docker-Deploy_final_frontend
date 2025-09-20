import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import Footer from "./Footer";
import { withTranslation } from "react-i18next";
const Contact = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [messageSent, setMessageSent] = useState(null);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "&:hover .MuiOutlinedInput-root": {
      borderColor: "white",
    },
  };

  const onSubmit = (data) => {
    const emailParams = {
      from_name: data.fullName,
      reply_to: data.email,
      message: data.message,
    };

    emailjs
      .send(
        "service_kri1f7g", // Replace with your EmailJS Service ID
        "template_azh7v6r", // Replace with your EmailJS Template ID
        emailParams,
        "G1fSQfW9jpolzRZiM" // Replace with your EmailJS Public Key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setMessageSent("Your message has been sent successfully!");
        reset();
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setMessageSent(
          `Failed to send the message. Error: ${err.text || "Unknown error"}`
        );
      });
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "10px",
        backgroundColor: "white",
        color: "black",
        marginBottom: "2rem !important", // Adding !important
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        We are here to assist you! Feel free to reach out to us for any
        inquiries or feedback.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            style={{
              height: "100%",
              boxShadow: "0 3px 10px rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              backgroundColor: "white ",
              color: "black",
            }}
          >
            <CardContent>
              <Typography variant="h5">Address</Typography>
              <Typography variant="body2">
                KL UNIVERSITY, VADHESHWARAM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            style={{
              height: "100%",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",

              backgroundColor: "white ",
              color: "black",
            }}
          >
            <CardContent>
              <Typography variant="h5">Phone</Typography>
              <Typography variant="body2"> +91-181-010-101 </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            style={{
              height: "100%",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",

              backgroundColor: "white ",
              color: "black",
            }}
          >
            <CardContent>
              <Typography variant="h5">Emails</Typography>
              <Typography variant="body2">
                2300030244@kluniversity.in
              </Typography>
              <Typography variant="body2">
                2300030570@kluniversity.in
              </Typography>
              <Typography variant="body2">
                2300032747@kluniversity.in
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <Typography variant="h5">Send Message</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            required
            {...register("fullName", {
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only alphabets are allowed",
              },
            })}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
            style={{ margin: "10px 0" }}
            color="warning"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={inputStyle}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            style={{ margin: "10px 0" }}
            color="warning"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={inputStyle}
          />
          <TextField
            label="Type your Message"
            variant="outlined"
            required
            multiline
            rows={4}
            {...register("message", { required: "Message is required" })}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
            style={{ margin: "10px 0" }}
            color="warning"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={inputStyle}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              border: "2px solid white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
            type="submit"
          >
            Send
          </Button>
        </form>

        {/* Success or error message display */}
        {messageSent && (
          <Typography
            variant="body1"
            align="center"
            style={{
              marginTop: "20px",
              color: messageSent.includes("successfully") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {messageSent}
          </Typography>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
