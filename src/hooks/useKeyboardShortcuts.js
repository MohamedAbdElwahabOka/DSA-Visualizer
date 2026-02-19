import { useEffect } from 'react';

export function useKeyboardShortcuts({
    onSpace,
    onReset,
    onNew,
    onSpeedUp,
    onSpeedDown,
    onTheme,
    onValues,
    onGrid
}) {
    useEffect(() => {
        const handleHotkeys = (e) => {
            // Ignore if typing in an input, textarea, or select
            const tag = e.target?.tagName?.toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

            if (e.code === 'Space') {
                e.preventDefault();
                onSpace?.();
            }

            if (e.key.toLowerCase() === 'r') {
                e.preventDefault();
                onReset?.();
            }

            if (e.key.toLowerCase() === 'n') {
                e.preventDefault();
                onNew?.();
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                onSpeedUp?.();
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                onSpeedDown?.();
            }

            if (e.key.toLowerCase() === 'c') {
                e.preventDefault();
                onTheme?.();
            }

            if (e.key.toLowerCase() === 'v') {
                e.preventDefault();
                onValues?.();
            }

            if (e.key.toLowerCase() === 'g') {
                e.preventDefault();
                onGrid?.();
            }
        };

        window.addEventListener('keydown', handleHotkeys);
        return () => window.removeEventListener('keydown', handleHotkeys);
    }, [onSpace, onReset, onNew, onSpeedUp, onSpeedDown, onTheme, onValues, onGrid]);
}
