import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box} from '@radix-ui/themes'

const EventLoader = () => {
    return (
        <Box className='mt-16 max-w-[570px]'>
            <Skeleton width={100} />

            <Skeleton count={1} height={30}/>

            <Box mt='9'>
                <Skeleton count={1} height={60}/>
            </Box>
            <Box mt='9'>
                <Skeleton count={1} height={100}/>
            </Box>

            <Box mt='9'>
                <Skeleton count={1} height={100}/>

            </Box>
            <Box mt='9'>
                <Skeleton count={1} height={60}/>
            </Box>


            <Box my='4'>
                <Skeleton count={1} height={125}/>
            </Box>
        </Box>
    )
}

export default EventLoader
