'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { colors } from '@/lib/colors'
import { getAttributionParams } from '@/lib/utm'

export default function CalFloatingButton() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })

      // Attribution rides along as booking metadata, so a demo booked from a
      // campaign shows its source in Cal.com rather than reading as direct.
      const attribution = getAttributionParams()

      cal('floatingButton', {
        calLink: 'credmatrix/30min',
        buttonText: 'Book a Demo',
        buttonPosition: 'bottom-right',
        buttonColor: colors.primary.DEFAULT,
        buttonTextColor: colors.white,
        config: {
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
          ...attribution,
        },
      })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': colors.primary.DEFAULT },
          dark: { 'cal-brand': colors.primary.DEFAULT },
        },
      })
    })()
  }, [])

  return null
}
