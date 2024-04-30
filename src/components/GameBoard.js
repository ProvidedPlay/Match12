import { Grid, VStack, Heading, Box, Image, GridItem } from "@chakra-ui/react"
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
        <VStack background="darkblue" minHeight="100vh" display="flex" > 
            <Heading as="h1" color="white" height="8%">
                Game Board
            </Heading>
            <Grid templateColumns="repeat(4,1fr)" gap={3} height='92' >
                {cards.map((card) => (renderCard(card)))}
                {cards.map((card) => (renderCard(card)))}
            </Grid>
        </VStack>
        </div>

    )
}

export default GameBoard;