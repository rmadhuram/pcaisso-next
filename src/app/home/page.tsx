import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Hello, Intro Page!</h1> 
      <div>
        <Link href="/home/contributions">Contributions</Link>
      </div>
    </div>
  )
}