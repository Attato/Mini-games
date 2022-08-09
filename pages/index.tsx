import React, { useState, useEffect } from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { tabs } from './api/tabs';
import { motion } from 'framer-motion';

const Home = () => {
	const [page, setPage] = useState(0);
	
	useEffect(() => {
		localStorage.setItem('page number', page.toString());
	}, [page])
	
	useEffect(() => {
		setPage(
			localStorage.getItem('page number')
				? parseInt(localStorage.getItem('page number')!)
				: 0
		);
	}, []);
	
	return (
		<motion.div initial="hidden" whileInView="visible" translate="no">

			<Header />

			<div className="row">
				<div className="sub">
					<div className="sub__column">
						{tabs.map(({ title }, wrap) => {
							const isActive = wrap === page;
							return (
								<a
									key={wrap}
									onClick={() => {
										setPage(wrap);
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
