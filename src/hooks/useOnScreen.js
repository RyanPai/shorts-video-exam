import { useEffect, useState, useRef } from 'react';

export default function useOnScreen(ref) {
  const observerRef = useRef(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if(observerRef.current && ref.current) {
      observerRef.current.observe(ref.current);
    }
    return () => {
      if(observerRef.current) {
        observerRef.current.disconnect();
      }
      
    };
    
  }, [ref]);

  return isOnScreen;
}