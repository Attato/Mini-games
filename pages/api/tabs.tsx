import React from 'react';
import Head from 'next/head';
import Memory from './memory';

const MemoryGame = (
	<>
		<Head>
			<title>Memory Game</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Memory Game</h1>
		<div className="body" key={Date.now()}>
			<Memory/>
		</div>
	</>
);

const Snake = (
	<>
		<Head>
			<title>Snake</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Snake</h1>
		<div className="body" key={Date.now()}>

		</div>
	</>
);

const Chess = (
	<>
		<Head>
			<title>Chess</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Chess</h1>
		<div className="body" key={Date.now()}>

		</div>
	</>
);

const BossFight = (
	<>
		<Head>
			<title>Boss fight</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Boss fight</h1>
		<div className="body" key={Date.now()}>

		</div>
	</>
);

export const tabs = [
	{ title: 'Memory game', wrap: [MemoryGame] },
	{ title: 'Snake', wrap: [Snake] },
	{ title: 'Chess', wrap: [Chess] },
	{ title: 'Boss fight', wrap: [BossFight] },
];
