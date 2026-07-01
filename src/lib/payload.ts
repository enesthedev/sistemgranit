import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

/** Request-memoised Payload Local API client. */
export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})
