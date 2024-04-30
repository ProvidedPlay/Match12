import { HStack, VStack, Heading, Box, Image } from "@chakra-ui/react"
import Card from "./Card"

const cards = [
    {
        title: "Boba",
        getImageSrc: () => require(`../images/boba.png`)
    },    
    {
        title: "C3p0",
        getImageSrc: () => require("../images/c3p0.png")
    },    
    {
        title: "Chewie",
        getImageSrc: () => require("../images/chewie.png")
    },    
    {
        title: "Jawa",
        getImageSrc: () => require("../images/jawa.png")
    },    
    {
        title: "R2d2",
        getImageSrc: () => require("../images/r2d2.png")
    },    
    {
        title: "Stormtrooper",
        getImageSrc: () => require("../images/stormtrooper.png")
    },    
    {
        title: "Vader",
        getImageSrc: () => require("../images/vader.png")
    },    
    {
        title: "Yoda",
        getImageSrc: () => require("../images/yoda.png")
    },    

];

const renderCard = (cardData) => {

    return(
        <Card
        key = {cardData.title}
        title= {cardData.title}
        imageSrc = {cardData.getImageSrc()}
        />
    )
}

const GameBoard = () =>{
    return(
        <div>
        <VStack background="darkblue">
            <Heading as="h1">
                Game Board
            </Heading>
            <Box
            displays="grid"
            gridTemplateColumns="repeat(4,minmax(0,1fr)"
            gridGap = {8}
            >
                {cards.map((card) => (renderCard(card)))}
            </Box>
        </VStack>
        </div>

    )
}

export default GameBoard;