import React, { useState, useEffect } from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { tabs } from './api/tabs';
import { motion } from 'framer-motion';

const Home = () => {

	const [[page], setPage] = useState([0, null]);
	
	useEffect(() => {
		setPage(JSON.parse(localStorage.getItem('page number')));
		console.log(JSON.parse(localStorage.getItem('page number')));
	}, [])
	
	useEffect(() => {
		localStorage.setItem('page number', JSON.stringify([page]));
	}, [page])
	
	return (
		<div translate="no">
			<Header />

			<div className="row">
				<div className="sub">
					<div className="sub__column">
						{tabs.map(({ title }, activePage) => {
							const isActive = activePage === page;
							return (
								<a
									key={activePage}
									className={isActive ? 'active__tab' : ''}
									onClick={() => {setPage([activePage, activePage - page])}}
								>
									{title}
								</a>
							);
						})}
					</div>
				</div>

				<motion.div
					key={page}
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0 }}
				>
					{tabs[page].wrap}
				</motion.div>
			</div>

			<Footer />
		</div>
	);
};


export default Home;
