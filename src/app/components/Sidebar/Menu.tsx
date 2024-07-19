import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Flex } from '@radix-ui/themes'
import { sideMenuDataDark, sideMenuDataLight } from './data'
import clsx from 'clsx'
import useGlobalContext from '@/app/hooks/useGlobalContext'

interface MenuItem {
  text: string
  icon: string
}

const Menu = () => {
  const { theme } = useGlobalContext()
  const [selectedItem, setSelectedItem] = useState<number>(0)

  const sideMenuData: MenuItem[] =
    theme === 'dark' ? sideMenuDataDark : sideMenuDataLight

  const handleItemClick = (index: number) => {
    setSelectedItem(index === selectedItem ? -1 : index)
  }

  return (
    <Flex gap="1" direction="column">
      {sideMenuData.map(({ text, icon }, i) => (
        <Box key={i} className="cursor-pointer">
          <Flex
            gap="3"
            align="center"
            onClick={() => handleItemClick(i)}
            className={clsx(
              `${theme === 'dark' ? 'menu-hover-dark' : 'menu-hover-light'}`,
              'rounded-md bg-opacity-10 p-2',
              {
                'bg-forestGreen dark:bg-neonGreen dark:bg-opacity-10':
                  selectedItem === i,
              }
            )}
          >
            <Image src={icon} width={14} height={14} alt={text} />
            <p
              className={clsx('transition-colors', {
                'dark:text-mintyGreen text-darkGreenTranslucent bg-opacity-10 dark:bg-opacity-10 text-opacity-80 dark:text-opacity-80':
                  selectedItem === i,
                'dark:text-lemonChiffon text-deepTealTranslucent dark:text-opacity-45 text-opacity-50':
                  selectedItem !== i,
              })}
            >
              {text}
            </p>
          </Flex>
        </Box>
      ))}
    </Flex>
  )
}

export default Menu
