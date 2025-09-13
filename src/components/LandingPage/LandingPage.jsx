import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { School, Person, Insights, Cloud } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const LandingPage = ({ setUser }) => {
  const { t, i18n } = useTranslation();
  const handleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <Box
        sx={{
          flex: "1 0 auto",
          bgcolor: "primary.main",
          color: "white",
          py: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            {t("welcome_to_digital_tracker")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Track your <strong>child journey</strong> in one place.
          </Typography>

          {/* Google Sign In */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("Login Failed")}
          />
          </Box>
          
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 2, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose Digital Tracker?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { icon: <School fontSize="large" />, title: "School Tracking", desc: "Organize all your school tasks and projects easily." },
              { icon: <Person fontSize="large" />, title: "Personal Tasks", desc: "Never forget your personal commitments." },
              { icon: <Insights fontSize="large" />, title: "Analytics", desc: "Get insights into your progress and productivity." },
              { icon: <Cloud fontSize="large" />, title: "Cloud Backup", desc: "Your data stays safe and accessible anywhere." },
            ].map((f, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                  <CardContent>
                    {f.icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {f.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">© {new Date().getFullYear()} Digital Tracker | Built with ❤️</Typography>
      </Box>
    </Box>
  );
};

LandingPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};


export default LandingPage;
