export interface Item {
  id: number
  value: number
}

export interface Step {
  items: Item[]
  highlights: number[] // ids of highlighted items
  description: string // description of what's happening in this step
}

/**
 * Insertion sort that maintains stable object references for FLIP animations.
 */
export function* insertionSort(items: Item[]): Generator<Step> {
  const arr = [...items] // shallow copy to avoid mutating original

  yield {
    items: [...arr],
    highlights: [],
    description: 'Starting insertion sort. The first element is already considered sorted.',
  }

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    if (!key) continue

    // highlight the key at its current position
    yield {
      items: [...arr],
      highlights: [key.id],
      description: `Selecting element ${key.value} at position ${i}. Now finding its correct position in the sorted portion.`,
    }

    let j = i - 1
    const originalPosition = i

    // Shift elements to the right by actually removing and reinserting
    while (j >= 0 && arr[j]!.value > key.value) {
      j--
    }

    const newPosition = j + 1

    // Remove the key from position i
    arr.splice(i, 1)
    // Insert it at the correct position (j + 1)
    arr.splice(newPosition, 0, key)

    if (newPosition === originalPosition) {
      yield {
        items: [...arr],
        highlights: [key.id],
        description: `Element ${key.value} is already in the correct position. No movement needed.`,
      }
    } else {
      yield {
        items: [...arr],
        highlights: [key.id],
        description: `Inserted element ${key.value} at position ${newPosition}. Elements ${originalPosition - newPosition} position(s) were shifted right.`,
      }
    }
  }

  // Final sorted state
  yield {
    items: [...arr],
    highlights: [],
    description: 'Sorting complete! All elements are now in their correct positions.',
  }
}
