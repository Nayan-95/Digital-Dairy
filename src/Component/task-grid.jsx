import { useState, useEffect } from "react";
import { Box, Grid, Typography, Select, MenuItem, InputAdornment, TextField, Slide, IconButton } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { TaskCard } from "./task-card";
import axios from 'axios'

const INITIAL_TASKS = [
  {
    id: 1,
    date: "January 24th, 2021 04:25 PM",
    title: "Fix login form UI bugs",
    description: "Fix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the loginFix the alignment issues and responsiveness of the login form.",
    teamMembers: [{ avatar: "/placeholder1.svg" }, { avatar: "/placeholder2.svg" }, { avatar: "/placeholder3.svg" }],
  },
  {
    id: 2,
    date: "January 25th, 2021 10:15 AM",
    title: "Implement user authentication API",
    description: "Develop a secure authentication API using JWT for login/signup.",
    teamMembers: [{ avatar: "/placeholder1.svg" }, { avatar: "/placeholder4.svg" }],
  },
  {
    id: 3,
    date: "February 1st, 2021 03:30 PM",
    title: "Design dashboard layout",
    description: "Create an intuitive dashboard UI with proper widgets and styling.",
    teamMembers: [{ avatar: "/placeholder2.svg" }, { avatar: "/placeholder5.svg" }],
  },
  {
    id: 4,
    date: "February 3rd, 2021 11:45 AM",
    title: "Integrate payment gateway",
    description: "Set up Stripe integration for handling transactions securely.",
    teamMembers: [{ avatar: "/placeholder3.svg" }, { avatar: "/placeholder4.svg" }, { avatar: "/placeholder6.svg" }],
  },
  {
    id: 5,
    date: "February 5th, 2021 01:00 PM",
    title: "Create product listing page",
    description: "Develop a page to display products with search and filtering options.",
    teamMembers: [{ avatar: "/placeholder1.svg" }, { avatar: "/placeholder5.svg" }],
  },
  {
    id: 6,
    date: "February 7th, 2021 09:30 AM",
    title: "Optimize database queries",
    description: "Improve query performance by indexing and optimizing SQL queries.",
    teamMembers: [{ avatar: "/placeholder2.svg" }, { avatar: "/placeholder6.svg" }],
  },
  {
    id: 7,
    date: "February 10th, 2021 02:20 PM",
    title: "Implement role-based access control",
    description: "Add role-based authentication to restrict access to certain features.",
    teamMembers: [{ avatar: "/placeholder3.svg" }, { avatar: "/placeholder4.svg" }],
  },
  {
    id: 8,
    date: "February 12th, 2021 04:50 PM",
    title: "Write unit tests for authentication module",
    description: "Ensure the authentication API functions correctly with comprehensive tests.",
    teamMembers: [{ avatar: "/placeholder1.svg" }, { avatar: "/placeholder5.svg" }],
  },
  {
    id: 9,
    date: "February 15th, 2021 11:10 AM",
    title: "Refactor frontend components",
    description: "Improve component structure and reusability in the frontend application.",
    teamMembers: [{ avatar: "/placeholder2.svg" }, { avatar: "/placeholder3.svg" }],
  },
  {
    id: 10,
    date: "February 18th, 2021 03:00 PM",
    title: "Deploy application to cloud server",
    description: "Set up CI/CD pipeline and deploy the application to AWS/GCP.",
    teamMembers: [{ avatar: "/placeholder4.svg" }, { avatar: "/placeholder6.svg" }],
  }
];



export function TaskGrid() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filterText, setFilterText] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  

  const filterTasks = (e) => {
    setFilterText(e.target.value);
    if (e.target.value) {
      setTasks(INITIAL_TASKS.filter((task) => task.title.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setTasks(INITIAL_TASKS);
    }
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskClick = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Your Brain Content</Typography>
        <TextField
          placeholder="Search here..."
          variant="outlined"
          size="small"
          onChange={filterTasks}
          sx={{ ml: "auto", width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Select size="small" value="newest" sx={{ width: 120 }}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>

      {/* Task Grid */}
      <Grid container spacing={2} sx={{ display: selectedTask ? "none" : "flex" }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
            <TaskCard {...task} onDelete={handleDelete} onClick={handleTaskClick} />
          </Grid>
        ))}
      </Grid>

      {/* Full-Screen Task Detail View */}
      <Slide direction="left" in={!!selectedTask} mountOnEnter unmountOnExit timeout={1000}>
        <Box
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            // width: "100vw",
            // height: "100vh",
            bgcolor: "background.paper",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedTask && (
            <>
              <IconButton onClick={handleCloseDetail}>
                <Close />
              </IconButton>
              <Typography variant="h5" gutterBottom>
                {selectedTask.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {selectedTask.date}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, maxWidth: "80%", textAlign: "center" }}>
                {selectedTask.description}
                <p>nayan</p>
              </Typography>
            </>
          )}
        </Box>
      </Slide>
    </Box>
  );
}
