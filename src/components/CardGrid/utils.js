export function removeObjectWithId(arr, id) {
  return arr.filter((obj) => obj.id !== id);
}
