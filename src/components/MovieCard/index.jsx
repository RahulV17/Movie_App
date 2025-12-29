import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, Box,} from "@mui/material";

export default function MovieCard({ movie }) {
  const {
    original_title,
    overview,
    poster_path,
    vote_average,
    casts = [],
  } = movie;

  const [open, setOpen] = useState(false);

  const heroCast = casts.filter(
    (c) =>
      c.character?.toLowerCase().includes("hero") ||
      c.character?.toLowerCase().includes("heroine")
  );

  const otherCast = casts.filter(
    (c) =>
      !c.character?.toLowerCase().includes("hero") &&
      !c.character?.toLowerCase().includes("heroine")
  );

  const orderedCast = [...heroCast, ...otherCast];
  const topCasts = orderedCast.slice(0, 3);

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            minHeight: 440,
            backgroundColor: "#fff",
            borderRadius: 1,
            boxShadow: 3,
            p: 2,
            display: "flex",
            flexDirection: "column",
            maxWidth: 280,
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              height: 260,
              border: "6px solid #f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eee",
            }}
          >
            <CardMedia
              component="img"
              image={poster_path}
              alt={original_title}
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <CardContent sx={{ px: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {original_title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {overview}
            </Typography>

            <Button
              size="small"
              sx={{ p: 0, textTransform: "none", mt: 0.5 }}
              onClick={() => setOpen(true)}
            >
              More
            </Button>

            <Typography variant="body2" mt={0.5}>
              ⭐ {vote_average}
            </Typography>

            {topCasts.length > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                <strong>Cast:</strong> {topCasts.map((c) => c.name).join(", ")}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{original_title}</DialogTitle>
        <DialogContent>
          <Typography>{overview}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
