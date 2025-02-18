import { AppBar, Badge, Box, IconButton, InputAdornment, TextField, Toolbar, Avatar } from "@mui/material"
import { Search, NotificationsOutlined, HelpOutline } from "@mui/icons-material"

export function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
      elevation={0}
    >
      <Toolbar>
        <TextField
          placeholder="Search here..."
          variant="outlined"
          size="small"
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
        <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
          <IconButton>
            <Badge badgeContent={84} color="primary">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent="?" color="primary">
              <HelpOutline />
            </Badge>
          </IconButton>
          <Avatar src="/placeholder.svg" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

