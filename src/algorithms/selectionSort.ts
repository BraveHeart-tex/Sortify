import type { Item, Step } from '@/algorithms/insertionSort'

export function* selectionSort(items: Item[]): Generator<Step> {
  const arr = [...items]

  yield {
    items: [...arr],
    highlights: [],
    description:
      'Starting selection sort. Will repeatedly select the minimum remaining element and place it in its correct position.',
  }

  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    if (!arr[i]) continue

    yield {
      items: [...arr],
      highlights: [arr[i]!.id],
      description: `Starting a new pass. Assuming element ${arr[i]!.value} is the current minimum.`,
    }

    for (let j = i + 1; j < n; j++) {
      const current = arr[j]
      const currentMin = arr[minIndex]

      yield {
        items: [...arr],
        highlights: [current!.id, currentMin!.id],
        description: `Comparing ${current!.value} with current minimum ${currentMin!.value}.`,
      }

      if (current!.value < currentMin!.value) {
        minIndex = j

        yield {
          items: [...arr],
          highlights: [arr[minIndex]!.id],
          description: `Found a new minimum: ${arr[minIndex]!.value}.`,
        }
      }
    }

    if (minIndex !== i) {
      const prev = arr[i]
      const next = arr[minIndex]

      ;[arr[i]!, arr[minIndex]!] = [arr[minIndex]!, arr[i]!]

      yield {
        items: [...arr],
        highlights: [prev!.id, next!.id],
        description: `Swapped ${prev!.value} with new minimum ${next!.value}.`,
      }
    } else {
      yield {
        items: [...arr],
        highlights: [arr[i]!.id],
        description: `No smaller element found. ${arr[i]!.value} remains in place.`,
      }
    }
  }

  yield {
    items: [...arr],
    highlights: [],
    description: 'Sorting complete! All elements are now in their correct positions.',
  }
}
