import type { Step } from '@/algorithms/insertionSort'

export function recordSteps(generator: Generator<Step>): Step[] {
  const steps: Step[] = []
  for (const step of generator) steps.push(step)
  return steps
}
