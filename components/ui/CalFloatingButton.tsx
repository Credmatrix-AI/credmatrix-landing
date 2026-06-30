'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { colors } from '@/lib/colors'

export default function CalFloatingButton() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('floatingButton', {
        calLink: 'credmatrix/30min',
        buttonText: 'Book a Demo',
        buttonPosition: 'bottom-right',
        buttonColor: colors.primary.DEFAULT,
        buttonTextColor: colors.white,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
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
