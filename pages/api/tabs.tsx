import React from 'react';
import Head from 'next/head';

import Memory from './memory';
import Snake from './snake'
import Chess from './chess';
import Hangman from './hangman'

const MemoryGame = (
	<div className="body" key={Date.now()}>
		<Head>
			<title>Memory Game</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Memory/>
	</div>
);

const SnakeGame = (
	<div className="body" key={Date.now()}>
		<Head>
			<title>Snake</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Snake/>
	</div>
);

const ChessGame = (
	<div className="body" key={Date.now()}>
		<Head>
			<title>Chess</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		
		<Chess/>
	</div>
);

const HangmanGame = (
	<div className="body" key={Date.now()}>
		<Head>
			<title>Hangman</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Hangman/>
	</div>
);

export const tabs = [
	{ title: 'Memory game', wrap: MemoryGame },
	{ title: 'Snake', wrap: SnakeGame },
	{ title: 'Chess', wrap: ChessGame },
	{ title: 'Hangman', wrap: HangmanGame },
];
