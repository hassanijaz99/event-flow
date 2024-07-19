import React, { Dispatch, SetStateAction } from 'react'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

type Props = {
    title: string, open: boolean, msg: string, cancelText: string, confirmText: string, setOpen: Dispatch<SetStateAction<boolean>>, onConfirm: () => void
}
const ConfirmDialog = ({ title, open, msg, cancelText, confirmText, setOpen, onConfirm }: Props) => {
    return (
        <AlertDialog.Root open={open}>

            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {msg}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button onClick={() => setOpen(false)} variant="soft" color="gray">
                            {cancelText}
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button onClick={onConfirm} variant="solid" color="red">
                            {confirmText}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default ConfirmDialog