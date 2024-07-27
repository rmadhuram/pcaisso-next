"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function Results() {
  const router = useRouter();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (router.query) {
      const { prompt, format } = router.query as { prompt?: string; format?: string };
      
      if (prompt && format) {
        const fetchCode = async () => {
          try {
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt, type: format }),
            });
            const data = await response.json();
            setCode(data.code || '');
          } catch (error) {
            console.error('Error fetching code:', error);
          }
        };

        fetchCode();
      }
    }
  }, [router.query]);

  return (
    <div>
      <h1>Generated Code</h1>
      <iframe className={styles['output-frame']} srcDoc={code}></iframe>
    </div>
  );
}
