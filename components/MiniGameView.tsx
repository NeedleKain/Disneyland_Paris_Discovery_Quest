import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { MiniGame } from '../types.ts';

// --- Mini-jeu 1: Séquenceur Cryptographique ---
const FrequencyTunerGame = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [targetFrequency] = useState(() => parseFloat((Math.random() * 80 + 20).toFixed(1))); // e.g. 20.0 to 100.0
  const [currentFrequency, setCurrentFrequency] = useState(50.0);
  const [syncProgress, setSyncProgress] = useState(0);
  const [status, setStatus] = useState<'tuning' | 'success'>('tuning');
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
  const MAX_DIFF = 50;
  const SYNC_THRESHOLD = 1.2;
  const SYNC_DURATION_MS = 2000;

  const updateFrequency = (amount: number) => {
    if (status !== 'tuning') return;
    setCurrentFrequency(prev => {
      const newValue = parseFloat((prev + amount).toFixed(1));
      if (newValue < 0) return 0;
      if (newValue > 150) return 150;
      return newValue;
    });
  };

  const handleMouseDown = (amount: number) => {
    updateFrequency(amount);
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        updateFrequency(amount);
      }, 50);
    }, 400);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  
  const runAnimation = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const diff = Math.abs(currentFrequency - targetFrequency);
    
    if (status === 'tuning') {
        if (diff <= SYNC_THRESHOLD) {
            setSyncProgress(prev => Math.min(prev + (deltaTime / SYNC_DURATION_MS) * 100, 100));
        } else {
            setSyncProgress(prev => Math.max(prev - (deltaTime / SYNC_DURATION_MS) * 100, 0));
        }
    }

    const normalizedDiff = Math.min(diff / MAX_DIFF, 1);
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);

    const amplitude = H / 4 + (normalizedDiff * H / 6);
    const noise = normalizedDiff * 30;
    const speed = timestamp * (currentFrequency / 200);
    const waveFrequency = 0.05;

    const r = Math.floor(190 - (1 - normalizedDiff) * (190 - 103));
    const g = Math.floor(18 + (1 - normalizedDiff) * (232 - 18));
    const b = Math.floor(60 + (1 - normalizedDiff) * (249 - 60));
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.moveTo(0, H/2);
    for (let x = 0; x < W; x++) {
      const angle = (x * waveFrequency) + speed;
      const y = H / 2 + Math.sin(angle) * amplitude + (Math.random() - 0.5) * noise;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#fce7f3';
    ctx.font = '16px "Lato", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Fréquence: ${currentFrequency.toFixed(1)} MHz`, W / 2, 20);

    const barWidth = W - 40;
    const barHeight = 10;
    const barX = 20;
    const barY = H - 30;
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    
    if (syncProgress > 0) {
      ctx.fillStyle = '#67e8f9';
      ctx.fillRect(barX, barY, barWidth * (syncProgress / 100), barHeight);
    }

    animationFrameId.current = requestAnimationFrame(runAnimation);
  }, [currentFrequency, status, targetFrequency, syncProgress]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    
    resizeCanvas();

    return () => {
        resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(runAnimation);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      handleMouseUp();
    };
  }, [runAnimation]);

  useEffect(() => {
    if (syncProgress >= 100 && status === 'tuning') {
      setStatus('success');
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

      const canvas = canvasRef.current;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#67e8f9';
            ctx.font = 'bold 24px "Cinzel Decorative", cursive';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#67e8f9';
            ctx.shadowBlur = 10;
            ctx.fillText('SYNCHRONISÉ', W / 2, H / 2);
          }
      }
      
      setTimeout(() => onComplete(), 1500);
    }
  }, [syncProgress, onComplete, status]);

  return (
    <div>
      <div className="w-full aspect-[2/1] border-2 border-cyan-400 rounded-lg mx-auto">
        <canvas ref={canvasRef} className="w-full h-full bg-black/50 rounded-lg"></canvas>
      </div>
      <div className="mt-4 flex justify-between items-center gap-4">
        <button
          onTouchStart={() => handleMouseDown(-0.1)}
          onTouchEnd={handleMouseUp}
          onMouseDown={() => handleMouseDown(-0.1)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          disabled={status !== 'tuning'}
          className="w-16 h-16 rounded-full font-bold text-4xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center pb-1 select-none"
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text-color)'}}
        >
          -
        </button>
        <div className="text-center">
            <p className="font-bold text-lg" style={{ color: 'var(--accent-color)'}}>
              {status === 'success' ? 'Connexion Stabilisée !' : 'Ajuster la Fréquence'}
            </p>
        </div>
        <button
          onTouchStart={() => handleMouseDown(0.1)}
          onTouchEnd={handleMouseUp}
          onMouseDown={() => handleMouseDown(0.1)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          disabled={status !== 'tuning'}
          className="w-16 h-16 rounded-full font-bold text-4xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center pb-1 select-none"
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text-color)'}}
        >
          +
        </button>
      </div>
    </div>
  );
};


// --- Mini-jeu 2: Gestion de Flux d'Énergie ---
const PipeGridGame = ({ onComplete }: { onComplete: () => void }) => {
    const GRID_SIZE = 5;
    const START_POS = { r: 0, c: 1 };
    const END_POS = { r: 4, c: 3 };

    const pipes = ['─', '│', '└', '┘', '┐', '┌'];
    const SOLUTION_GRID = [
        [3, 5, 0, 3, 2],
        [1, 2, 0, 5, 1],
        [4, 5, 0, 3, 1],
        [1, 2, 0, 5, 1],
        [4, 5, 3, 2, 4],
    ];

    const CONNECTIONS_BY_INDEX = {
        0: { 0: [[0, -1], [0, 1]], 90: [[-1, 0], [1, 0]], 180: [[0, -1], [0, 1]], 270: [[-1, 0], [1, 0]] },
        1: { 0: [[-1, 0], [1, 0]], 90: [[0, -1], [0, 1]], 180: [[-1, 0], [1, 0]], 270: [[0, -1], [0, 1]] },
        2: { 0: [[-1, 0], [0, 1]], 90: [[1, 0], [0, 1]], 180: [[1, 0], [0, -1]], 270: [[-1, 0], [0, -1]] },
        3: { 0: [[-1, 0], [0, -1]], 90: [[-1, 0], [0, 1]], 180: [[1, 0], [0, 1]], 270: [[1, 0], [0, -1]] },
        4: { 0: [[1, 0], [0, -1]], 90: [[-1, 0], [0, -1]], 180: [[-1, 0], [0, 1]], 270: [[1, 0], [0, 1]] },
        5: { 0: [[1, 0], [0, 1]], 90: [[1, 0], [0, -1]], 180: [[-1, 0], [0, -1]], 270: [[-1, 0], [0, 1]] },
    };
    
    const createInitialGrid = () =>
        SOLUTION_GRID.map((row) =>
            row.map((type) => ({
                type,
                rotation: Math.floor(Math.random() * 4) * 90,
                connected: false,
            }))
        );

    const [grid, setGrid] = useState(createInitialGrid);
    const [isComplete, setIsComplete] = useState(false);

    const rotatePipe = (r: number, c: number) => {
        if (isComplete) return;
        setGrid(currentGrid => {
            const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));
            newGrid[r][c].rotation = (newGrid[r][c].rotation + 90) % 360;
            return newGrid;
        });
    };

    useEffect(() => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell, connected: false })));
        newGrid[START_POS.r][START_POS.c].connected = true;
        
        const queue: {r: number, c: number}[] = [];
        const visited = new Set([`${START_POS.r},${START_POS.c}`]);
        let pathFound = false;

        const { r: startR, c: startC } = START_POS;
        const potentialNeighbors = [
            { r: startR - 1, c: startC, requiredConnection: [1, 0] },
            { r: startR + 1, c: startC, requiredConnection: [-1, 0] },
            { r: startR, c: startC - 1, requiredConnection: [0, 1] },
            { r: startR, c: startC + 1, requiredConnection: [0, -1] },
        ];

        for (const neighbor of potentialNeighbors) {
            const { r: nr, c: nc, requiredConnection: [reqDr, reqDc] } = neighbor;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && !visited.has(`${nr},${nc}`)) {
                const neighborCell = newGrid[nr][nc];
                const neighborConnections = CONNECTIONS_BY_INDEX[neighborCell.type][neighborCell.rotation];
                if (!neighborConnections) continue;

                const connectsToStart = neighborConnections.some(([dr, dc]) => dr === reqDr && dc === reqDc);
                if (connectsToStart) {
                    visited.add(`${nr},${nc}`);
                    queue.push({ r: nr, c: nc });
                }
            }
        }
        
        let head = 0;
        while(head < queue.length) {
            const { r, c } = queue[head++];
            newGrid[r][c].connected = true;

            const currentCell = newGrid[r][c];
            const connections = CONNECTIONS_BY_INDEX[currentCell.type][currentCell.rotation];
            if (!connections) continue;
            
            for (const [dr, dc] of connections) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && !visited.has(`${nr},${nc}`)) {
                    const neighborCell = newGrid[nr][nc];
                    const neighborConnections = CONNECTIONS_BY_INDEX[neighborCell.type][neighborCell.rotation];
                    if (!neighborConnections) continue;
                    
                    const connectsBack = neighborConnections.some(([bdr, bdc]) => nr + bdr === r && nc + bdc === c);
                    if (connectsBack) {
                        visited.add(`${nr},${nc}`);
                        queue.push({ r: nr, c: nc });
                    }
                }
            }
        }
        
        if (newGrid[END_POS.r][END_POS.c].connected) {
            pathFound = true;
        }

        let hasConnectivityChanged = false;
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c].connected !== newGrid[r][c].connected) {
                    hasConnectivityChanged = true;
                    break;
                }
            }
            if (hasConnectivityChanged) break;
        }

        if (hasConnectivityChanged) {
            setGrid(newGrid);
        }

        if (pathFound && !isComplete) {
            setIsComplete(true);
            setTimeout(onComplete, 1500);
        }

    }, [grid, onComplete, isComplete, CONNECTIONS_BY_INDEX]);

    return (
        <div>
            <div className={`grid grid-cols-5 gap-1 p-2 bg-black/50 border-2 border-cyan-400 rounded-lg mx-auto w-64 h-64 md:w-72 md:h-72`}>
                {grid.map((row, r) => row.map((cell, c) => {
                    const isStart = r === START_POS.r && c === START_POS.c;
                    const isEnd = r === END_POS.r && c === END_POS.c;
                    const isInteractive = !isStart && !isEnd && !isComplete;
                    
                    let bgColor = 'bg-gray-800/50';
                    if (isStart) bgColor = 'bg-green-700/70';
                    if (isEnd) bgColor = 'bg-red-700/70';

                    let textColor = 'text-cyan-400/50';
                    if (cell.connected) textColor = 'text-yellow-300';

                    return (
                        <div key={`${r}-${c}`} onClick={() => isInteractive && rotatePipe(r, c)} className={`flex items-center justify-center text-3xl select-none transition-colors duration-300 ${bgColor} ${textColor} ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}>
                            <span style={{ transform: `rotate(${cell.rotation}deg)`, transition: 'transform 0.2s', display: 'inline-block' }}>
                                {isStart ? '⚡️' : isEnd ? '🎯' : pipes[cell.type]}
                            </span>
                        </div>
                    );
                }))}
            </div>
            {isComplete && <p className="text-yellow-300 font-bold mt-4 text-center">Connexion W.E.B. établie !</p>}
        </div>
    );
};


// --- Mini-jeu 3: Décodage de Séquence Binaire ---
const BinarySequenceGame = ({ onComplete }: { onComplete: () => void }) => {
  const sequenceLength = 5;
  const [correctSequence] = useState(() => Array.from({ length: sequenceLength }, () => Math.random() > 0.5));
  const [playerSequence, setPlayerSequence] = useState(() => Array(sequenceLength).fill(false));
  const [phase, setPhase] = useState<'watching' | 'playing' | 'success' | 'failure'>('watching');
  const [blinkingIndex, setBlinkingIndex] = useState(-1);

  useEffect(() => {
    if (phase !== 'watching') return;
    const timer = setTimeout(() => {
      correctSequence.forEach((_, i) => {
        setTimeout(() => setBlinkingIndex(i), i * 500);
      });
      setTimeout(() => {
        setBlinkingIndex(-1);
        setPhase('playing');
      }, correctSequence.length * 500);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, correctSequence]);

  const toggleLight = (index: number) => {
    if (phase !== 'playing') return;
    const newSequence = [...playerSequence];
    newSequence[index] = !newSequence[index];
    setPlayerSequence(newSequence);
  };

  const checkSequence = () => {
    const isCorrect = JSON.stringify(playerSequence) === JSON.stringify(correctSequence);
    if (isCorrect) {
      setPhase('success');
      onComplete();
    } else {
      setPhase('failure');
      setTimeout(() => {
        setPlayerSequence(Array(sequenceLength).fill(false));
        setPhase('watching');
      }, 1500);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-2 my-4">
        {playerSequence.map((isOn, i) => (
          <div key={i} onClick={() => toggleLight(i)} className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${phase === 'playing' ? 'cursor-pointer' : ''}`} style={{
            borderColor: 'var(--accent-color)',
            backgroundColor: (phase === 'watching' && blinkingIndex === i && correctSequence[i]) || (phase !== 'watching' && playerSequence[i]) ? 'var(--accent-color)' : 'transparent'
          }}></div>
        ))}
      </div>
      <button onClick={checkSequence} disabled={phase !== 'playing'} className="w-full font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--button-text-color)'}}>
        Vérifier Séquence
      </button>
      {phase === 'success' && <p className="text-green-400 mt-2">Décodage réussi !</p>}
      {phase === 'failure' && <p className="text-red-400 mt-2">Erreur de séquence. Réinitialisation...</p>}
    </div>
  );
};


// --- Composant Principal ---
interface MiniGameViewProps {
  miniGame: MiniGame;
  onComplete: () => void;
}

const MiniGameView = ({ miniGame, onComplete }: MiniGameViewProps) => {
    const renderMiniGame = () => {
        switch (miniGame.id) {
            case 'sineWave':
                return <FrequencyTunerGame onComplete={onComplete} />;
            case 'pipeGrid':
                return <PipeGridGame onComplete={onComplete} />;
            case 'binarySequence':
                return <BinarySequenceGame onComplete={onComplete} />;
            default:
                return <p>Mini-jeu non trouvé.</p>;
        }
    };

    return (
        <div className="text-center p-6 md:p-8 rounded-2xl magic-container animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 tracking-wider" style={{ color: 'var(--accent-color)' }}>{miniGame.title}</h2>
            <p className="mb-6" style={{ color: 'var(--text-color)' }}>{miniGame.description}</p>
            {renderMiniGame()}
        </div>
    );
};

export default MiniGameView;