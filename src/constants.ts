export const SORTING_ALGORITHMS = {
  bubbleSort: 'Bubble Sort',
  insertionSort: 'Insertion Sort',
  selectionSort: 'Selection Sort',
  quickSort: 'Quick Sort',
} as const

export type SortingAlgorithm = keyof typeof SORTING_ALGORITHMS

export const sortingAlgorithmOptions: { label: string; value: SortingAlgorithm }[] = [
  { label: 'Insertion Sort', value: 'insertionSort' },
  { label: 'Bubble Sort', value: 'bubbleSort' },
  { label: 'Selection Sort', value: 'selectionSort' },
  { label: 'Quick Sort', value: 'quickSort' },
]

export type SortingAlgorithmOption = (typeof sortingAlgorithmOptions)[number]
