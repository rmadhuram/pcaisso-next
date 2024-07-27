"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';

export default function Results() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [format, setFormat] = useState<string>('');

  useEffect(() => {
    const promptParam = searchParams.get('prompt') || '';
    const formatParam = searchParams.get('format') || '';

    setPrompt(promptParam);
    setFormat(formatParam);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: promptParam, type: formatParam }),
        });
        const data = await response.json();
        setCode(data.code || '');
      } catch (error) {
        console.error('Error fetching code:', error);
      }
    };

    if (promptParam && formatParam) {
      fetchData();
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Generated Code</h1>
      <iframe className={styles['output-frame']} srcDoc={code} />
    </div>
  );
}
