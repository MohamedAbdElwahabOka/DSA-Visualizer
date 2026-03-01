/**
 * Unit tests for searching algorithms.
 *
 * Search algorithms in this project are async visualizer functions.
 * linearSearch picks a random target internally, so we test that the
 * algorithm completes without errors and marks a target.
 * binarySearch and interpolationSearch also pick targets internally.
 *
 * We verify:
 *  - Algorithms complete without errors
 *  - setArray is called at least once
 *  - stopSignal is respected
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../utils/helpers", () => ({
    sleep: vi.fn(() => Promise.resolve()),
}));

import { linearSearch } from "../linearSearch";
import { binarysearch } from "../binarySearch";
import { interpolationSearch } from "../interpolationSearch";
import {
    makeArray,
    createMockSetArray,
    createSignals,
} from "./helpers";

describe("Linear Search", () => {
    let signals;
    let mock;

    beforeEach(() => {
        signals = createSignals();
        mock = createMockSetArray();
        vi.clearAllMocks();
    });

    it("completes without errors on a random array", async () => {
        const arr = makeArray([10, 50, 30, 70, 80, 20]);
        await linearSearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        expect(mock.setArray).toHaveBeenCalled();
    });

    it("completes on a single-element array", async () => {
        const arr = makeArray([42]);
        await linearSearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        expect(mock.setArray).toHaveBeenCalled();
    });

    it("marks at least one element as sorted (found)", async () => {
        const arr = makeArray([10, 20, 30]);
        await linearSearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        const lastCall = mock.getLatest();
        const foundCount = lastCall.filter((item) => item.status === "sorted").length;
        expect(foundCount).toBeGreaterThanOrEqual(1);
    });

    it("respects stopSignal", async () => {
        const arr = makeArray([1, 2, 3, 4, 5]);
        const stoppedSignals = createSignals();
        stoppedSignals.stopSignal.current = true;
        await linearSearch(arr, mock.setArray, 0, stoppedSignals.stopSignal, stoppedSignals.pauseSignal);
        // When stopped immediately, should exit early
        expect(mock.setArray.mock.calls.length).toBeLessThanOrEqual(2);
    });
});

describe("Binary Search", () => {
    let signals;
    let mock;

    beforeEach(() => {
        signals = createSignals();
        mock = createMockSetArray();
        vi.clearAllMocks();
    });

    it("completes without errors on a sorted array", async () => {
        const arr = makeArray([1, 2, 3, 4, 5, 6, 7, 8]);
        await binarysearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        expect(mock.setArray).toHaveBeenCalled();
    });

    it("respects stopSignal", async () => {
        const arr = makeArray([1, 2, 3]);
        const stoppedSignals = createSignals();
        stoppedSignals.stopSignal.current = true;
        await binarysearch(arr, mock.setArray, 0, stoppedSignals.stopSignal, stoppedSignals.pauseSignal);
        expect(mock.setArray.mock.calls.length).toBeLessThanOrEqual(2);
    });
});

describe("Interpolation Search", () => {
    let signals;
    let mock;

    beforeEach(() => {
        signals = createSignals();
        mock = createMockSetArray();
        vi.clearAllMocks();
    });

    it("completes without errors on a sorted array", async () => {
        const arr = makeArray([10, 20, 30, 40, 50, 60, 70]);
        await interpolationSearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        expect(mock.setArray).toHaveBeenCalled();
    });

    it("completes on a single-element array", async () => {
        const arr = makeArray([42]);
        await interpolationSearch(arr, mock.setArray, 0, signals.stopSignal, signals.pauseSignal);
        expect(mock.setArray).toHaveBeenCalled();
    });

    it("respects stopSignal", async () => {
        const arr = makeArray([1, 2, 3]);
        const stoppedSignals = createSignals();
        stoppedSignals.stopSignal.current = true;
        await interpolationSearch(arr, mock.setArray, 0, stoppedSignals.stopSignal, stoppedSignals.pauseSignal);
        expect(mock.setArray.mock.calls.length).toBeLessThanOrEqual(2);
    });
});
