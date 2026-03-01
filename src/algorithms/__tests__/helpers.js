/**
 * Test helpers — provide mock versions of the UI dependencies
 * that the visualizer algorithm functions expect.
 */
import { vi } from "vitest";

/**
 * Creates an array of { value, status } objects that the algorithms expect.
 */
export function makeArray(values) {
    return values.map((v) => ({ value: v, status: "default" }));
}

/**
 * Extracts just the .value numbers from a visualizer array.
 */
export function extractValues(arr) {
    return arr.map((item) => item.value);
}

/**
 * Mocked setArray — records the last state pushed by the algorithm.
 * Returns { setArray, getLatest }.
 */
export function createMockSetArray() {
    let latest = [];
    const setArray = vi.fn((arrOrFn) => {
        if (typeof arrOrFn === "function") {
            latest = arrOrFn(latest);
        } else {
            latest = arrOrFn;
        }
    });
    return { setArray, getLatest: () => latest };
}

/**
 * Provides a stopSignal and pauseSignal ref that are never triggered.
 */
export function createSignals() {
    return {
        stopSignal: { current: false },
        pauseSignal: { current: false },
    };
}

/**
 * A no-op updateStepInfo.
 */
export const noopStepInfo = vi.fn();
