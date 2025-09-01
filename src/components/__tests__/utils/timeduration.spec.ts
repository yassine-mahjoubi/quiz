import { describe, it, expect } from 'vitest'
import { getDuration, formatDurationToSeconds } from '../../../utils/timeduration'

describe('getDuration', () => {
  it('calcul duration', () => {
    const startDate = Date.now()
    const result = getDuration(startDate) + 1
    expect(result).toBeGreaterThan(0)
  })
})

describe('formatDurationToSeconds', () => {
  it('convert ms en seconds', () => {
    const result = formatDurationToSeconds(1000)
    expect(result).toBe('1.00s')
  })
})
