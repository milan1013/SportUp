import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import mainLogo from "../../assets/logo/logo.svg";

import axios from "axios";

import Registration from "../Registration/Registration";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./LoginForm.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Chat 'n Easy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nonValidInput: undefined,
      mailAddress: "",
      password: "",
    };
  }

  render() {
    return (
      <div id="mainContainer">
        <Container id="main" component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              width="240px"
              height="64px"
              style={{ margin: 30 }}
              src={mainLogo}
            />

            <Typography component="h1" variant="h5">
              Vreme je da se pokrenemo!
            </Typography>
            <form
              style={{
                width: "100%", // Fix IE 11 issue.
              }}
              noValidate
            >
              <TextField
                variant="filled"
                margin="normal"
                fullWidth
                id="email"
                label="Unesite svoju e-mail adresu"
                name="email"
                autoComplete="email"
                autoFocus
                error={this.state.nonValidInput}
                value={this.state.mailAddress}
                onChange={(email) => {
                  if (
                    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
                      this.state.mailAddress
                    )
                  ) {
                    this.setState({
                      nonValidInput: true,
                    });
                  } else this.setState({ nonValidInput: false });
                  this.setState({ mailAddress: email.target.value });
                }}
              />
              <TextField
                variant="filled"
                margin="normal"
                fullWidth
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                validation
                name="password"
                label="Unesite svoju korisničku šifru"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Zapamti me na ovom uređaju"
              />
              <Button
                onClick={async () => {
                  try {
                    const request = await axios.post(
                      "http://localhost:3030/v1/auth/login",
                      {
                        mailAddress: this.state.mailAddress,
                        password: this.state.password,
                      }
                    );
                    console.log(request);
                    localStorage.setItem("token", request.data);
                    window.location.href = "/";
                  } catch (error) {
                    console.log(error);
                    alert(
                      "Uneli ste neispravan mail ili šifru. Proverite svoje podatke i probajte ponovo."
                    );
                  }
                }}
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "8px 0px 12px 0", letterSpacing: "2px" }}
              >
                Prijavi se
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/registration">Nemaš nalog? Kreiraj odmah!</Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
          </Switch>
        </Container>
      </div>
    );
  }
}
export default LoginForm;
