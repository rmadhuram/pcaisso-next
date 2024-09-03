export default function LikeButton({ liked }: { liked: boolean }) {
  return (
    <>
      {liked ? (
        <i className="fa-solid fa-heart liked"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </>
  );
}
