# cmd-play

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
