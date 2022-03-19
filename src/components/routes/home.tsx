import { Box, Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { IItemContext, useItem } from "../../provider/item-provider";

interface IAction {
  title: string;
  description: string;
  icon: string;
}

function Home() {
  const { items, setItems }: IItemContext = useItem();

  const actions: IAction[] = [
    { title: "action1", description: "", icon: "" },
    { title: "action2", description: "", icon: "" },
    { title: "action3", description: "", icon: "" },
    { title: "action4", description: "", icon: "" },
  ];

  const responsiveCarousel = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Box px={"70px"}>
      <HStack justifyContent={"space-between"}>
        <VStack>
          <Text fontSize="6xl" fontWeight={"bold"}>
            monitor your wallet
          </Text>
          <Text fontSize={"4xl"} mt="20px">
            you can track and create your portfolio.
          </Text>
          <HStack>
            <Button w={"150px"} h={"50px"} mr={"5px"}>
              Explore
            </Button>
            <Link
              href="/wallet"
              boxShadow="lg"
              borderBottomRadius={"15px"}
              ml={"5px"}
            >
              <Button w={"150px"} h={"50px"}>
                Create
              </Button>
            </Link>
          </HStack>
        </VStack>

        <Box boxShadow="lg" borderBottomRadius={"15px"}>
          <Box w={"600px"}>
            <Image src={"spx.jpg"} borderTopRadius="15px" />
          </Box>
          <Box my={"20px"}>
            <Image />
            <VStack alignItems={"baseline"} ml={"20px"}>
              <Text>wallet name</Text>
              <Text>owner's name</Text>
            </VStack>
          </Box>
        </Box>
      </HStack>

      <Box>
        <Text fontSize="4xl" fontWeight={"bold"} my={"60px"}>
          Item
        </Text>
        <Carousel responsive={responsiveCarousel}>
          {items?.data?.map((item) => {
            const { attributes, id } = item;
            return (
              <Box
                border={"1px solid black"}
                w={"400px"}
                h={"600px"}
                borderRadius={"10px"}
              >
                <Box>{attributes?.isin}</Box>
              </Box>
            );
          })}
        </Carousel>
      </Box>

      <Box mb={"60px"}>
        <Text fontSize="4xl" fontWeight={"bold"} my={"60px"}>
          Create
        </Text>
        <HStack justifyContent={"space-between"}>
          {actions.map((action) => {
            return (
              <Box>
                <Text>{action?.title}</Text>
                <Text>{action?.description}</Text>
              </Box>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}

export default Home;
