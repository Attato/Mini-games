import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

const useInterval = (callback: TimerHandler, delay: Delay) => {
	const savedCallbackRef = useRef<TimerHandler>();

	useEffect(() => {
		savedCallbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const handler = (...args: any[]) => savedCallbackRef.current!(...args);

		if (delay !== null) {
			const intervalId = setInterval(handler, delay);
			return () => clearInterval(intervalId);
		}
	}, [delay]);
};

type Apple = {
	x: number;
	y: number;
};

type Velocity = {
	dx: number;
	dy: number;
};

const Snake = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasWidth = 480;
	const canvasHeight = 380;
	const canvasGridSize = 20;

	const minGameSpeed = 10;
	const maxGameSpeed = 15;

	const [gameDelay, setGameDelay] = useState<number>(1000 / minGameSpeed);

	const [running, setRunning] = useState(false);
	const [isLost, setIsLost] = useState(false);
	const [highscore, setHighscore] = useState(0);
	const [score, setScore] = useState(0);
	const [snake, setSnake] = useState<{
		head: { x: number; y: number };
		trail: Array<any>;
	}>({
		head: { x: 12, y: 9 },
		trail: [],
	});
	const [apple, setApple] = useState<Apple>({ x: -2, y: -1 });
	const [velocity, setVelocity] = useState<Velocity>({ dx: 0, dy: 0 });
	const [previousVelocity, setPreviousVelocity] = useState<Velocity>({
		dx: 0,
		dy: 0,
	});

	const clearCanvas = (ctx: CanvasRenderingContext2D) =>
		ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);

	const generateApplePosition = (): Apple => {
		const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize));
		const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize));

		// Проверка на генерацию яблока вне змейки
		if (
			(snake.head.x === x && snake.head.y === y) ||
			snake.trail.some((snakePart) => snakePart.x === x && snakePart.y === y)
		) {
			return generateApplePosition();
		}
		return { x, y };
	};

	// Инициализация состояния
	const startGame = () => {
		setGameDelay(1000 / minGameSpeed);
		setIsLost(false);
		setScore(0);
		setSnake({
			head: { x: 12, y: 9 },
			trail: [],
		});
		setApple(generateApplePosition());
		setVelocity({ dx: 0, dy: -1 });
		setRunning(true);
	
	};

	// Сброс состояния и запись рекорда
	const gameOver = () => {
		if (score > highscore) {
			setHighscore(score);
			localStorage.setItem('highscore', score.toString());
		}
		setIsLost(true);
		setRunning(false);
		setVelocity({ dx: 0, dy: 0 });
		
	};

	const fillRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number
	) => {
		ctx.fillRect(x, y, w, h);
	};

	const strokeRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number
	) => {
		ctx.strokeRect(x + 0.5, y + 0.5, w, h);
	};

	const drawSnake = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = '#0170F3';
		ctx.strokeStyle = '#003779';

		fillRect(
			ctx,
			snake.head.x * canvasGridSize,
			snake.head.y * canvasGridSize,
			canvasGridSize,
			canvasGridSize
		);

		strokeRect(
			ctx,
			snake.head.x * canvasGridSize,
			snake.head.y * canvasGridSize,
			canvasGridSize,
			canvasGridSize
		);

		snake.trail.forEach((snakePart) => {
			fillRect(
				ctx,
				snakePart.x * canvasGridSize,
				snakePart.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);

			strokeRect(
				ctx,
				snakePart.x * canvasGridSize,
				snakePart.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);
		});
	};

	const drawApple = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = '#DC3030'; 	 // Альтернатива '#38C172' (Зелёное) // '#F4CA64' (Жёлтое)
		ctx.strokeStyle = '#881A1B'; // Альтернатива '#187741' (Зелёное) // '#8C6D1F' (Жёлтое)

		if (
			apple &&
			typeof apple.x !== 'undefined' &&
			typeof apple.y !== 'undefined'
		) {
			fillRect(
				ctx,
				apple.x * canvasGridSize,
				apple.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);

			strokeRect(
				ctx,
				apple.x * canvasGridSize,
				apple.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);
		}
	};

	const updateSnake = () => {
		// Переход на другой конец стены
		const nextHeadPosition = {
			x: snake.head.x + velocity.dx,
			y: snake.head.y + velocity.dy,
		};
		
		if (nextHeadPosition.x < 0) {
			nextHeadPosition.x = 24;
		} else if (nextHeadPosition.x >= 24) {
			nextHeadPosition.x = 0;
        }
        
		if (nextHeadPosition.y < 0) {
			nextHeadPosition.y = 19;
		} else if (nextHeadPosition.y >= 19) {
			nextHeadPosition.y = 0;
        }

		//	Инкрементирование хвостика
		if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
			setScore((prevScore) => prevScore + 1);
			setApple(generateApplePosition());
		}

		const updatedSnakeTrail = [...snake.trail, { ...snake.head }];

		// Длина змейки 3 по умолчанию
		while (updatedSnakeTrail.length > score + 2) updatedSnakeTrail.shift();
		// Столкновение с собой
		if (
			updatedSnakeTrail.some(
				(snakePart) =>
					snakePart.x === nextHeadPosition.x &&
					snakePart.y === nextHeadPosition.y
			)
		) 
			gameOver();
			

		setPreviousVelocity({ ...velocity });
		setSnake({
			head: { ...nextHeadPosition },
			trail: [...updatedSnakeTrail],
		});
	};

	useEffect(() => {
		const canvas = canvasRef?.current;
		const ctx = canvas?.getContext('2d');

		if (ctx && !isLost) {
			clearCanvas(ctx);
			drawApple(ctx);
			drawSnake(ctx);
		}
	}, [snake]);

	useInterval(
		() => {
			if (!isLost) {
				updateSnake();
			}
		},
		running ? gameDelay : null
	);

	// DidMount хук на хранение рекорда в localStorage
	useEffect(() => {
		setHighscore(
			localStorage.getItem('highscore')
				? parseInt(localStorage.getItem('highscore')!)
				: 0
		);
	}, []);

	// Ускорение игры
	useEffect(() => {
		if (score > minGameSpeed && score <= maxGameSpeed) {
			setGameDelay(1000 / score);
		}
	}, [score]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				[
					'ArrowUp',
					'ArrowDown',
					'ArrowLeft',
					'ArrowRight',
					'w',
					'a',
					's',
					'd',
				].includes(e.key)
			) {
				let velocity = { dx: 0, dy: 0 };

				switch (e.key) {
					case 'ArrowRight':
						velocity = { dx: 1, dy: 0 };
						break;
					case 'ArrowLeft':
						velocity = { dx: -1, dy: 0 };
						break;
					case 'ArrowDown':
						velocity = { dx: 0, dy: 1 };
						break;
					case 'ArrowUp':
						velocity = { dx: 0, dy: -1 };
						break;
					case 'd':
						velocity = { dx: 1, dy: 0 };
						break;
					case 'a':
						velocity = { dx: -1, dy: 0 };
						break;
					case 's':
						velocity = { dx: 0, dy: 1 };
						break;
					case 'w':
						velocity = { dx: 0, dy: -1 };
						break;
					default:
						console.error('Error with handleKeyDown');
				}
				if (
					!(
						previousVelocity.dx + velocity.dx === 0 &&
						previousVelocity.dy + velocity.dy === 0
					)
				) {
					setVelocity(velocity);
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [previousVelocity]);

	return (
		<div className="snake">
				<canvas
					ref={canvasRef}
					width={canvasWidth}
					height={canvasHeight}
				/>

                <div className="menu">
                    <div className="score">
                        <span>Score: {score}</span>
                        <span>Highscore: {highscore > score ? highscore : score}</span>
                    </div>

                    <button onClick={startGame}>
                    {
                        running ? <div className="btn">Restart game <Image src="/reset.svg" width={15} height={15} alt=""/></div> : <div className="btn">Start game <Image  src="/start.svg" width={15} height={15} alt=""/></div>
                    }
                    </button>
                </div>
		</div>
	);
};

export default Snake;