import React from "react";

import "./LeaderBoard.css";
import GetResults from "../../apis/entries";

class LeaderBoard extends React.Component {
  state = { results: [] };

  componentDidMount() {
    this.fromMongo();
  }

  async fromMongo() {
    let results = await GetResults.getResults();
    results = results.sort((a, b) => b.score - a.score);
    this.setState({results:results});
  }
  render() {
    console.log(this.state);

    let rank = 1;
    let content = this.state.results.map(
      value => 
        <tr className="row">
          <td className="cell">{rank++}.</td>
          <td className="cell">{value.name}</td>
          <td className="cell">{value.score}</td>
        </tr>
    );

    return (
      <div className="mainWrapper">
        <h2 id="header"> Shades </h2>
        
        <table className="board">
          
          <thead>
            <tr class="header">
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
            </thead>

            <tbody>
              {content}
            </tbody>  

        </table>
      </div>
    );
  }
}

export default LeaderBoard;
