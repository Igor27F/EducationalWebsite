import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function GamesListMenu(props) {
  const [category, setCategory] = React.useState("kid");
  const [games, setGames] = React.useState([]);
  const emptyList = ["", "", "", "", "", ""];

  React.useEffect(() => {
    axios
      .post("http://localhost:3000/listGames", JSON.stringify({ category }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setGames(response.data);
      });
  }, [category]);

  function handleChangeCategory(e) {
    setCategory(e.target.id);
  }

  return (
    <Container className="">
      <Box className="h-4" />
      <Box className="flex justify-center items-center w-3/4 mx-auto">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          fullWidth
        >
          <Button
            id="baby"
            variant={category === "baby" ? "contained" : "outlined"}
            onClick={(e) => handleChangeCategory(e)}
          >
            Bebês
          </Button>
          <Button
            id="kid"
            variant={category === "kid" ? "contained" : "outlined"}
            onClick={(e) => handleChangeCategory(e)}
          >
            Crianças
          </Button>
          <Button
            id="teen"
            variant={category === "teen" ? "contained" : "outlined"}
            onClick={(e) => handleChangeCategory(e)}
          >
            Adultos
          </Button>
        </ButtonGroup>
      </Box>
      <Box className="h-4" />
      <Grid container spacing={4}>
        {games.length === 0
          ? emptyList.map((skel, index) => (
              <Grid
                item
                xs={6}
                md={6}
                className="text-center flex justify-center items-center"
                key={index}
              >
                <Box className="w-3/4 h-36">
                  <Skeleton height={250} />
                </Box>
              </Grid>
            ))
          : games.map((game, index) => (
              <Grid
                item
                xs={6}
                md={6}
                className="text-center flex justify-center items-center"
                key={index}
              >
                <Link
                  to={"jogo/" + game.title}
                  className="w-full flex justify-center items-center"
                >
                  <Box className="border-4 border-sky-500 w-3/4 h-36 bg-orange-500">
                    <Typography>{game.title}</Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default GamesListMenu;
