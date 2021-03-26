import React from "react";
import "./Home.css";
import PostList from "../PostList/PostList";
import Map from "../Map/Map";
import Navigation from "../Navigation/Navigation";
import EventInput from "../EventInput/EventInput";
import { EventEmitter } from "events";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      showPosts: true,
      postVisibility: { visibility: "collapse" },
    };
    this.eventController = new EventEmitter();

    if (!localStorage.getItem("token")) window.location.href = "/login";
  }

  people = [
    {
      firstName: "Elson",
      lastName: "Correia",
      info: {
        age: 24,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "John",
      lastName: "Doe",
      info: {
        age: 18,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      info: {
        age: 34,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Maria",
      lastName: "Carvalho",
      info: {
        age: 22,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Kelly",
      lastName: "Correia",
      info: {
        age: 23,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Don",
      lastName: "Quichote",
      info: {
        age: 39,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Marcus",
      lastName: "Correia",
      info: {
        age: 0,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Bruno",
      lastName: "Gonzales",
      info: {
        age: 25,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
    {
      firstName: "Alonzo",
      lastName: "Correia",
      info: {
        age: 44,
        image: "Fotografija",
        shortDescription: "Kratak opis",
        longDescription: "Dug opis",
        date: "13. Dec. 1389.",
      },
    },
  ];
  render() {
    return (
      <div id="homeMain">
        <Map eventController={this.eventController} />
        <PostList eventController={this.eventController} people={this.people} />

        <Navigation eventController={this.eventController} />
      </div>
    );
  }
}
export default Home;
