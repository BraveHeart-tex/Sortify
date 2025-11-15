# **Sortify — Interactive Sorting Algorithm Visualizer**

Sortify is an interactive, educational visualization tool built with **Vue 3**, **PrimeVue**, and **Tailwind CSS v4**.
It allows users to generate arrays, step through sorting algorithms, and observe how different algorithms operate internally—element by element, swap by swap.

<img src="./showcase.webp"/>

The core idea: **Every algorithm yields a sequence of steps**, and each step exposes:

- the state of the array
- which items are highlighted
- a human-readable description of the algorithm’s action

This makes the visualizer ideal for learning, debugging, and demonstrating how sorting works under the hood.

---

## Features

### **Interactive Array Visualization**

- Bars animate as elements move or swap.
- Highlights help track comparisons and pivot choices.
- Visualization auto-scales, ensuring values of any size look clean.

### **Multiple Sorting Algorithms Implemented**

Currently supported:

| Algorithm          | Technique                                   |
| ------------------ | ------------------------------------------- |
| **Bubble Sort**    | Repeated swapping of adjacent elements      |
| **Insertion Sort** | Gradual building of a sorted portion        |
| **Selection Sort** | Choosing minimum in each pass               |
| **Quick Sort**     | Recursive partitioning with pivot selection |

### **Flexible Input**

- Generate random arrays with a specified size.
- Enter manual values (comma-separated).

### **Step-by-step Debugging**

- **Next** and **Previous** buttons traverse the algorithm.
- Displays a running explanation for each step.

### **Auto-restart on Algorithm Change**

If the algorithm is switched mid-visualization, the UI automatically restarts with the current array.

---

## Getting Started

### **Installation**

```bash
pnpm install
```

### **Run Development Server**

```bash
pnpm run dev
```

### **Build for Production**

```bash
pnpm run build
```

---

## Core Architecture

### **1. Step-Based Algorithm Structure**

All algorithms follow the same generator-based signature:

```ts
export function* someSort(items: Item[]): Generator<Step>
```

`Item` and `Step` definitions:

```ts
export interface Item {
  id: number
  value: number
}

export interface Step {
  items: Item[]
  highlights: number[]
  description: string
}
```

Each yield returns a fully updated snapshot of the algorithm's state.

---

## Supported Algorithms

### **Bubble Sort**

- Compares adjacent items.
- Swaps when necessary.
- Stops early if no swaps occur.

### **Insertion Sort**

- Builds a sorted section on the left.
- Moves out-of-place elements to their correct spot.

### **Selection Sort**

- Finds the minimum remaining item.
- Swaps it into the front of the unsorted region.

### **Quick Sort**

- Picks a pivot.
- Partitions elements left/right.
- Recursively sorts both partitions.
- Fully instrumented: pivot selection, comparisons, swaps.

---

## Technology Stack

- **Vue 3 (Composition API)**
- **PrimeVue**
- **Tailwind CSS v4**
- **TypeScript**
- **Generators for algorithm animation**

---

## Feedback or Contributions?

New algorithms, UI improvements, or performance boosts are welcome.
