import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId: string; // stable id for placement
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'responsive';
}

export function AdSlot({ slotId, format = 'responsive' }: AdSlotProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('jf_cookie_consent_v1');
    const parsed = raw ? JSON.parse(raw) as { ads: boolean } : null;
    if (!parsed?.ads) return; // load only if ads consented

    // Placeholder: integrate AdSense script when approved
    if (ref.current) {
      ref.current.innerHTML = '';
      const box = document.createElement('div');
      box.className = 'bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center';
      box.style.height = format === 'horizontal' ? '90px' : format === 'vertical' ? '600px' : format === 'rectangle' ? '280px' : '250px';
      box.textContent = `Ad placeholder: ${slotId}`;
      ref.current.appendChild(box);
    }
  }, [slotId, format]);

  return <div ref={ref} className="my-4" aria-label="Advertisement" />;
}

export default AdSlot;

