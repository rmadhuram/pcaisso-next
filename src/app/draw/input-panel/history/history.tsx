import styles from "./history.module.scss";

function HistoryItem({
  ago,
  prompt,
  liked,
}: {
  ago: string;
  prompt: string;
  liked: boolean;
}) {
  return (<div className="history-item">
    <div className="top-section">
      <div className="ago">{ago}</div>
      {liked ? <i className="fa-solid fa-heart liked"></i> : <i className="fa-regular fa-heart"></i>}
    </div>
    <div className="bottom-section">
      <div className="prompt">{prompt}</div>
    </div>
  </div>);
}

export default function History() {
  return (
    <div className={styles.history}>
      <HistoryItem ago="10 minutes ago" prompt="A beautiful landscape" liked={false} />
      <HistoryItem ago="3 hours ago" prompt="A duck swimming in water" liked={true} />
      <HistoryItem ago="2 days ago" prompt="Draw a building with a lot of windows and a lot of people. There are trees also in the background." liked={false} />

    </div>
  );
}
