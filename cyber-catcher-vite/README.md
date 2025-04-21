# Cyber Catcher

A Whack-a-Mole style cybersecurity awareness game.

## Overview
Cyber Catcher is an educational game where players identify and "catch" malicious emails, passwords, and URLs. The goal is to teach players how to spot phishing attempts, weak credentials, and suspicious links in a fun, interactive way.

## Gameplay
- Popups appear on a grid, each representing an email, password, or URL.
- Some are safe, others are malicious (phishing, weak passwords, etc.).
- Click on malicious popups to score points.
- Avoid clicking safe popups to prevent losing strikes.
- Features a timer, scoreboard, and a limited number of strikes.
- Blue grid background with a green gameplay area for retro vibes.
- Mole character appears with each popup for added fun.

## Educational Value
- Reinforces cybersecurity best practices
- Teaches players to evaluate content, not just rely on color cues
- Includes a variety of real-world inspired examples

## Setup & Running
1. `cd cyber-catcher-vite`
2. `npm install`
3. `npm run dev`
4. Visit [http://localhost:5174](http://localhost:5174)

## Tech Stack
- React 19
- TypeScript
- Vite

## License
MIT


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
