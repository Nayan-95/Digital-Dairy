import { useState, useEffect } from "react";
import { Box, Grid, Typography, Select, MenuItem, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { TaskCard } from "./task-card";



const INITIAL_TASKS = [
  {
    id: 1,
    date: "January 24th, 2021 04:25 PM",
    title: "Fix login form UI bugs",
    description: "Fix the alignment issues and responsiveness of the login form.",
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
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    if (filterText) {
      setTasks(
        INITIAL_TASKS.filter((task) =>
          task.title.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setTasks(INITIAL_TASKS);
    }
  }, [filterText]);
  

function filterTaks(e) {
  setFilterText(e.target.value)
}

const handleDelete = (taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId));
};

return (
  <Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Typography variant="h6">Your Brain Content</Typography>
      <TextField
        placeholder="Search here..."
        variant="outlined"
        size="small"
        onChange={(e) => filterTaks(e)}
        sx={{
          ml: "auto",
          width: 400,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.default",
          },
        }}
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
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
          <TaskCard {...task} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
}
