import {Image, GridItem} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";

import { useGameManagerContext } from "../../context/GameManagerProvider";
import  useGameStateUpdater  from "../../hooks/useGameStateUpdater"

const Card = ({gameBoardLocationIndex, title, imageSrc, cardBackImageSrc, cardRevealed, currentImage}) => {
    // Display the name and title on the card component when flipped
    const {
        gameRunning,
        gameBoardCardArray,
    } = useGameManagerContext();

    const {processCardFlip} = useGameStateUpdater()

    currentImage = cardRevealed ? imageSrc : cardBackImageSrc;
    const currentCard = gameBoardCardArray[gameBoardLocationIndex]

    const attemptToRevealCard = () => {

        if (!cardRevealed && gameRunning){
            processCardFlip(currentCard)
        }
    }

    return(
        <GridItem height="20vh" minHeight="5em" minWidth="5em" width="20vh" rounded="xl" borderColor="black" backgroundColor="black" p="5%" shadow="Dark lg" aspectRatio="1/1">
            <Image src={currentImage} alt="Card Image" height="100%" rounded="xl" onClick={attemptToRevealCard}/>
            <p>{gameBoardLocationIndex}</p>
        </GridItem>
    )
}

export default Card;