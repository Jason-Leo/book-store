import dayjs from "dayjs"

export const fommatDate = (input?: string | number | Date | dayjs.Dayjs): string => {
    const d = input ? dayjs(input) : dayjs()
    return d.isValid() ? d.format('M/D/YYYY') : ''
}