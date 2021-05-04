export const G = 6.6743e-11
export const RESTITUTION_COEFFICIENT = 0.5

export const arrayDifference = (arr1, arr2) =>
  arr1.map((element, index) => element - arr2[index])
export const arrayAddition = (arr1, arr2) =>
  arr1.map((element, index) => element + arr2[index])
export const euclideanDistance = (arr1, arr2) =>
  Math.hypot(...arrayDifference(arr1, arr2))
