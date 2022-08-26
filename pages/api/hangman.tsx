import React, { useState, useEffect } from 'react';

const words = [
	{ description: 'Mixture of gases required for breathing', word: 'air' },
	{ description: 'Tool for opening locks', word: 'key' },
	{ description: 'The only star in the solar system', word: 'sun' },
	{ description: 'Mechanical self-propelled vehicle used for the transport of people or goods by road', word: 'car'},
	{ description: 'Writing affiliation', word: 'pen' },
	{ description: 'Tool for chopping wood', word: 'axe' },
	{ description: 'A container used to store or transport its contents', word: 'box'},
	{ description: 'Baked pastry dish', word: 'pie' },
	{ description: 'Frozen water', word: 'ice' },
	{ description: 'The full cycle of changing seasons', word: 'year' },
	{ description: 'A paper carrier of information ', word: 'book' },
	{ description: 'A continuous sequence of events that occurs in a seemingly irreversible sequence from the past, through the present, into the future.', word: 'time'},
	{ description: 'Permanent and densely populated place with an administrative orientation of boundaries', word: 'city'},
	{ description: 'A rodent that loves cheese', word: 'mouse' },
	{ description: 'A fin projectile fired from a bow.', word: 'arrow' },
	{ description: 'Universal equivalent, acting as a measure of the cost of goods or services', word: 'money'},
	{ description: 'What kind of animal does a wizard turn his enemies into', word: 'sheep'},
];

let allWords = words.map((i) => i.word);

let selectedWord = allWords[Math.floor(Math.random() * allWords.length)];

const Figure = ({ wrongLetters }) => {
	const errors = wrongLetters.length;

	return (
		<svg height="250" width="200" className="figure">
			{/* <!-- Виселица --> */}
			<line x1="60" y1="20" x2="140" y2="20" />
			<line x1="140" y1="20" x2="140" y2="50" />
			<line x1="60" y1="20" x2="60" y2="230" />
			<line x1="20" y1="230" x2="100" y2="230" />

			{/* <!-- Голова --> */}
			{errors > 0 && <circle cx="140" cy="70" r="20" />}

			{/* <!-- Тело --> */}
			{errors > 1 && <line x1="140" y1="90" x2="140" y2="150" />}

			{/* <!-- Руки --> */}
			{errors > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
			{errors > 3 && <line x1="140" y1="120" x2="160" y2="100" />}

			{/* <!-- Ноги --> */}
			{errors > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
			{errors > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
		</svg>
	);
};

const Word = ({ selectedWord, correctLetters }) => {

	// Тут я ищу подходящий description по полученному слову

	let obj = words.find((i) => i.word === selectedWord);

	return (
		<>
			<div className="description">
				<p>{obj.description}</p>
			</div>

			<div className="word">
				{selectedWord.split('').map((letter, i) => {
					return (
						<span className="letter" key={i}>
							{correctLetters.includes(letter) ? letter : ''}
						</span>
					);
				})}
			</div>
		</>
	);
};

const WrongLetters = ({ wrongLetters }) => {
	return (
		<div className="wrong__letters">
			<div>
				{wrongLetters.length > 0 && <p>Wrong</p>}
				{wrongLetters
					.map((letter, i) => <span key={i}>{letter}</span>)
					.reduce(
						(prev, curr) => (prev === null ? [curr] : [prev, ', ', curr]),
						null
					)}
			</div>
		</div>
	);
};

const Popup = ({
	correctLetters,
	wrongLetters,
	selectedWord,
	setPlayable,
	playAgain,
}) => {
	let playable = true;

	if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
		playable = false;
	} else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
		playable = false;
	}

	useEffect(() => {
		setPlayable(playable);
	});

	return (
		<div
			className={
				checkWin(correctLetters, wrongLetters, selectedWord) !== ''
					? 'popup__wrap flex'
					: 'popup__wrap'
			}
		>
			<div className="popup">
				<h2>
					{checkWin(correctLetters, wrongLetters, selectedWord) === 'win'
						? 'Congratulations! You won! 😃'
						: 'Unfortunately you lost. 😕'}
				</h2>
				<h3>
					{checkWin(correctLetters, wrongLetters, selectedWord) === 'win'
						? 'you guessed the word'
						: 'the word was'}
					<span>{selectedWord}</span>
				</h3>
				<button onClick={playAgain}>Play Again</button>
			</div>
		</div>
	);
};

function checkWin(correct, wrong, word) {
	let status = 'win';

	// Проверка на победу
	word.split('').forEach((letter) => {
		if (!correct.includes(letter)) {
			status = '';
		}
	});

	// Проверка на поражение
	if (wrong.length === 6) status = 'lose';

	return status;
}

const Hangman = () => {
	const [playable, setPlayable] = useState(true);
	const [correctLetters, setCorrectLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);

	useEffect(() => {
		const handleKeydown = (event) => {
			const { key, keyCode } = event;

			if (playable && keyCode >= 65 && keyCode <= 90) {
				const letter = key.toLowerCase();
				if (selectedWord.includes(letter)) {
					if (!correctLetters.includes(letter)) {
						setCorrectLetters((currentLetters) => [...currentLetters, letter]);
					}
				} else {
					if (!wrongLetters.includes(letter)) {
						setWrongLetters((currentLetters) => [...currentLetters, letter]);
					}
				}
			}

			// Рестарт на Enter 
			if (!playable && keyCode === 13) {
				playAgain();
			}
		};
		window.addEventListener('keydown', handleKeydown);

		return () => window.removeEventListener('keydown', handleKeydown);
	}, [correctLetters, wrongLetters, playable]);

	function playAgain() {
		setPlayable(true);

		setCorrectLetters([]);
		setWrongLetters([]);

		const random = Math.floor(Math.random() * allWords.length);
		selectedWord = allWords[random];
	}

	return (
		<div className="hangman">
			<div className="hangman__wrap">
				<Figure wrongLetters={wrongLetters} />
				<WrongLetters wrongLetters={wrongLetters} />
				<Word selectedWord={selectedWord} correctLetters={correctLetters} />
			</div>
			<Popup
				correctLetters={correctLetters}
				wrongLetters={wrongLetters}
				selectedWord={selectedWord}
				setPlayable={setPlayable}
				playAgain={playAgain}
			/>
		</div>
	);
};

export default Hangman;
