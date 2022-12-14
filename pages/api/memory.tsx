import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const Memory = () => {

    const [boardData, setBoardData] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [foundCards, setFoundCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        if (foundCards.length > 0 && foundCards.length == boardData.length) {
            setGameOver(true);
        }
    }, [moves])

    const boardIcons = [
        <Image src="/memory/aries.png" width={75} height={75} key={Date.now()} alt="board icon"/>, 
        <Image src="/memory/bird.png" width={75} height={75} key={Date.now()} alt="board icon"/>, 
        <Image src="/memory/boar.png" width={75} height={75} key={Date.now()} alt="board icon" />, 
        <Image src="/memory/cat.png" width={75} height={75} key={Date.now()} alt="board icon" />, 
        <Image src="/memory/chick.png" width={75} height={75} key={Date.now()} alt="board icon" />, 
        <Image src="/memory/chicken.png" width={75} height={75} key={Date.now()} alt="board icon" />, 
        <Image src="/memory/dog.png" width={75} height={75} key={Date.now()} alt="board icon" />,
        <Image src="/memory/rabbit.png" width={75} height={75} key={Date.now()} alt="board icon" />
    ]

    const shuffle = () => {
        const shuffledCards = [...boardIcons, ...boardIcons]
            .sort(() => Math.random() - 0.5)
            .map((v) => v)
        
        setBoardData(shuffledCards);
    }

    const initialize = () => {
        shuffle()
        setFlippedCards([])
        setFoundCards([])
        setMoves(0)
        setGameOver(false)
    }

    const updateBoardData = (idx) => {

        if(!flippedCards.includes(idx)) {
            if(flippedCards.length == 1) {
                const firstIdx = flippedCards[0]
                const secondIdx = idx;
                
                if(boardData[firstIdx] == boardData[secondIdx]) {
                    setFoundCards([...foundCards, firstIdx, secondIdx])
                }

                setFlippedCards([...flippedCards, idx])  
            }

            else if (flippedCards.length == 2) {
                setFlippedCards([idx])
            } else {
                setFlippedCards([...flippedCards, idx])            
            }

            setMoves((prev) => prev + 1)
        }
    }

    return(
        <>
            <div className="memory">
                <div className="board">
                    { boardData.map((data, idx) => {

                        const flipped = flippedCards.includes(idx)
                        ? "flipped" : "";
                        const found = foundCards.includes(idx)
                        ? "flipped found" : "";

                        return (
                            <div 
                                key={idx} 
                                className={`card ${flipped} ${found}`}
                                onClick={() => updateBoardData(idx)}
                            >
                                <div className="card__front">{data}</div>
                                <div className="card__back"></div>
                            </div>
                        );
                    })}
                </div>
                <div className="menu">
                    <span>Moves: {moves}</span>
                    <button onClick={() => initialize()}>Reset<Image src="/reset.svg" width={15} height={15} alt=""/></button>
                </div>
            </div>
            
        </>
    );
}

export default Memory;