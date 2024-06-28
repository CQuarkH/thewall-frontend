import { format } from "@formkit/tempo";

export const formatDateToLocaleReadable = (date: Date): string => {
    return format(date, { date: 'medium', time: 'short' }, 'es')
}