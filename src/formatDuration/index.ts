import defaultLocale from '../locale/en-US/index'
import { Duration } from '../types
import { FormatDurationOptions } from '../_types/Options'

const defaultFormat = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
]

/**
 * @name formatDuration
 * @category Common Helpers
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param duration - The duration to format
 * @param [options] - The options object

 * @param [options.format=['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']] - The array of units to format
 * @param [options.zero=false] - should be zeros be included in the output?
 * @param [options.delimiter=' '] - delimiter string
 * @returns The formatted date string
 * 
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, null, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
export default function formatDuration(
  duration: Duration,
  options: FormatDurationOptions = {}
) {
  if (arguments.length < 1) {
    throw new TypeError(
      `1 argument required, but only ${arguments.length} present`
    )
  }

  const format = options.format || defaultFormat
  const locale = options.locale || defaultLocale
  const zero = options.zero || false
  const delimiter = options.delimiter || ' '

  const result = format
    .reduce((acc, unit) => {
      const token = `x${unit.replace(/(^.)/, (m) => m.toUpperCase())}`
      const addChunk =
        typeof duration[unit] === 'number' && (zero || duration[unit])
      return addChunk
        ? acc.concat(locale.formatDistance(token, duration[unit]))
        : acc
    }, [])
    .join(delimiter)

  return result
}