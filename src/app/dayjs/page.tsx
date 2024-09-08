import styles from "./dayjs.module.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

function utcTime() {
  return dayjs().utc().format("YYYY-MM-DD HH:mm:ss A");
}

function utcTime2() {
  let time = '2024-09-06T06:14:38.000Z' // UTC time
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss A"); // Local time
}

function agoTest() {
  let time = '2024-09-08T06:14:38.000Z' // UTC time
  return time + " " + dayjs(time).fromNow();
}

export default function Dayjs() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);

  return <div className={styles.container}>
    <h1>Dayjs Tests</h1>
    <div>
      <p>Current Time: {dayjs().format("YYYY-MM-DD HH:mm:ss A")}</p>
    </div>
    <div>
      <p>Current Time UTC: {utcTime()}</p>
    </div>
    <div>
      <p>UTC time shown in current timezone: {utcTime2()}</p>
    </div>
    <div>
      <p>Time ago test1: {agoTest()}</p>
    </div>
  </div>;
}