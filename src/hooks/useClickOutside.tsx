import { useEffect } from 'react';

export function useClickOutside(refs: (React.RefObject<HTMLElement> | null)[], callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            const isOutside = refs
                .filter(ref => ref !== null)
                .every(ref => ref?.current && !ref.current.contains(event.target));
            if (isOutside) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, callback]);
}