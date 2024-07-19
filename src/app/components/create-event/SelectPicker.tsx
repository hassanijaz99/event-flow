import { Button, DropdownMenu, Flex } from '@radix-ui/themes';
import React from 'react';
import Image from 'next/image'
import useGlobalContext from '@/app/hooks/useGlobalContext';

type Props = {
    items: array;
    lightIcon: string;
    darkIcon: string;
    label: string;
    value: string;
    validate: boolean;
    setValue: (value: string) => void
}

const TimeZoneSelect = (props: Props) => {
    const { items, label, value, setValue, lightIcon, darkIcon, validate } = props

    const { theme } = useGlobalContext();

    return (
        <div className='md:w-1/2 w-full'>

            <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <Button variant="soft" color='gray' size="3" className={`timezone-btn ${validate && 'border border-validatonBorder'}`}>
                        <Flex gap={'2'}><Image className='cursor-pointer' src={theme === 'dark' ? darkIcon : lightIcon}
                            alt='calender' height="18" width="18" />
                            {value != '' ? value : label} </Flex>
                        <Image className='cursor-pointer' src={theme === 'dark' ? '/chevron-down-dark.svg' : '/chevron-down.svg'}
                            alt='calender' height="18" width="18" />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content style={{ minWidth: '275px'}}>
                    {items.map((item, key) => (

                        <DropdownMenu.Item className={`${theme == 'dark' ? 'select-item' : 'select-item-light'} ${value == item.value ? 'select-item-selected' : ''}`} color="green" key={key} onClick={() => setValue(item.value)}>{item.label}</DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>

    );
}

export default TimeZoneSelect;
