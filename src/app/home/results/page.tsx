"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import { useSub } from '../../hooks/usePubSub';

export default function Results() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>('');

  useSub('CREATE_NEW', (payload: any) => {
    console.log('Received', payload)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: payload.prompt, type: payload.category }),
        });
        const data = await response.json();
        console.log('set code: ', data.code)
        setCode(data.code || '');
      } catch (error) {
        console.error('Error fetching code:', error);
      }
    };
    fetchData()
  });

  return (
    <div>
      <h1>Generated Code</h1>
      <iframe className={styles['output-frame']} srcDoc={code} />
    </div>
  );
}
