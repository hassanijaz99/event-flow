import React from 'react'
import Image from 'next/image'
import { Box, Flex } from '@radix-ui/themes'
import useGlobalContext from '@/app/hooks/useGlobalContext'

const Search = () => {
    const { theme } = useGlobalContext();
    return (
        <Flex justify='between' gap='2' align='center' className='w-full'>
            <Box className='relative max-w-96 w-full'>
                <input placeholder='Search ShowOps' type="text" className='p-2 w-full ps-8 border rounded-lg dark:border-pastelGreenTransparent border-opacity-40 dark:bg-transparent' />
                <Image className='absolute left-2 top-3' src={theme === 'dark' ? '/search-dark.svg' : '/search.svg'} alt='search' width={16} height={16} />
                <Image className='absolute right-2 top-4' src={theme === 'dark' ? '/search-hint-dark.svg' : '/search-hint.svg'} alt='search-hint' width={theme === 'dark' ? 32 : 20} height={theme === 'dark' ? 32 : 20} />
            </Box>
            <Flex gap='2' align='center'>
                <Image src='/bell.svg' className='bg-darkForestGreen p-2 dark:bg-white dark:bg-opacity-10' alt='notifications' width={28} height={28} />
                <Image src='/profile.svg' alt='profile' className='p-1' width={38} height={38} />
            </Flex>
        </Flex>
    )
}

export default Search