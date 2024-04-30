import {Image, GridItem} from "@chakra-ui/react";
import React from "react";

const Card = ({title, imageSrc}) => {
    // Display the name and title on the card component when flipped

    return(
        <GridItem height="20vh" minHeight="5em" minWidth="5em" width="20vh" rounded="xl" borderColor="black" backgroundColor="black" p="5%" shadow="Dark lg" aspectRatio="1/1">
            <Image src={imageSrc} alt="Card Image" height="100%" rounded="xl" />
        </GridItem>
    )
}

export default Card;