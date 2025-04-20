# cmd-play

A retro terminal-inspired arcade for educational games!

Deployed Link : https://cmd-play-fo13.vercel.app/

PPT : https://www.canva.com/design/DAGlJmxNq-0/Wo2o85-RFYjPMxT2cYRCxA/view?utm_content=DAGlJmxNq-0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1af352a9e6


## Overview

**cmd-play** is a unified hackathon project featuring a terminal-style launcher and a suite of interactive games for learning programming, cybersecurity, and problem-solving. Inspired by classic terminals, it brings together fun, education, and nostalgia in one place.

### Included Games
- **Cyber Catcher**: A Whack-a-Mole style cybersecurity awareness game.
- **Flappy Bird**: Classic Flappy Bird clone for arcade fun.
- **DataStruct Quest**: Solve puzzles and challenges about data structures.
- **Database Detective**: Solve a crime using SQL queries and database logic.

## How It Works
- Launch the terminal interface (`game-terminal`)
- Type commands to list, launch, or get help on games
- Each game runs on its own port for easy access

## Quick Start
1. Clone the repository and install dependencies for each subproject.
2. Use `start-games.sh` to launch all games and the terminal at once.
3. Open http://localhost:5173 to access the terminal and start playing!

## Project Structure
- `game-terminal/` — Terminal-style launcher (React + Vite)
- `cyber-catcher-vite/` — Cybersecurity Whack-a-Mole (React + Vite)
- `DataStruct-Quest/` — Data structure puzzle game (React + Vite)
- `flappy-bird/` — Flappy Bird clone (HTML/JS)
- `sql-murder-mystery/` — SQL-based detective game (React + Vite)
- `start-games.sh` — Script to launch all servers

## Contributing
Pull requests and suggestions welcome! See each subproject for setup and contribution details.

## License
MIT License (see each subproject for details)
