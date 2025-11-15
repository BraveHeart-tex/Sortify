import type { Item, Step } from '@/algorithms/insertionSort'

export function* quickSort(items: Item[]): Generator<Step> {
  const arr = [...items]

  function* quickSortRecursive(left: number, right: number): Generator<Step> {
    if (left >= right) return

    const pivot = arr[right]
    if (!pivot) return
    let i = left - 1

    // Pivot chosen
    yield {
      items: [...arr],
      highlights: [pivot.id],
      description: `Choosing pivot ${pivot.value} at position ${right}.`,
    }

    for (let j = left; j < right; j++) {
      const current = arr[j]

      if (!current) continue

      // Compare current element with pivot
      yield {
        items: [...arr],
        highlights: [current.id, pivot.id],
        description: `Comparing ${current.value} with pivot ${pivot.value}.`,
      }

      if (current.value < pivot.value) {
        i++
        if (i !== j) {
          const a = arr[i]
          const b = arr[j]
          ;[arr[i]!, arr[j]!] = [arr[j]!, arr[i]!]

          yield {
            items: [...arr],
            highlights: [a!.id, b!.id],
            description: `Swapped ${b!.value} with ${a!.value} because ${b!.value} < pivot ${pivot.value}.`,
          }
        }
      }
    }

    // Place pivot in correct position
    const pivotTarget = i + 1
    if (pivotTarget !== right) {
      const a = arr[pivotTarget]
      const b = arr[right]
      ;[arr[pivotTarget]!, arr[right]!] = [arr[right]!, arr[pivotTarget]!]

      yield {
        items: [...arr],
        highlights: [a!.id, b!.id],
        description: `Moved pivot ${b!.value} to its final position.`,
      }
    }

    yield {
      items: [...arr],
      highlights: [arr[pivotTarget]!.id],
      description: `Pivot ${arr[pivotTarget]!.value} is now in the correct position.`,
    }

    // Recursively sort left side
    yield* quickSortRecursive(left, pivotTarget - 1)

    // Recursively sort right side
    yield* quickSortRecursive(pivotTarget + 1, right)
  }

  // Initial state
  yield {
    items: [...arr],
    highlights: [],
    description: 'Starting quick sort. Selecting pivots and recursively partitioning the array.',
  }

  // Run recursive generator
  yield* quickSortRecursive(0, arr.length - 1)

  // Final
  yield {
    items: [...arr],
    highlights: [],
    description: 'Sorting complete! All elements are now in their correct positions.',
  }
}
