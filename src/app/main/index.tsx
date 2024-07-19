"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar/index";
import { Box, Flex } from "@radix-ui/themes";
import Search from "../components/search";
import CreateEvent from "../components/create-event";

export type IEvent = {
  eventName: string;
  date: Date;
  timezone: string;
  startTime: string;
  endTime: string;
  description: string;
  videoLink: string;
  banner: null | File;
}

const Home = () => {
  const [eventsList, setEventsList] = useState<IEvent[]>([]);
  return (
    <Box pt="6" className="container px-6">
      <Flex gap='8'>
        <Box className="max-w-64 w-full sidebar">
          <Sidebar />
        </Box>
        <Box className="w-full">
          <Search />
          <CreateEvent setEventsList={setEventsList} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
