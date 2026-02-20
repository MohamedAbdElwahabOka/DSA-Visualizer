import { sleep } from '../utils/helpers';

export const mergeSort = async (
  array,
  setArray,
  speed,
  stopSignal,
  pauseSignal
) => {

  let arr = array.map(item => ({ ...item }));

  const checkPauseAndStop = async () => {
    if (stopSignal.current) return true;

    while (pauseSignal.current) {
      if (stopSignal.current) return true;
      await sleep(100);
    }

    return false;
  };

  const merge = async (left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1).map(item => ({ ...item }));
    let rightArr = arr.slice(mid + 1, right + 1).map(item => ({ ...item }));

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {

      if (await checkPauseAndStop()) return;
      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i], status: 'default' }; 
        i++;
      } else {
        arr[k] = { ...rightArr[j], status: 'default' };
        j++;
      }

      setArray([...arr]);
      k++;
    }

    while (i < leftArr.length) {

      if (await checkPauseAndStop()) return;

      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      arr[k] = { ...leftArr[i], status: 'default' };
      setArray([...arr]);

      i++;
      k++;
    }

    while (j < rightArr.length) {

      if (await checkPauseAndStop()) return;

      arr[k].status = 'comparing';
      setArray([...arr]);
      await sleep(speed);

      arr[k] = { ...rightArr[j], status: 'default' };
      setArray([...arr]);

      j++;
      k++;
    }
  };

  const mergeSortHelper = async (left, right) => {
    if (left >= right || stopSignal.current) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);

    if (stopSignal.current) return;

    await merge(left, mid, right);
  };

  await mergeSortHelper(0, arr.length - 1);

  if (stopSignal.current) return;

  // Final sorted state
  for (let i = 0; i < arr.length; i++) {
    arr[i].status = 'sorted';
  }

  setArray([...arr]);
};