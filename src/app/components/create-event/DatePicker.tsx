import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from '../DatePicker';
import { Box, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import useGlobalContext from '@/app/hooks/useGlobalContext';

type Props = {
    date: Date;
    setDate: (value: Date) => void;
};

const DatePickerComponent = ({ date = new Date(), setDate }: Props) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { theme } = useGlobalContext(); // Make sure useGlobalContext hook is correctly implemented

    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
            setShowDatePicker(false);
        }
    };

    const toggleDatePicker = () => {
        setShowDatePicker(true)
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevents the click from propagating to the parent and triggering toggleDatePicker
    };


    return (
        <div className='relative md:w-1/2 w-full'>
            <Flex
                justify='between'
                p='2'
                align='center'
                onClick={toggleDatePicker}
                id='Select date(s)...'
                className='flex justify-between rounded-md cursor-pointer bg-darkForestGreen relative dark:bg-lightGrayTransparent w-full'
            >
                <section className='flex gap-2 items-center' onClick={handleDateClick}>
                    <Image
                        src={theme === 'dark' ? '/date-picker-dark.svg' : '/date-picker.svg'}
                        alt='calendar'
                        height={18}
                        width={18}
                    />
                    {
                        date ? (
                            <span className='dark:text-lightGray2/50 text-blackOlive'>{date.toISOString().split('T')[0]}</span>
                        ) : (
                            <span className='dark:text-lightGray2/50 text-blackOlive'>Select date(s)...</span>
                        )
                    }
                </section>
                <Image
                    className='cursor-pointer'
                    src={theme === 'dark' ? '/chevron-down-dark.svg' : '/chevron-down.svg'}
                    alt='select'
                    height={18}
                    width={18}
                />
            </Flex>
            {showDatePicker && (
                <Box ref={datePickerRef} className='absolute top-9 dark:bg-black bg-white shadow-md rounded-md p-4'>
                    <DatePicker defaultDate={date} onDateChange={(date) => {
                        setShowDatePicker(false);
                        setDate(date);
                    }} />
                </Box>
            )}
        </div>
    );
};

export default DatePickerComponent;
