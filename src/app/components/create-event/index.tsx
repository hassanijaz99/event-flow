'use client'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import useGlobalContext from '@/app/hooks/useGlobalContext'
import {
  AlertDialog,
  Box,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import DatePickerComponent from './DatePicker'
import { IEvent } from '@/app/main'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'
import ConfirmDialog from './ConfirmDialog'
import EventLoader from './EventLoader'
import SelectPicker from './SelectPicker'
import { timeZones, times } from '../Sidebar/data'

const eventInitialState = {
  eventName: '',
  date: new Date(),
  timezone: '',
  startTime: '',
  endTime: '',
  description: '',
  videoLink: '',
  banner: null,
}
const validationMap: Record<any, string> = {
  eventName: 'event name',
  date: 'date',
  timezone: 'timezone',
  startTime: 'start time',
  endTime: 'end time',
  description: 'description',
  videoLink: 'video link',
  banner: 'banner',
}
const CreateEvent = ({
  setEventsList,
}: {
  setEventsList: Dispatch<SetStateAction<IEvent[]>>
}) => {
  const { theme } = useGlobalContext()
  const [validationError, setValidationError] = useState('')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [requrieValidation, setRequrieValidation] = useState<string[]>([])
  const [toaster, setToaster] = useState(false)
  const [previousEvent, setPreviousEvent] = useState<IEvent>(eventInitialState)
  const [event, setEvent] = useState<IEvent>(eventInitialState)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])

  const addEventHandler = () => {
    const validatonRequired = []
    for (let [k, v] of Object.entries(event)) {
      if (v || k === 'banner' || k === 'description' || k === 'videoLink')
        continue
      validatonRequired.push(validationMap[k])
      setRequrieValidation((prev) => prev.concat(k))
    }
    if (validatonRequired.length) {
      setValidationError('Missing ' + validatonRequired.join(', '))
    } else {
      console.log({ requrieValidation })
      setRequrieValidation([])
      setValidationError('')
      setToaster(true)
      setPreviousEvent({ ...event })
      setEvent(eventInitialState)
    }
  }

  return (
    <>
      <ConfirmDialog
        title="Confirm"
        open={showConfirmDialog}
        setOpen={setShowConfirmDialog}
        cancelText="Cancel"
        confirmText="Delete"
        msg="You are about to permanently delete this event. This action can't be undone."
        onConfirm={() => {
          setEventsList((prev) => prev.concat(event))
          setEvent(eventInitialState)
          setShowConfirmDialog(false)
        }}
      />

      <Box className={`event-toaster ${theme} ${toaster ? 'block' : 'hidden'}`}>
        <Flex justify="between" align={'center'}>
          <Text
            as="p"
            className="text-md dark:text-white font-medium text-blackOlive"
          >
            Event created on {new Date().toLocaleDateString()}
          </Text>
          <Box
            className="link-btn"
            onClick={() => {
              setEvent({ ...previousEvent })
              setToaster(false)
            }}
          >
            Edit event
          </Box>
          <Box onClick={() => setToaster(false)}>
            <Image
              src={theme == 'dark' ? '/close.png' : '/close-dark.png'}
              className="cursor-pointer"
              height={14}
              width={14}
              alt="info"
            />
          </Box>
        </Flex>
      </Box>

      {loading ? (
        <EventLoader />
      ) : (
        <Box className="mt-16 max-w-[570px]">
          {validationError && (
            <div className="flex gap-2 items-center bg-[#F3000D14] p-2">
              <Image src="/info.svg" height={14} width={14} alt="info" />
              <p className="text-[#C40006D3] break-words">{validationError}</p>
            </div>
          )}
          <Text
            as="p"
            className="text-2xl dark:text-white font-medium text-blackOlive"
          >
            Create an event
          </Text>
          <Text
            as="p"
            mt="3"
            className="text-veryDarkGreen dark:text-lightMintGreen font-light"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </Text>
          <Box mt="9">
            <Box>
              <label
                htmlFor="event-name"
                className="font-medium text-blackOlive dark:text-white"
              >
                Event name
              </label>
              <TextField.Root
                id="event-name"
                value={event['eventName']}
                onChange={({ target }) =>
                  setEvent({ ...event, ['eventName']: target.value })
                }
                mt="2"
                size="3"
                placeholder="Your event name"
                className={twMerge(
                  clsx(
                    'border-transparent !bg-darkForestGreen dark:!bg-lightGrayTransparent',
                    requrieValidation.includes('eventName') &&
                      'border border-validatonBorder'
                  )
                )}
              />
            </Box>
          </Box>
          <Box mt="9">
            <Flex gap="3">
              <Box className="w-full">
                <label
                  htmlFor="date-time"
                  className="font-medium text-blackOlive dark:text-white"
                >
                  Date & time
                </label>
                <Flex align="center" gap="2" className="w-full mobile-block">
                  <DatePickerComponent
                    date={event['date']}
                    setDate={(currentDate) =>
                      setEvent({ ...event, ['date']: currentDate })
                    }
                  />
                  <SelectPicker
                    value={event['timezone']}
                    setValue={(value) =>
                      setEvent({ ...event, ['timezone']: value })
                    }
                    lightIcon={'/globe.svg'}
                    darkIcon={'/globe-dark.svg'}
                    validate={requrieValidation.includes('timezone')}
                    label={'Timezone'}
                    items={timeZones}
                  />
                </Flex>
                <Flex gap="2" my="2" className="w-full mobile-block">
                  <SelectPicker
                    value={event['startTime']}
                    setValue={(value) =>
                      setEvent({ ...event, ['startTime']: value })
                    }
                    lightIcon={'/clock.svg'}
                    darkIcon={'/clock-dark.svg'}
                    validate={requrieValidation.includes('startTime')}
                    label={'Start Time'}
                    items={times}
                  />

                  <SelectPicker
                    value={event['endTime']}
                    setValue={(value) =>
                      setEvent({ ...event, ['endTime']: value })
                    }
                    lightIcon={'/clock.svg'}
                    darkIcon={'/clock-dark.svg'}
                    validate={requrieValidation.includes('endTime')}
                    label={'End Time'}
                    items={times}
                  />
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box mt="9">
            <label
              htmlFor="event-name"
              className="font-medium text-blackOlive dark:text-white"
            >
              Description
            </label>
            <Box mt="2">
              <TextArea
                value={event['description']}
                onChange={({ target }) =>
                  setEvent({ ...event, ['description']: target.value })
                }
                className={twMerge(
                  clsx(
                    'border-transparent !bg-darkForestGreen dark:!bg-lightGrayTransparent',
                    requrieValidation.includes('description') &&
                      'border border-validatonBorder'
                  )
                )}
                placeholder="Add event description..."
              />
            </Box>
          </Box>
          <Box mt="9">
            <label
              htmlFor="video-link"
              className="font-medium text-blackOlive dark:text-white"
            >
              Video
            </label>
            <TextField.Root
              id="video-link"
              mt="2"
              value={event['videoLink']}
              onChange={({ target }) =>
                setEvent({ ...event, ['videoLink']: target.value })
              }
              size="3"
              placeholder="Add video link.."
              className={twMerge(
                clsx(
                  'border-transparent !bg-darkForestGreen dark:!bg-lightGrayTransparent',
                  requrieValidation.includes('videoLink') &&
                    'border border-validatonBorder'
                )
              )}
            >
              <TextField.Slot>
                <Image
                  className="cursor-pointer"
                  src={
                    theme === 'dark'
                      ? '/video-link-dark.svg'
                      : '/video-link.svg'
                  }
                  alt="calender"
                  height="18"
                  width="18"
                />
              </TextField.Slot>
            </TextField.Root>
          </Box>

          <Box mt="4">
            <label className="font-medium text-blackOlive dark:text-white">
              Banner image
            </label>
            {event.banner ? (
              <Image
                src={URL.createObjectURL(event['banner'] as File)}
                alt={event['eventName']}
                width={0}
                height={0}
                className="h-full max-h-52 object-cover w-full mt-4 rounded-md"
              />
            ) : (
              <label
                htmlFor="banner-image"
                className="bg-darkForestGreen dark:bg-lightGrayTransparent cursor-pointer flex justify-center h-[120px] rounded-md mt-2"
              >
                <div className="flex h-full flex-col justify-center items-center">
                  <Text
                    as="p"
                    className="text-forestNight dark:text-lightLimeGreen"
                  >
                    {' '}
                    <span className="border-b border-black dark:border-lightLimeGreen font-bold text-forestNight dark:text-lightLimeGreen">
                      {' '}
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </Text>
                  <Text
                    as="p"
                    className="text-forestNight dark:text-lightLimeGreen"
                  >
                    SVG, PNG, JPG or GIF (recommended size 1024x1024px)
                  </Text>
                </div>
              </label>
            )}

            <input
              className="hidden"
              type="file"
              onChange={({ target }) => {
                if (target.files) {
                  setEvent({ ...event, ['banner']: target.files[0] })
                }
              }}
              id="banner-image"
            />
          </Box>
          <Flex gap="6" mt="8" pb="3">
            <button
              onClick={addEventHandler}
              className="text-darkGreenTranslucent dark:text-mintyGreen dark:bg-neonGreenTransparent py-2 px-3 font-medium bg-darkGreenTransparent rounded-md"
            >
              Create Event
            </button>
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="text-slateGray dark:text-lightGray bg-transparent rounded-md"
            >
              Cancel
            </button>
          </Flex>
        </Box>
      )}
    </>
  )
}

export default CreateEvent
