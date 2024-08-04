import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  return (
    <SkeletonTheme>
      Loading................
      <Skeleton duration={200} />
    </SkeletonTheme>
  );
}
