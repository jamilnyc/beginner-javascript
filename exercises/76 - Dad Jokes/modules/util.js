/**
 * Return a random element from the given array, with the option to prevent duplicates.
 *
 * @param {Array} arr The array to randomly select from
 * @param {Object} not An element to NOT select, to prevent duplicate picks consecutively
 */
export function randomItemFromArray(arr, not) {
  const index = Math.floor(Math.random() * arr.length);
  const item = arr[index];
  if (item === not) {
    // Call function again if we got a duplicate
    console.log('Text already used, calling again.');
    return randomItemFromArray(arr, not);
  }
  return item;
}
