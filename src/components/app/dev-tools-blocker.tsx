
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function DevToolsBlocker() {
  const router = useRouter();

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts for developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Trick to detect if dev tools are open by checking window resize
    const devToolsDetector = () => {
      const threshold = 160;
      if (window.innerWidth < screen.width - threshold || window.innerHeight < screen.height - threshold) {
         // This is a simple heuristic, might not be perfect
         // When detected, redirect to a blocked page or show a message
         router.push('/blocked');
      }
    };

    // The 'debugger' statement will pause execution only when dev tools are open.
    // We can check the time it takes to execute to detect if the tools are open.
    const interval = setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            router.push('/blocked');
        }
    }, 1000);


    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [router]);

  return null; // This component does not render anything
}
