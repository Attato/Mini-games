import React from 'react';
import Head from 'next/head';
import Memory from './memory';
import Snake from './snake'
import Chess from './chess';
import Hangman from './hangman'

const MemoryGame = (
	<div key={Date.now()}>
		<Head>
			<title>Memory Game</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="body">
			<Memory/>
		</div>
	</div>
);

const SnakeGame = (
	<div key={Date.now()}>
		<Head>
			<title>Snake</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="body">
			<Snake/>
		</div>
	</div>
);

const ChessGame = (
	<div key={Date.now()}>
		<Head>
			<title>Chess</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="body">
			<Chess/>
		</div>
	</div>
);

const HangmanGame = (
	<div key={Date.now()}>
		<Head>
			<title>Hangman</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="body">
			<Hangman/>
		</div>
	</div>
);

export const tabs = [
	{ title: 'Memory game', wrap: MemoryGame },
	{ title: 'Snake', wrap: SnakeGame },
	{ title: 'Chess', wrap: ChessGame },
	{ title: 'Hangman', wrap: HangmanGame },
];
