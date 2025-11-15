<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { insertionSort, type Step, type Item } from "@/algorithms/insertionSort";
import { recordSteps } from "@/algorithms/recordSteps";
import Card from "primevue/card";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Select from 'primevue/select';
import { bubbleSort } from "@/algorithms/bubbleSort";
import { selectionSort } from "@/algorithms/selectionSort";
import { quickSort } from "@/algorithms/quickSort";
import { SORTING_ALGORITHMS, sortingAlgorithmOptions, type SortingAlgorithm, type SortingAlgorithmOption } from "@/constants";

const functions: Record<SortingAlgorithm, (items: Item[]) => Generator<Step>> = {
    "insertionSort": insertionSort,
    "bubbleSort": bubbleSort,
    "selectionSort": selectionSort,
    "quickSort": quickSort,
}

const arraySize = ref(10);
const manualValues = ref("");

const steps = ref<Step[]>([]);
const index = ref(0);
const totalSteps = ref(0);
const nextId = (() => { let id = 1; return () => id++; })();
const generationKey = ref(0);
const current = ref<Step>({
    items: [],
    highlights: [],
    description: "Click 'Run' to create a new array"
});

const selectedAlgorithm = ref<SortingAlgorithmOption>({ label: "Insertion Sort", value: "insertionSort" });

const isRunDisabled = computed<boolean>(() => {
    const sizeInvalid = !arraySize.value || arraySize.value < 3;
    const valuesInvalid = !manualValues.value || manualValues.value.length < 3;
    return sizeInvalid && valuesInvalid;
});

const maxHeightPx = 240;
const maxValue = computed(() => Math.max(...current.value.items.map(i => i.value), 1));

const scale = computed(() => maxHeightPx / maxValue.value);

watch(selectedAlgorithm, () => {
    const isInMiddle = steps.value.length > 0 && index.value < steps.value.length - 1;

    if (isInMiddle) {
        generateArray();
    }
});

function generateArray() {
    generationKey.value++;

    let items: Item[] = [];
    if (manualValues.value.trim()) {
        items = manualValues.value.split(",").map(v => ({ value: Number(v), id: nextId() }));
    } else {
        // Generate unique random values
        const uniqueValues = new Set<number>();
        while (uniqueValues.size < arraySize.value) {
            uniqueValues.add(Math.floor(Math.random() * arraySize.value) + 1);
        }
        items = Array.from(uniqueValues).map(value => ({ value, id: nextId() }));
    }

    current.value = { items, highlights: [], description: "Starting insertion sort. The first element is already considered sorted." };
    steps.value = [];
    totalSteps.value = 0;
    index.value = 0;

    const selectedFunction = functions[selectedAlgorithm.value.value];
    if (!selectedFunction) {
        return;
    }

    const gen = selectedFunction(items);
    steps.value = recordSteps(gen);
    totalSteps.value = steps.value.length;
    index.value = 0;
    current.value = steps.value[0] ?? { items: [], highlights: [], description: "" };
}

function reset() {
    current.value = { items: [], highlights: [], description: "Click 'Run' to create a new array" };
    steps.value = [];
    totalSteps.value = 0;
    index.value = 0;
}

function nextStep() {
    if (index.value < steps.value.length - 1) {
        index.value++;
        current.value = steps.value[index.value] ?? { items: [], highlights: [], description: "" };
    }
}

function prevStep() {
    if (index.value > 0) {
        index.value--;
        current.value = steps.value[index.value] ?? { items: [], highlights: [], description: "" };
    }
}
</script>

<template>
    <Card class="p-4 mx-auto container
               bg-surface-0 text-surface-900 dark:bg-surface-900 dark:text-surface-0">

        <template #content>
            <div class="grid gap-4">

                <!-- Controls -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md
                           border border-surface-300 dark:border-surface-700
                           bg-surface-0 dark:bg-surface-800">

                    <div>
                        <label class="text-sm font-medium text-surface-700 dark:text-surface-200">
                            Array Size
                        </label>
                        <InputNumber v-model="arraySize" :min="3" :max="40" class="w-full" />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-surface-700 dark:text-surface-200">
                            Array Values (comma-separated)
                        </label>
                        <InputText v-model="manualValues" placeholder="e.g. 5,2,4,1" class="w-full" />
                    </div>

                    <div>
                        <label class="text-sm font-medium text-surface-700 dark:text-surface-200">
                            Algorithm
                        </label>
                        <Select :defaultValue="selectedAlgorithm" v-model="selectedAlgorithm"
                            :options="sortingAlgorithmOptions" optionLabel="label" class="w-full" />
                    </div>
                </div>

                <!-- Buttons -->
                <div class="flex gap-3">
                    <Button label="Run" @click="generateArray" :disabled="isRunDisabled" />

                    <Button label="Prev" severity="secondary" @click="prevStep" :disabled="index === 0" />

                    <Button label="Next" severity="secondary" @click="nextStep"
                        :disabled="index === steps.length - 1 || steps.length === 0" />

                    <Button label="Reset" severity="secondary" @click="reset" :disabled="steps.length === 0" />
                </div>

                <!-- Step Counter -->
                <div class="p-3 rounded-md border
                           border-surface-300 dark:border-surface-700
                           bg-surface-0 dark:bg-surface-800">

                    <p class="text-sm font-semibold mb-1 text-surface-700 dark:text-surface-200">
                        Step {{ index + 1 }} / {{ totalSteps }}
                    </p>

                    <p class="text-sm text-surface-600 dark:text-surface-300">
                        {{ current.description || "Generate an array to start" }}
                    </p>
                </div>

                <!-- Visualization -->
                <div class="relative h-64 p-4 rounded overflow-hidden
                           border border-surface-300 dark:border-surface-700
                           bg-surface-0 dark:bg-surface-800">

                    <TransitionGroup :key="generationKey" name="flip" tag="div" class="flex items-end gap-2 h-full">

                        <div v-for="item in current.items" :key="item.id" class="relative w-6 flex flex-col items-center justify-end
                                   text-xs font-semibold text-surface-0">

                            <div class="w-full transition-all duration-300 flex items-end justify-center rounded-sm
                                       text-surface-0" :class="current.highlights.includes(item.id)
                                        ? 'bg-red-500 dark:bg-red-400'
                                        : 'bg-primary-700 dark:bg-primary-600'
                                        " :style="{ height: (item.value * scale) + 'px' }">

                                {{ item.value }}
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.flip-move {
    transition: transform 0.35s ease;
}

.flip-enter-active,
.flip-leave-active {
    transition: all 0.35s ease;
}

.flip-enter-from,
.flip-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>