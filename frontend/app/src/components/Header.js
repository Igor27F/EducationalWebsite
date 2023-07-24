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
  // InputBase,
  TextField,
  alpha,
  styled,
} from "@mui/material";
import { lighten, darken } from "@mui/system";
import axios from "axios";

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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          logotipo
        </Typography>
        <Search>
          <Autocomplete
            className=""
            id="combo-box-demo"
            options={games.sort(
              (a, b) => -b.category.localeCompare(a.category)
            )}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            sx={{ width: 600 }}
            onChange={(event, jogoSelecionado) =>
              props.handleGameSelected(jogoSelecionado.title)
            }
            renderInput={(params) => (
              <TextField {...params} label="With categories" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            onOpen={handleGetGames}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        {!auth ? (
          <>
            <Button
              variant="outlined"
              className="bg-red-600"
              color="inherit"
              sx={{ mr: 1 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button variant="outlined" className="bg-red-600" color="inherit">
              Cadastro
            </Button>
          </>
        ) : (
          <Box className="flex items-center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              joaozinho
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
