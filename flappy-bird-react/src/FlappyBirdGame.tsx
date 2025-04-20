import React, { useRef, useEffect } from 'react';
import './style.css';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;

const FlappyBirdGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Minimal Flappy Bird logic (placeholder) ---
    // Replace with full ported logic from game.js as needed
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.font = '32px Menlo, monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('Flappy Bird React', 50, 300);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: GAME_HEIGHT }}>
      <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} style={{ border: '2px solid #222', background: '#70c5ce', borderRadius: 8 }} />
    </div>
  );
};

export default FlappyBirdGame;
