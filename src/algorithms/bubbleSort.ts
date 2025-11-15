import type { Item, Step } from '@/algorithms/insertionSort'

export function* bubbleSort(items: Item[]): Generator<Step> {
  const arr = [...items] // shallow copy to avoid mutating original

  yield {
    items: [...arr],
    highlights: [],
    description:
      'Starting bubble sort. Will repeatedly swap adjacent elements if they are out of order.',
  }

  let n = arr.length
  let swapped: boolean

  for (let i = 0; i < n - 1; i++) {
    swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      const current = arr[j]
      const next = arr[j + 1]

      if (!current || !next) continue

      // Highlight the pair being compared
      yield {
        items: [...arr],
        highlights: [current.id, next.id],
        description: `Comparing element ${current.value} with ${next.value}.`,
      }

      if (current.value > next.value) {
        // Swap the elements
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true

        yield {
          items: [...arr],
          highlights: [arr[j].id, arr[j + 1].id],
          description: `Swapped element ${arr[j + 1].value} with ${arr[j].value}.`,
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

  // Final sorted state
  yield {
    items: [...arr],
    highlights: [],
    description: 'Sorting complete! All elements are now in their correct positions.',
  }
}
