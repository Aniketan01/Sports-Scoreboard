import React, { useEffect, useState } from "react";

const Rugby = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://api.balldontlie.io/nfl/v1/games", {
      headers: {
        Authorization: "2f7adaeb-280a-40cd-85f1-a32ec46661d3",
      },
    })
      .then((response) => response.json())
      .then((data) => setGames(data.data))
      .catch((error) => console.error("Error fetching NFL games:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">NFL Matches</h2>
      <div className="row">
        {games.map((game, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-header text-center fw-bold">
                {game.home_team.full_name} vs {game.visitor_team.full_name}
              </div>
              <div className="card-body text-center">
                <p><strong>Score:</strong> {game.home_team_score} - {game.visitor_team_score}</p>
                <p className="text-muted">{game.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rugby;
