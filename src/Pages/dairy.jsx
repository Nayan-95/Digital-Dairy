"use client"

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Header } from "../Component/headers.jsx"
import { Sidebar } from "../Component/sidebar.jsx"
import { TaskGrid } from "../Component/task-grid.jsx"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFB74D",
    },
    secondary: {
      main: "#9C27B0",
    },
    background: {
      default: "#1E1E1E",
      paper: "#252525",
    },
  },
})

export default function Dairy() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <TaskGrid />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
