import React from 'react'
import Menu from './Menu'
import TodayEvents from './TodayEvents'
import { Box, Flex, Switch, Text } from '@radix-ui/themes'
import Image from 'next/image'
import useGlobalContext from '@/app/hooks/useGlobalContext'

const Sidebar = () => {
  const { theme, setTheme } = useGlobalContext()

  return (
    <Box className="w-full">
      {theme === 'dark' ? (
        <Image src="/logo-dark.svg" width={150} height={28} alt="logo" />
      ) : (
        <Image src="/logo.svg" width={150} height={28} alt="logo" />
      )}
      <Box mt="8">
        <Menu />
        <TodayEvents />
        <Flex gap="2" align="center" mt={'8rem'}>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
          <Text as="p" className="text-blackOlive dark:text-white">
            Dark Mode
          </Text>
        </Flex>
        <Text
          as="p"
          mt="2"
          className="dark:text-mintyGreen text-darkGreenTranslucent text-sm text-opacity-80"
        >
          Terms of Use
        </Text>
        <Text
          as="p"
          mt="2"
          className="dark:text-mintyGreen text-darkGreenTranslucent text-sm text-opacity-80"
        >
          Privacy Policy
        </Text>
      </Box>
    </Box>
  )
}

export default Sidebar
