import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, Box,} from "@mui/material";

export default function MovieCard({ movie }) {
  const {
    original_title,
    title,
    name,
    overview,
    poster_path,
    vote_average,
    casts,
  } = movie;

  const safeCasts = Array.isArray(casts) ? casts : [];
  const [open, setOpen] = useState(false);
  
 
  const displayTitle = original_title || title || name || "Unknown Title";

  
  const getCastPriority = (characterName) => {
    const char = (characterName || "").toLowerCase();

    if (char.includes("second heroine")) return 3;
    
    if (char.includes("heroine")) return 2;
    
    if (char.includes("hero")) return 1;

   
    return 4;
  };

  const sortedCasts = [...safeCasts].sort((a, b) => {
    return getCastPriority(a.character) - getCastPriority(b.character);
  });
 

  const topCasts = sortedCasts.slice(0, 3);

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
            {poster_path ? (
              <CardMedia
                component="img"
                image={poster_path}
                alt={displayTitle}
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
               <Typography variant="caption">No Image</Typography>
            )}
          </Box>

          <CardContent sx={{ px: 0 }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {displayTitle}
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
              {overview || "No overview available."}
            </Typography>

            <Button
              size="small"
              sx={{ p: 0, textTransform: "none", mt: 0.5 }}
              onClick={() => setOpen(true)}
            >
              More
            </Button>

            <Typography variant="body2" mt={0.5}>
              ⭐ {vote_average || "N/A"}
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
        <DialogTitle>{displayTitle}</DialogTitle>
        <DialogContent>
          <Typography>{overview || "No details available."}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}