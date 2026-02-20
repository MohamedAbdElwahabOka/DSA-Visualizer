import { sleep } from '../utils/helpers';

export const mergeSort = async (
  array,
  setArray,
  speed,
  stopSignal,
  pauseSignal
) => {
  let arr = array.map(item => ({ ...item }));

  const merge = async (left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {

      if (stopSignal.current) return;

      while (pauseSignal.current) {
        if (stopSignal.current) return;
        await sleep(100);
      }

      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k].value = leftArr[i].value;
        i++;
      } else {
        arr[k].value = rightArr[j].value;
        j++;
      }

      arr[k].status = 'default';
      k++;
      setArray([...arr]);
    }

    while (i < leftArr.length) {

      if (stopSignal.current) return;

      while (pauseSignal.current) {
        if (stopSignal.current) return;
        await sleep(100);
      }

      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      arr[k].value = leftArr[i].value;

      arr[k].status = 'default';
      i++;
      k++;
      setArray([...arr]);
    }

    while (j < rightArr.length) {

      if (stopSignal.current) return;

      while (pauseSignal.current) {
        if (stopSignal.current) return;
        await sleep(100);
      }

      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      arr[k].value = rightArr[j].value;

      arr[k].status = 'default';
      j++;
      k++;
      setArray([...arr]);
    }
  };

  const mergeSortHelper = async (left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  };

  await mergeSortHelper(0, arr.length - 1);

  // Mark all sorted at end
  for (let i = 0; i < arr.length; i++) {
    arr[i].status = 'sorted';
  }
  setArray([...arr]);
};

export const mergeSortCPP = `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j])
            temp.push_back(arr[i++]);
        else
            temp.push_back(arr[j++]);
    }

    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = 0; k < temp.size(); k++)
        arr[left + k] = temp[k];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    vector<int> arr(n);
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    mergeSort(arr, 0, n - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";

    return 0;
}`;
