import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import team from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.team to the cards json array
  state = {
    team,
    clickedTeamsIds: [],
    score: 0,
    goal: 13,
    status: ""
  };

  //shuffle the teams cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedTeamsIds = this.state.clickedTeamsIds;

    if(clickedTeamsIds.includes(id)){
      this.setState({ clickedTeamsIds: [], score: 0, status:  "Sorry - Game Over! Click to play again!" });
      return;
    }else{
      clickedTeamsIds.push(id)

      if(clickedTeamsIds.length ===13){
        this.setState({score: 13, status: "You Won! Great Job, Click to play again!", clickedTeamsIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ team, clickedTeamsIds, score: clickedTeamsIds.length, status: " " });

      for (let i = team.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [team[i], team[j]] = [team[j], team[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clicky Game - Tour de France 2018 Edition</h1>
          <p className="App-intro">
            Try to click on all 13 teams without repeating. 
          </p>
        </header>
        <Score total={this.state.score}
               goal={13}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.team.map(teams => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={teams.id}
              key={teams.id}
              image={teams.image}
            />
          ))}
        </Wrapper>

    </div>
    );
  }
}

export default App;