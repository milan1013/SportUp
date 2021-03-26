import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Basketball from "../Map/basketball.svg";
import Football from "../Map/football.svg";
import Golf from "../Map/golf-field.svg";
import Tennis from "../Map/tennis-racket.svg";
import Volleyball from "../Map/volleyball.svg";
import Sport from "../Map/sport.svg";
import "./Post.css";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: false,
      setExpand: "",
    };
  }

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });

    if (!this.state.expand) {
      this.setState({ setExpand: "expandUp" });
    }
    if (this.state.expand) {
      this.setState({ setExpand: "expandDown" });
    }
  };
  render() {
    return (
      <Card
        style={{
          position: "absolute",
          top: 16,
          left: 16,
        }}
        className={`root animate__animated animate__bounceInLeft`}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className="avatar">
              {this.props.event.posterInfo.posterName.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => {
                this.props.parentRef.setState({ chosenEvent: null });
              }}
              aria-label="settings"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={this.props.event.posterInfo.posterName}
          subheader={new Date(this.props.event.timestamp).toLocaleString()}
        />
        <CardContent>
          <img
            width="40px"
            height="40px"
            src={(() => {
              switch (this.props.event.type) {
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
            alt="Marker"
          />
          <Typography
            style={{ marginTop: 16 }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {this.props.event.caption}
          </Typography>
        </CardContent>
        {/*<CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          Učestvuj
          <IconButton
            className={this.state.setExpand}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          Vidi učesnike
        </CardActions>
        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {this.props.peopleInfo[0].info[0].longDescription}
            </Typography>
          </CardContent>
        </Collapse>*/}
      </Card>
    );
  }
}
export default Post;
