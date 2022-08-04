import React from 'react';
import Head from 'next/head';

const MemoryGame = (
	<>
		<Head>
			<title>Memory Game</title>
			<meta name="description" content="" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h1>Memory Game</h1>
		<div className="body" key={Date.now()}>

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

		<div className="body" key={Date.now()}>
			<h1>Snake</h1>
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
		<div className="body" key={Date.now()}>
			<h1>Chess</h1>
		</div>
	</>
);

const BossFight = (
	<>
		<div className="body" key={Date.now()}>
			<Head>
				<title>Boss fight</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Boss fight</h1>
		</div>
	</>
);

export const tabs = [
	{ title: 'Memory game', wrap: [MemoryGame] },
	{ title: 'Snake', wrap: [Snake] },
	{ title: 'Chess', wrap: [Chess] },
	{ title: 'Boss fight', wrap: [BossFight] },
];
