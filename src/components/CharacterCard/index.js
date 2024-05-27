import {Image, GridItem, ScaleFade, useDisclosure} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";

import { useGameManagerContext } from "../../context/GameManagerProvider";
import  useGameStateUpdater  from "../../hooks/useGameStateUpdater"

const Card = ({gameBoardLocationIndex, title, imageSrc, cardBackImageSrc, cardRevealed, currentImage, cardSolved}) => {
    // Display the name and title on the card component when flipped
    const {
        gameRunning,
        gameBoardCardArray,
    } = useGameManagerContext();

    const {processCardFlip} = useGameStateUpdater()
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:true})

    currentImage = cardRevealed ? imageSrc : cardBackImageSrc;
    const currentCard = gameBoardCardArray[gameBoardLocationIndex]

    const attemptToRevealCard = () => {

        if (!cardRevealed && gameRunning){
            processCardFlip(currentCard)
        }
    }

    const solveCard = () => {
        if(!cardSolved){
            onOpen()
        }
        if(cardSolved){
            onClose()
        }
    }

    useEffect(() => {
        solveCard();
    }, [cardSolved])

    return(
        <ScaleFade in={isOpen} initialScale={1} transition={{ exit: {duration: 0.2} }}>
            <GridItem 
            id="characterCard" height="20vh" minHeight="5em" minWidth="5em" width="20vh" rounded="xl" borderColor="black" backgroundColor="black" p="5%" shadow="Dark lg" aspectRatio="1/1" 
            _hover={!cardRevealed? {cursor: "pointer", transform: "scale(1.03)", transitionProperty: "transform", transitionDuration: ".08s", transitionTimingFunction: "ease-in-out"} : {}}
            >
                <Image src={currentImage} alt="Card Image" height="100%" rounded="xl" onClick={attemptToRevealCard} />
            </GridItem>
        </ScaleFade>
    )
}

export default Card;