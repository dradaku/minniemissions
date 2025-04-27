
export type SportsTeam = {
  name: string;
  sport: 'football' | 'basketball';
  league: string;
};

export const sportsTeams: SportsTeam[] = [
  // Football Teams - Premier League
  { name: "Arsenal", sport: "football", league: "Premier League" },
  { name: "Manchester United", sport: "football", league: "Premier League" },
  { name: "Liverpool", sport: "football", league: "Premier League" },
  { name: "Chelsea", sport: "football", league: "Premier League" },
  { name: "Manchester City", sport: "football", league: "Premier League" },
  { name: "Tottenham Hotspur", sport: "football", league: "Premier League" },
  
  // Football Teams - La Liga
  { name: "Real Madrid", sport: "football", league: "La Liga" },
  { name: "Barcelona", sport: "football", league: "La Liga" },
  { name: "Atletico Madrid", sport: "football", league: "La Liga" },
  
  // Football Teams - Bundesliga
  { name: "Bayern Munich", sport: "football", league: "Bundesliga" },
  { name: "Borussia Dortmund", sport: "football", league: "Bundesliga" },
  
  // Basketball Teams - NBA
  { name: "Los Angeles Lakers", sport: "basketball", league: "NBA" },
  { name: "Golden State Warriors", sport: "basketball", league: "NBA" },
  { name: "Chicago Bulls", sport: "basketball", league: "NBA" },
  { name: "Boston Celtics", sport: "basketball", league: "NBA" },
  { name: "Miami Heat", sport: "basketball", league: "NBA" },
  { name: "Brooklyn Nets", sport: "basketball", league: "NBA" },
  { name: "Milwaukee Bucks", sport: "basketball", league: "NBA" },
  { name: "Phoenix Suns", sport: "basketball", league: "NBA" },
  { name: "Dallas Mavericks", sport: "basketball", league: "NBA" },
];
