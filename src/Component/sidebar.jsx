import axios from 'axios';

import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
  TextField,
  Container,
  Paper,
  Modal,
} from "@mui/material"
import { Label, CheckCircle, Delete, Description } from "@mui/icons-material"
import Notification from './notification.jsx'

const DRAWER_WIDTH = 240


export function Sidebar() {
  const [showForm, setShowForm] = useState(false)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [notificationMsg, setNotificationMsg] = useState("")

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  async function savePage() {
    if (!title || !description) {
      alert("Title and description cannot be empty.");
      return;
    }
  
    const newPage = {
      title,
      description,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8080/addPage", newPage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setNotificationMsg("Page saved successfully!");
        setShowForm(false);
        setTitle("");
        setDescription("");
      } else {
        setNotificationMsg(response.data.message);
      }
    } catch (error) {
      console.error("Error saving page:", error);
      setNotificationMsg("Failed to save the page. Please try again.");
    }
  }
  


  useEffect(() => {
    if (notificationMsg) {
      const timer = setTimeout(() => {
        setNotificationMsg("");
      }, 2000); // Clears message after 2 seconds
  
      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [notificationMsg]);


  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: {
            xs: 200,
            sm: 240,
            md: 240,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: {
              xs: 200,
              sm: 240,
              md: 240,
            },
            boxSizing: "border-box",
            backgroundColor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h2" component="div" sx={{ fontSize: "1.06rem", mb: 2, fontWeight: "700" }}>
            YOUR DIGITAL DIARY
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setShowForm(true)}
            sx={{
              backgroundColor: "primary.main",
              color: "background.paper",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            + Add Page
          </Button>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary="Generic Filter" />
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText primary="Important" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckCircle />
              </ListItemIcon>
              <ListItemText primary="Urgent" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Recycle Bin" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ my: 2 }} />
          <ListItem>
            <ListItemText primary="Labels" />
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "secondary.main" }}>
                <Label />
              </ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "success.main" }}>
                <Label />
              </ListItemIcon>
              <ListItemText primary="You Tube" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "warning.main" }}>
                <Label />
              </ListItemIcon>
              <ListItemText primary="Google Link" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "error.main" }}>
                <Label />
              </ListItemIcon>
              <ListItemText primary="Drive Link" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: '80vh',
            transform: "translate(-50%, -50%)",
            width: '80vw',
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: "2px solid",
            borderColor: "warning.main",
            boxShadow: "0 0 10px rgba(255, 193, 7, 0.7)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create New Page
          </Typography>
          <TextField label="What's on your mind?" value={title} onChange={(e) => handleTitleChange(e)} fullWidth margin="normal" />
          <TextField label="Go on, tell me everything!" fullWidth multiline rows={8} margin="normal" value={description} onChange={(e) => handleDescriptionChange(e)} />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={savePage}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      {notificationMsg && <Notification msg={notificationMsg} />}
    </Box>
  )
}
