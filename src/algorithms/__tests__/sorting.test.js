/**
 * Unit tests for sorting algorithms.
 *
 * Each algorithm is an async function:
 *   (array, setArray, speed, stopSignal, pauseSignal, updateStepInfo?) => void
 *
 * We mock `sleep` to resolve immediately so tests run fast,
 * and verify the final array state is sorted.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock sleep to be instant ──
vi.mock("../../utils/helpers", () => ({
    sleep: vi.fn(() => Promise.resolve()),
}));

import { bubbleSort } from "../bubbleSort";
import { selectionSort } from "../selectionSort";
import { insertionSort } from "../insertionSort";
import { mergeSort } from "../mergeSort";
import { quickSort } from "../quickSort";
import { heapSort } from "../heapSort";
import { radixSort } from "../radixSort";
import {
    makeArray,
    extractValues,
    createMockSetArray,
    createSignals,
    noopStepInfo,
} from "./helpers";

/* ── Test data ── */
const cases = [
    { label: "random", input: [38, 27, 43, 3, 9, 82, 10] },
    { label: "already sorted", input: [1, 2, 3, 4, 5] },
    { label: "reverse sorted", input: [5, 4, 3, 2, 1] },
    { label: "single element", input: [42] },
    { label: "two elements", input: [9, 1] },
    { label: "duplicates", input: [4, 2, 4, 1, 3, 2] },
    { label: "all same", input: [7, 7, 7, 7] },
];

function sorted(arr) {
    return [...arr].sort((a, b) => a - b);
}

/* ── Generic test runner for sorting ── */
function describeSortAlgorithm(name, sortFn, hasStepInfo = false) {
    describe(name, () => {
        let signals;
        let mock;

        beforeEach(() => {
            signals = createSignals();
            mock = createMockSetArray();
            vi.clearAllMocks();
        });

        cases.forEach(({ label, input }) => {
            it(`sorts [${label}]: [${input}]`, async () => {
                const arr = makeArray(input);
                const expected = sorted(input);

                if (hasStepInfo) {
                    await sortFn(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal, noopStepInfo);
                } else {
                    await sortFn(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
                }

                // The algorithm mutates arr in-place and calls setArray,
                // final state should be the last setArray call.
                // Edge case: if setArray was never called (e.g. single-element),
                // the original arr is already sorted — verify it directly.
                const latest = mock.getLatest();
                const finalValues = latest.length > 0 ? extractValues(latest) : extractValues(arr);
                expect(finalValues).toEqual(expected);
            });
        });

        it("respects stopSignal", async () => {
            const arr = makeArray([5, 3, 1, 4, 2]);
            const stoppedSignals = createSignals();
            stoppedSignals.stopSignal.current = true;

            if (hasStepInfo) {
                await sortFn(arr, mock.setArray, 0, stoppedSignals.stopSignal, stoppedSignals.pauseSignal, noopStepInfo);
            } else {
                await sortFn(arr, mock.setArray, 0, stoppedSignals.stopSignal, stoppedSignals.pauseSignal);
            }

            // When stopped immediately, setArray should barely be called
            const calls = mock.setArray.mock.calls.length;
            expect(calls).toBeLessThanOrEqual(2);
        });
    });
}

/* ── Run all sorting tests ── */
describeSortAlgorithm("Bubble Sort", bubbleSort, true);
describeSortAlgorithm("Selection Sort", selectionSort, false);
describeSortAlgorithm("Insertion Sort", insertionSort, false);
describeSortAlgorithm("Merge Sort", mergeSort, false);
describeSortAlgorithm("Quick Sort", quickSort, false);
describeSortAlgorithm("Heap Sort", heapSort, false);
describeSortAlgorithm("Radix Sort", radixSort, false);
