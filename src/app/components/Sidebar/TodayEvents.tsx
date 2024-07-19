import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { sidebarEventsData } from "./data";
import useGlobalContext from "@/app/hooks/useGlobalContext";

const TodayEvents = () => {
  const { theme } = useGlobalContext();

  return (
    <Box mt='8' className="w-full">
      <Text as="p" className="dark:text-mintWhisper deepForestGreen text-opacity-35">Todays Events</Text>
      <Flex direction="column" mt='4'>
        {sidebarEventsData.map(({ icon, title, subtitle }, i) => (
          <Flex align='center' gap="3" my='1' p="2" key={i} className={`${theme == 'dark' ? 'menu-hover-dark' : 'menu-hover-light'} rounded-md`}>
            <Image height={32} width={32} src={icon} alt={title} />
            <Box>
              <Text as="p" className="font-light text-sm">{title}</Text>
              <Text as="p" className="font-bold text-blackOlive dark:text-white">{subtitle}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default TodayEvents;
