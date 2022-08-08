import React from 'react';
import Head from 'next/head';
import Memory from './memory';
import Snake from './snake'

const MemoryGame = (
	<div key={Date.now()}>
		<Head>
			<title>Memory Game</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Memory Game</h1>
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

		<h1>Snake</h1>
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

		<h1>Chess</h1>
		<div className="body">

		</div>
	</div>
);

const BossFight = (
	<div key={Date.now()}>
		<Head>
			<title>Boss fight</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Boss fight</h1>
		<div className="body">

		</div>
	</div>
);

export const tabs = [
	{ title: 'Memory game', wrap: [MemoryGame] },
	{ title: 'Snake', wrap: [SnakeGame] },
	{ title: 'Chess', wrap: [ChessGame] },
	{ title: 'Boss fight', wrap: [BossFight] },
];
