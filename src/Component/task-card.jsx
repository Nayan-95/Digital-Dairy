import { useState } from "react"
import { Card, CardContent, Chip, Typography, Box, AvatarGroup, Avatar, Button } from "@mui/material"
import { styled } from "@mui/system"

const CardContainer = styled(Box)({
  perspective: "1000px",
  width: "100%",
  height: "200px",
})

const CardInner = styled(Box)(({ flipped }) => ({
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  transition: "transform 0.6s",
  position: "relative",
}))

const CardFront = styled(Card)({
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  position: "absolute",
})

const CardBack = styled(Card)({
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  position: "absolute",
  transform: "rotateY(180deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  backgroundColor: "#333",
  color: "white",
})

export function TaskCard({ id, date, title, description, teamMembers, onDelete }) {
  const [flipped, setFlipped] = useState(false)

  const handleDelete = (e) => {
    e.stopPropagation() // Prevent the card from flipping
    onDelete(id)
  }

  return (
    <CardContainer onClick={() => setFlipped(!flipped)}>
      <CardInner flipped={flipped}>
        <CardFront>
          <CardContent>
            <Typography variant="caption" color="inherit" sx={{
              mt: 1, mb: 2, display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
              {date}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 1,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              title={title} 
            >
              {title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                label="Team"
                size="small"
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                }}
              />
              <Chip
                label="Important"
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleDelete} color="error" size="small" variant="contained" sx={{ fontSize: '0.75rem', padding: '4px 12px', mt: '10px', minWidth: 'auto', height: '30px' }}>
                Delete
              </Button>
              <AvatarGroup max={4} sx={{ justifyContent: "flex-start", mt: 1 }}>
                {teamMembers.map((member, index) => (
                  <Avatar key={index} src={member.avatar} sx={{ width: 30, height: 30 }} />
                ))}
              </AvatarGroup>
            </Box>
          </CardContent>
        </CardFront>
        <CardBack>
          <Typography variant="body1">{description}</Typography>
        </CardBack>
      </CardInner>
    </CardContainer>
  )
}
