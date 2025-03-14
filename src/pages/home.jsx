import React from "react";
import { Container, Grid, Card, CardContent, Typography, Avatar, Box, LinearProgress, Button } from "@mui/material";
import { styled } from "@mui/system";

const projects = [
  { title: "App Development", progress: 45, members: 3, timeLeft: "2 Weeks left" },
  { title: "Website Design", progress: 75, members: 3, timeLeft: "3 Days left" },
  { title: "Landing Page", progress: 85, members: 3, timeLeft: "1 Week left" },
  { title: "Quality Assurance", progress: 25, members: 3, timeLeft: "1 Week left" },
  { title: "Mobile Development", progress: 75, members: 3, timeLeft: "1 Week left" },
  { title: "Software Testing", progress: 75, members: 3, timeLeft: "1 Week left" },
];

const StyledCard = styled(Card)({
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "16px",
});

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Projects</Typography>
        <Button variant="contained" color="primary">+ Create Project</Button>
      </Box>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {project.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Typography variant="body2" color="textSecondary" mr={1}>Progress:</Typography>
                  <LinearProgress variant="determinate" value={project.progress} sx={{ width: "100%" }} />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Box display="flex" alignItems="center">
                    {[...Array(project.members)].map((_, idx) => (
                      <Avatar key={idx} sx={{ width: 24, height: 24, marginLeft: idx !== 0 ? "-8px" : 0 }} />
                    ))}
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {project.timeLeft}
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
