import Image from "next/image";
import './page.css';
import Canvas from './canvas/canvas';

export default function Home() {
  return (
    <>
    <main className='card'>
    <div>
      <Canvas/>
    </div>
    </main>
    </>
  );
}
