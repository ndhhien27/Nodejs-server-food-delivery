export const mergeArr = (firstArr, secondArr) => {
  const firstArrIDs = new Set(firstArr.map(({ name }) => name));
  const combined = [
    ...firstArr,
    ...secondArr.filter(({ name }) => !firstArrIDs.has(name))
  ];
  return combined
}