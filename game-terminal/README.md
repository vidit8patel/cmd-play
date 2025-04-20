# cmd-play Terminal

A retro terminal-style launcher for educational games.

## Overview
The cmd-play Terminal is a React-based launcher that mimics a classic command-line interface. It allows users to browse, launch, and manage educational games from a single hub.

## Features
- Terminal-like UI with command input
- List and launch games with commands
- Game descriptions and launch buttons
- Easily extensible to add new games

## Usage
1. `cd game-terminal`
2. `npm install`
3. `npm run dev`
4. Visit [http://localhost:5173](http://localhost:5173)

## Commands
- `play [game name]`: Launch a game
- `list`: Show available games
- `clear`: Clear terminal output
- `exit`: Exit current game
- `help`: Show help message

## Adding New Games
- Edit the `games` array in `GameTerminal.tsx` to add new games
- Update paths and descriptions as needed

## Tech Stack
- React 19
- TypeScript
- Vite

## License
MIT


A terminal-style game launcher for educational games. Project name: cmd-play.

## Overview

This project creates a terminal-like interface that allows users to launch multiple educational games:

1. **Cyber Catcher** - A Whack-a-Mole style cybersecurity awareness game
2. **Flappy Bird** - A classic Flappy Bird clone

The interface mimics a terminal window, allowing users to:
- Type commands to launch games
- View a list of available games
- Exit games and return to the terminal

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Make sure you have both the Cyber Catcher and Flappy Bird games in your hackathon folder
2. Install dependencies:
   ```
   cd game-terminal
   npm install
   ```

### Running the Game Terminal

You can start the Game Terminal using either:

```bash
# Using npm
npm run dev

# OR using the start script
./start.sh
```

## Available Commands

Once the terminal is running, you can use these commands:

- `play [game name]` - Launch a game (e.g., `play Cyber Catcher` or `play Flappy Bird`)
- `list` - Show all available games
- `clear` - Clear the terminal screen
- `exit` - Exit the current game and return to the terminal
- `help` - Show all available commands

## Project Structure

- `GameTerminal.tsx` - Main React component for the terminal interface
- `GameTerminal.css` - Styling for the terminal
- `main.tsx` - Entry point for the React application
- Configuration files for TypeScript, Vite, and npm

## Adding New Games

To add a new game to the terminal:

1. Add the game to the `games` array in `GameTerminal.tsx`
2. Update the iframe rendering logic in the `game-container` section if needed

## Note

This terminal is designed to work with the specific file structure of your hackathon folder. If you move or rename the game folders, you'll need to update the paths in `GameTerminal.tsx`.
