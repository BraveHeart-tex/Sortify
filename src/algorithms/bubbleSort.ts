import type { Item, Step } from '@/algorithms/insertionSort'

export function* bubbleSort(items: Item[]): Generator<Step> {
  const arr = [...items]

  yield {
    items: [...arr],
    highlights: [],
    description:
      'Starting bubble sort. Will repeatedly swap adjacent elements if they are out of order.',
  }

  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      const current = arr[j]
      const next = arr[j + 1]

      if (!current || !next) continue

      yield {
        items: [...arr],
        highlights: [current.id, next.id],
        description: `Comparing element ${current.value} with ${next.value}.`,
      }

      if (current.value > next.value) {
        ;[arr[j], arr[j + 1]] = [next, current]
        swapped = true

        yield {
          items: [...arr],
          highlights: [next.id, current.id],
          description: `Swapped element ${next.value} with ${current.value}.`,
        }
      } else {
        yield {
          items: [...arr],
          highlights: [current.id, next.id],
          description: `No swap needed; ${current.value} is <= ${next.value}.`,
        }
      }
    }

    if (!swapped) {
      yield {
        items: [...arr],
        highlights: [],
        description: `No swaps in this pass, array is now sorted.`,
      }
      break
    }
  }

  yield {
    items: [...arr],
    highlights: [],
    description: 'Sorting complete! All elements are now in their correct positions.',
  }
}
