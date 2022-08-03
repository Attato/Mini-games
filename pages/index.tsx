import React, { useState, useEffect } from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { tabs } from './api/tabs';
import { motion } from 'framer-motion';

const Home = () => {
	const [[page], setPage] = useState([0, 0]);

	useEffect(() => {
		setPage(JSON.parse(localStorage.getItem('page number')));
		console.log(JSON.parse(localStorage.getItem('page number')));
	}, [])
	
	useEffect(() => {
		localStorage.setItem('page number', JSON.stringify([page]));
	}, [page])

	return (
		<motion.div initial="hidden" whileInView="visible" translate="no">

			<Header />

			<div className="row">
				<div className="sub">
					<div className="sub__column">
						{tabs.map(({ title }, i) => {
							const isActive = i === page;
							return (
								<a
									key={i}
									onClick={() => {
										setPage([i, i - page]);
									}}
									className={isActive ? 'hover' : ''}
								>
									{title}
								</a>
							);
						})}
					</div>
				</div>

				<motion.section
					key={page}
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0 }}
				>
					{tabs[page].wrap}
				</motion.section>
			</div>

			<Footer />
		</motion.div>
	);
};

export default Home;
