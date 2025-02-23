import { Card, CardContent, Typography, Box, AvatarGroup, Avatar, Button } from "@mui/material";

export function TaskCard({ id, date, title, description, teamMembers, onDelete, onClick }) {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick event
    onDelete(id);
  };

  return (
    <Card onClick={() => onClick(id)} sx={{ cursor: "pointer", height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="caption" sx={{ display: "flex", justifyContent: "center", textAlign: "center", mb: 1 }}>
          {date}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", mb: 2 }}
          title={title}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleDelete} color="error" size="small" variant="contained">
            Delete
          </Button>
          <AvatarGroup max={4}>
            {teamMembers.map((member, index) => (
              <Avatar key={index} src={member.avatar} />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
