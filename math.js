export const G = 6.6743e-11

export const arrayDifference = (arr1, arr2) =>
  arr1.map((element, index) => element - arr2[index])
const arraySum = (array) => array.reduce((acc, curr) => acc + curr)
const arraySquare = (array) => array.map((e) => e * e)
export const euclideanDistance = (arr1, arr2) =>
  Math.sqrt(arraySum(arraySquare(arrayDifference(arr1, arr2))))
