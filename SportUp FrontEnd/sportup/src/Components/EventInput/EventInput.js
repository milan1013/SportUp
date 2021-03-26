import React from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../Post/Post";
import "./EventInput.css";
import PostList from "../PostList/PostList";
import Map from "../Map/Map";
import Navigation from "../Navigation/Navigation";
import { EventEmitter } from "events";
import Pin from "../Map/pin";
import Basketball from "../Map/basketball.svg";
import Football from "../Map/football.svg";
import Golf from "../Map/golf-field.svg";
import Tennis from "../Map/tennis-racket.svg";
import Volleyball from "../Map/volleyball.svg";
import Sport from "../Map/sport.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "date-fns";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

class EventInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventInputOpen: false,
      chosenSport: "Ostalo",
      caption: "",
    };
  }

  componentDidMount() {
    this.props.eventController.on("switchCreator", () => {
      this.setState((prevState) => ({
        eventInputOpen: !prevState.eventInputOpen,
      }));
      this.props.eventController.emit("switchMarker");
    });
  }
  //

  render() {
    return this.state.eventInputOpen ? (
      <div
        className="animate__animated animate__bounceInUp"
        id="EventInputRoot"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <b>Organizuj dešavanje</b>
        </span>
        <span
          style={{
            fontSize: 14,
            marginTop: 20,
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: "center",
          }}
        >
          Na mapi se pojavio crveni marker. Pomeri ga na lokaciju gde će se
          organizovati sportsko dešavanje.
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 18,
          }}
        >
          <img
            onClick={() => this.setState({ chosenSport: "Fudbal" })}
            className="sport-icon"
            src={Football}
            height={28}
            width={28}
          />
          <img
            onClick={() => this.setState({ chosenSport: "Košarka" })}
            className="sport-icon"
            src={Basketball}
            height={28}
            width={28}
          />
          <img
            onClick={() => this.setState({ chosenSport: "Tenis" })}
            className="sport-icon"
            src={Tennis}
            height={28}
            width={28}
          />
          <img
            onClick={() => this.setState({ chosenSport: "Golf" })}
            className="sport-icon"
            src={Golf}
            height={28}
            width={28}
          />
          <img
            onClick={() => this.setState({ chosenSport: "Odbojka" })}
            className="sport-icon"
            src={Volleyball}
            height={28}
            width={28}
          />
          <img
            onClick={() => this.setState({ chosenSport: "Ostalo" })}
            className="sport-icon"
            src={Sport}
            height={28}
            width={28}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            paddingLeft: 16,
            alignItems: "center",
          }}
        >
          <img
            style={{ alignSelf: "center" }}
            src={(() => {
              switch (this.state.chosenSport) {
                case "Fudbal":
                  return Football;
                case "Košarka":
                  return Basketball;
                case "Golf":
                  return Golf;
                case "Tenis":
                  return Tennis;
                case "Odbojka":
                  return Volleyball;
                default:
                  return Sport;
              }
            })()}
            height={64}
            width={64}
          />
          <div style={{ marginLeft: 16 }}>
            <span
              style={{
                fontSize: 20,
              }}
            >
              <b>{this.state.chosenSport}</b>
            </span>
            <br />
            <span
              style={{
                fontSize: 14,
              }}
            >
              Izaberite klikom na ikonice.
            </span>
          </div>
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label="O kakvom se dešavanju radi?"
          multiline
          rowsMax={4}
          style={{ marginLeft: 16, marginRight: 16, marginTop: 14 }}
          value={this.state.caption}
          onChange={(e) => this.setState({ caption: e.target.value })}
          variant="filled"
        />

        <Button
          onClick={async () => {
            try {
              let request = await axios.post(
                "http://localhost:3030/v1/event/",
                {
                  caption: this.state.caption,
                  lat: sessionStorage.getItem("lat"),
                  lon: sessionStorage.getItem("lon"),
                  type: this.state.chosenSport,
                },
                {
                  headers: {
                    "X-Authentication": localStorage.getItem("token"),
                  },
                }
              );
              console.log(request);
              window.location.reload();
            } catch (error) {
              console.log(error);
              alert(
                "Nije bilo moguće kreirati dešavanje. Proverite da li ste dobro uneli podatke i probajte ponovo."
              );
            }
          }}
          variant="contained"
          color="primary"
          style={{
            marginLeft: 16,
            textTransform: "none",
            marginRight: 16,
            borderRadius: 15,
            marginTop: 18,
            marginBottom: 14,
          }}
        >
          Završi i objavi dešavanje
        </Button>
      </div>
    ) : (
      <div></div>
    );
  }
}
export default EventInput;
