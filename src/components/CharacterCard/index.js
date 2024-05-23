import {Image, GridItem} from "@chakra-ui/react";
import React, { useState } from "react";

const Card = ({title, imageSrc, cardBackImageSrc}) => {
    // Display the name and title on the card component when flipped
    const [cardFlipped, setCardFlipped] = useState(false)

    const currentImage = cardFlipped ? imageSrc : cardBackImageSrc;
    const toggleImage = () => {
        setCardFlipped(!cardFlipped)
    }

    return(
        <GridItem height="20vh" minHeight="5em" minWidth="5em" width="20vh" rounded="xl" borderColor="black" backgroundColor="black" p="5%" shadow="Dark lg" aspectRatio="1/1">
            <Image src={currentImage} alt="Card Image" height="100%" rounded="xl" onClick={toggleImage} />
        </GridItem>
    )
}

export default Card;