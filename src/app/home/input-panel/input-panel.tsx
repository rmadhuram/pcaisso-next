import Link from 'next/link'

export default function InputPanel() {
  return (
    <div className="input-panel">
      Input Panel
      <div>
        <Link href="/home">Intro</Link>
      </div>
      <div>
        <Link href="/home/results">Results</Link>
      </div>
      <div>
        <Link href="/home/contributions">Contributions</Link>
      </div>
    </div>
  );
}