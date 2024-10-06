import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formattedTime(created_time: string): string {
  console.log(created_time);
  const browserOffset = new Date().getTimezoneOffset();
  const createdTimeUTC = dayjs.utc(created_time);
  const createdTimeAdjusted = createdTimeUTC.add(-browserOffset, "minute");
  console.log(createdTimeAdjusted.format("hh:mm A, DD MM YYYY"));
  return createdTimeAdjusted.format("hh:mm A, DD MM YYYY");
}
