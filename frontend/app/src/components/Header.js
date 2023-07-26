import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdbIcon from "@mui/icons-material/Adb";
import MenuItem from "@mui/material/MenuItem";
// import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  // InputBase,
  TextField,
  alpha,
  styled,
} from "@mui/material";
import { lighten, darken } from "@mui/system";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

function Header(props) {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  const handleChangeGame = (game) => {
    return navigate("/game/" + game);
  };

  // React.useEffect(() => {
  //   axios.get("http://localhost:3000/getGames").then((response) => {
  //     setGames(response.data);
  //   });
  // }, []);

  const handleGetGames = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/getGames");
      setGames(response.data);
    } catch (e) {
      if (!e?.response) {
        console.log("Erro ao acessar o servidor");
      }
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setAuth(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    setAuth(false);
  };

  return (
    <AppBar position="static" className="pt-1">
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item className="flex items-center" xs={4} md={3}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link className="flex items-center" to="/">
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h5"
                className="select-none"
                sx={{ flexGrow: 1 }}
              >
                logo
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4} md={6}>
            <Search className="w-full" sx={{ flexGrow: 1 }}>
              <Autocomplete
                options={games.sort(
                  (a, b) =>
                    -b.categoryDescription.localeCompare(a.categoryDescription)
                )}
                groupBy={(option) => option.categoryDescription}
                getOptionLabel={(option) => option.title}
                onChange={(event, jogoSelecionado) => {
                  if (jogoSelecionado) {
                    handleChangeGame(jogoSelecionado.title);
                  }
                  // this.blur;
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Selecionar jogo" />
                )}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                  </li>
                )}
                onOpen={handleGetGames}
                size="small"
              />
            </Search>
          </Grid>
          <Grid item xs={4} md={3} className="flex justify-end items-center">
            <Box sx={{ flexGrow: 1 }} />
            {!auth ? (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ mr: 1 }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                {/* <Button variant="outlined" className="bg-red-600" color="inherit">
              Cadastro
            </Button> */}
              </>
            ) : (
              <Box
                className="flex items-center justify-end"
                overflow={"hidden"}
              >
                <Typography
                  variant="h6"
                  component="div"
                  className="select-none"
                  sx={{ flexGrow: 1 }}
                  noWrap
                  textOverflow={"ellipsis"}
                >
                  joaozinho
                </Typography>
                <IconButton
                  size="large"
                  aria-label="icone usuário"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem onClick={handleLogout}>logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
