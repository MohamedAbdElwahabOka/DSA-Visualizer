import { sleep } from '../utils/helpers';

export const binarySearch = async (array, setArray, speed, stopSignal, pauseSignal) => {
    // Binary Search requires a sorted array
    // We'll sort the array first for visualization purposes if it's not sorted
    // But since we can't easily check if it's "sorted enough" visually, 
    // we'll just sort it and visualize the sort quickly or just set it sorted.
    // However, to keep it simple and consistent with other visualizations,
    // we will start by sorting the array internally and updating the visual state.

    let arr = array.map(item => ({ ...item }));

    // Sort the array by value
    arr.sort((a, b) => a.value - b.value);

    // Mark all as default initially
    arr.forEach(item => item.status = 'default');
    setArray([...arr]);
    await sleep(speed);

    let n = arr.length;

    // Pick a random target from the existing array
    let randomIndex = Math.floor(Math.random() * n);
    let target = arr[randomIndex].value;

    console.log(`Binary Search Target: ${target}`);

    // Highlight target - but we can't easily show "target" separate from array in this current UI
    // The Linear Search impl marks the actual element at randomIndex as 'target'.
    // But in Binary Search, we don't know where the target is yet.
    // So we won't mark it in the array until found. 
    // We can't really "show" the target value in the current UI except maybe in the legend or title?
    // The current UI shows "Status: running", etc.
    // Let's just proceed with searching.

    let left = 0;
    let right = n - 1;

    while (left <= right) {
        if (stopSignal.current) return;
        while (pauseSignal.current) {
            if (stopSignal.current) return;
            await sleep(100);
        }

        let mid = Math.floor((left + right) / 2);

        // Highlight the current range
        for (let i = 0; i < n; i++) {
            if (i >= left && i <= right) {
                arr[i].status = 'default'; // In range
            } else {
                arr[i].status = 'sorted'; // Out of range (using 'sorted' color for inactive/discarded)
                // Or maybe use a different color? 'sorted' is green. 
                // Maybe we want 'comparing' for active range?
            }
        }

        // Highlight mid
        arr[mid].status = 'comparing'; // Yellow
        setArray([...arr]);
        await sleep(Math.max(speed, 100));

        if (arr[mid].value === target) {
            arr[mid].status = 'pivot'; // Purple (Target found)
            setArray([...arr]);
            await sleep(1000);
            return;
        }

        if (arr[mid].value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
};

export const binarySearchCPP = `#include <iostream>
#include <algorithm>
using namespace std;

// Function to perform Binary Search
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 50, 70, 80};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 30;

    // Ensure array is sorted
    sort(arr, arr + n);

    int result = binarySearch(arr, n, target);

    if (result != -1)
        cout << "Element found at index: " << result;
    else
        cout << "Element not found";
        
    return 0;
}`;

export const binarySearchJava = `import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target)
                return mid;

            if (arr[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        
        System.out.println("Enter sorted elements:");
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        
        System.out.print("Enter target: ");
        int target = sc.nextInt();

        int result = binarySearch(arr, target);
        System.out.println(result == -1 ? "Not found" : "Found at index: " + result);
    }
}`;

export const binarySearchPython = `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

if __name__ == "__main__":
    arr = list(map(int, input("Enter sorted elements: ").split()))
    target = int(input("Enter target: "))
    
    result = binary_search(arr, target)
    
    if result != -1:
        print(f"Element found at index: {result}")
    else:
        print("Element not found")`;

export const binarySearchJS = `// Binary Search Implementation in JavaScript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Element not found
}

// Example usage
const arr = [10, 20, 30, 50, 70, 80];
const target = 30;

// Ensure array is sorted
arr.sort((a, b) => a - b);

const result = binarySearch(arr, target);

if (result !== -1) {
    console.log(\"Element found at index:\", result);
} else {
    console.log(\"Element not found\");
}`;
