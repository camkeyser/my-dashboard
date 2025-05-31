import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SportsModule.scss';

const SportsModule = () => {
  const [teamId, setTeamId] = useState(() => localStorage.getItem('teamId') || null);
  const [teamData, setTeamData] = useState(null);
  const [nextGame, setNextGame] = useState(null);
  const [previousGame, setPreviousGame] = useState(null);
  const seasonYear = String(new Date().getFullYear());

  // List of NFL teams with their IDs
  const teams = [
    { id: '1', name: 'Atlanta Falcons' },
    { id: '2', name: 'Buffalo Bills' },
    { id: '3', name: 'Chicago Bears' },
    { id: '4', name: 'Cincinnati Bengals' },
    { id: '5', name: 'Cleveland Browns' },
    { id: '6', name: 'Dallas Cowboys' },
    { id: '7', name: 'Denver Broncos' },
    { id: '8', name: 'Detroit Lions' },
    { id: '9', name: 'Green Bay Packers' },
    { id: '10', name: 'Tennessee Titans' },
    { id: '11', name: 'Indianapolis Colts' },
    { id: '12', name: 'Kansas City Chiefs' },
    { id: '13', name: 'Las Vegas Raiders' },
    { id: '14', name: 'Los Angeles Rams' },
    { id: '15', name: 'Miami Dolphins' },
    { id: '16', name: 'Minnesota Vikings' },
    { id: '17', name: 'New England Patriots' },
    { id: '18', name: 'New Orleans Saints' },
    { id: '19', name: 'New York Giants' },
    { id: '20', name: 'New York Jets' },
    { id: '21', name: 'Philadelphia Eagles' },
    { id: '22', name: 'Arizona Cardinals' },
    { id: '23', name: 'Pittsburgh Steelers' },
    { id: '24', name: 'Los Angeles Chargers' },
    { id: '25', name: 'San Francisco 49ers' },
    { id: '26', name: 'Seattle Seahawks' },
    { id: '27', name: 'Tampa Bay Buccaneers' },
    { id: '28', name: 'Washington Commanders' },
    { id: '29', name: 'Carolina Panthers' },
    { id: '30', name: 'Jacksonville Jaguars' },
    { id: '33', name: 'Baltimore Ravens' },
    { id: '34', name: 'Houston Texans' },
  ];

  const today = new Date();
  const seasonStart = new Date('2025-09-09');
  const isOffseason = today < seasonStart;

  useEffect(() => {
    if (!teamId) return; // If no team is selected, do not fetch data

    // Fetch general team info
    axios
      .get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`)
      .then((response) => {
        const team = response.data.team;
        setTeamData(team);
      })
      .catch((error) => console.error(error));

    // Fetch team schedule
    axios
      .get(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/schedule?season=${seasonYear}`
      )
      .then((response) => {
        const schedule = response.data.events;
        const currentDate = new Date();

        let upcomingGame = null;
        let completedGame = null;
        if (Array.isArray(schedule)) {
          // Find first future game
          upcomingGame = schedule.find((game) => new Date(game.date) > currentDate);

          // Find the most recent completed game
          completedGame = schedule
            .slice()
            .reverse()
            .find(
              (game) => game.competitions[0].status.type.name === 'STATUS_FINAL'
            );
        }
        setNextGame(upcomingGame);
        if (completedGame) {
          setPreviousGame(completedGame);
        }
      })
      .catch((error) => console.error(error));
  }, [teamId]);

  // Handler for team selection
  const handleTeamSelection = (e) => {
    const selectedTeamId = e.target.value;
    setTeamId(selectedTeamId);
    localStorage.setItem('teamId', selectedTeamId);
  };

  // Handler for changing team
  const handleChangeTeam = () => {
    setTeamId(null);
    localStorage.removeItem('teamId');
    setTeamData(null);
    setNextGame(null);
    setPreviousGame(null);
  };

  // Show offseason message if it's before kickoff
  if (isOffseason) {
    return (
      <div className="sports-module sports-module--offseason">
        <h2>NFL Offseason</h2>
        <p>The season hasn't started yet. Check back after September 9, 2025!</p>
      </div>
    );
  }

  // If no team is selected, display the dropdown
  if (!teamId) {
    return (
      <div className="sports-module sports-module--selection">
        <h2>Select Your Favorite NFL Team</h2>
        <select onChange={handleTeamSelection} defaultValue="">
          <option value="" disabled>
            -- Select Team --
          </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (!teamData)
    return (
      <div className="sports-module sports-module--loading">
        Loading team data...
      </div>
    );

  const logoUrl = teamData.logos[0].href;
  const teamName = teamData.displayName;
  const currentRecord =
    teamData.record.items.find((item) => item.type === 'total')?.summary || 'N/A';
  const divisionWins =
    teamData.record.items
      .find((item) => item.type === 'total')
      ?.stats.find((stat) => stat.name === 'divisionWins')?.value || 0;
  const divisionLosses =
    teamData.record.items
      .find((item) => item.type === 'total')
      ?.stats.find((stat) => stat.name === 'divisionLosses')?.value || 0;

  const backgroundStyle = {
    background: `linear-gradient(to bottom, #${teamData.alternateColor}99, #${teamData.color}99)`,
  };

  // Format prev game details
  const previousGameDetails = previousGame ? (
    <>
      <h4 className="game-context">Previous Game:</h4> <br />
      <div className="sb-box">
        {previousGame.competitions[0].competitors.map((competitor) => (
          <React.Fragment key={competitor.team.id}>
            <div className="sb-item">{competitor.team.displayName}</div>
            <div
              className={`sb-item ${competitor.winner ? 'game-winner' : ''}`}
            >
              {competitor.score.value}
            </div>
          </React.Fragment>
        ))}
      </div>
      {previousGame.links?.find((link) => link.rel.includes('recap'))?.href && (
        <div className="recap-link">
          <a
            href={previousGame.links.find((link) => link.rel.includes('recap')).href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Game Recap
          </a>
        </div>
      )}
    </>
  ) : (
    <p>No previous game found.</p>
  );

  // Format next game details
  const nextGameDetails = nextGame ? (
    <>
      <h4 className="game-context">Next Game:</h4> <br />
      <div className="next-g-flex">
        {`${nextGame.competitions[0].competitors.find((c) => c.homeAway === 'away').team.shortDisplayName} @ ${nextGame.competitions[0].competitors.find((c) => c.homeAway === 'home').team.shortDisplayName}`}
        <br />
        <p className="gDate">{new Date(nextGame.date).toLocaleString()}</p>
      </div>
    </>
  ) : (
    <p>No upcoming games found.</p>
  );

  return (
    <div className="sports-module" style={backgroundStyle}>
      <h2>{teamName}</h2>
      <div className="sports-module_details">
        <img
          src={logoUrl}
          alt={`${teamName} logo`}
          className="sports-module__logo"
        />
        <p>
          <span className="em-rec">{currentRecord}</span> &nbsp; &nbsp;
          <span className="div-rec">
            ({divisionWins}-{divisionLosses})
          </span>
        </p>
      </div>
      <div className="sports-module_SB">
        {previousGameDetails}
        <div className="linediv"></div>
        {nextGameDetails}
      </div>
      <button className="change-team-button" onClick={handleChangeTeam}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="#fff" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default SportsModule;