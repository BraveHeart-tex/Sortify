<script lang="ts" setup>
import { ref } from "vue";
import { insertionSort, type Step, type Item } from "@/algorithms/insertionSort";
import { recordSteps } from "@/algorithms/recordSteps";
import Card from "primevue/card";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

const arraySize = ref(10);
const manualValues = ref("");
const layout = ref("bars");
const layouts = [
    { label: "Bars", value: "bars" },
    { label: "Boxes", value: "boxes" }
];

const steps = ref<Step[]>([]);
const index = ref(0);
const totalSteps = ref(0);
const nextId = (() => { let id = 1; return () => id++; })();
const generationKey = ref(0); // Add this to force remount

const current = ref<Step>({
    items: [],
    highlights: [],
    description: "Click 'Generate' to create a new array"
});

function generateArray() {
    generationKey.value++; // Increment to force TransitionGroup remount

    let items: Item[] = [];
    if (manualValues.value.trim()) {
        items = manualValues.value.split(",").map(v => ({ value: Number(v), id: nextId() }));
    } else {
        // Generate unique random values
        const uniqueValues = new Set<number>();
        while (uniqueValues.size < arraySize.value) {
            uniqueValues.add(Math.floor(Math.random() * 30 + 1));
        }
        items = Array.from(uniqueValues).map(value => ({ value, id: nextId() }));
    }

    current.value = { items, highlights: [], description: "Starting insertion sort. The first element is already considered sorted." };
    steps.value = [];
    totalSteps.value = 0;
    index.value = 0;
    start();
}

function start() {
    const gen = insertionSort(current.value.items);
    steps.value = recordSteps(gen);
    totalSteps.value = steps.value.length;
    index.value = 0;
    current.value = steps.value[0] ?? { items: [], highlights: [], description: "" };
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

<template>
    <Card class="p-4 mx-auto container">
        <template #content>
            <div class="grid gap-4">
                <!-- Controls -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border border-surface-500 rounded-md p-4">
                    <div>
                        <label class="text-sm font-medium">Array Size</label>
                        <InputNumber v-model="arraySize" :min="3" :max="40" class="w-full" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Layout</label>
                        <Dropdown v-model="layout" :options="layouts" optionLabel="label" optionValue="value"
                            class="w-full" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Array Values (comma-separated)</label>
                        <InputText v-model="manualValues" placeholder="e.g. 5,2,4,1" class="w-full" />
                    </div>
                </div>
                <!-- Buttons -->
                <div class="flex gap-3">
                    <Button label="Generate" @click="generateArray" />
                    <Button label="Start" severity="success" @click="start" />
                    <Button label="Prev" severity="secondary" @click="prevStep" />
                    <Button label="Next" severity="secondary" @click="nextStep" />
                </div>
                <!-- Step count -->
                <div class="border rounded-md p-3 border-surface-500">
                    <p class="text-sm font-semibold mb-1 text-muted-color-emphasis">
                        Step {{ index + 1 }} / {{ totalSteps }}
                    </p>
                    <p class="text-sm text-muted-color">
                        {{ current.description || "Generate an array to start" }}
                    </p>
                </div>
                <!-- Visualization -->
                <div class="relative h-64 border border-surface-500 p-4 rounded overflow-hidden">
                    <TransitionGroup :key="generationKey" name="flip" tag="div" class="flex items-end gap-2 h-full">
                        <!-- Bars -->
                        <template v-if="layout === 'bars'">
                            <div v-for="item in current.items" :key="item.id"
                                class="relative w-6 flex flex-col items-center justify-end text-xs font-semibold">
                                <div class="w-full transition-all duration-300 flex items-end justify-center text-white"
                                    :class="current.highlights.includes(item.id) ? 'bg-red-500' : 'bg-blue-500'"
                                    :style="{ height: item.value * 4 + 'px' }">
                                    {{ item.value }}
                                </div>
                            </div>
                        </template>
                        <!-- Boxes -->
                        <template v-if="layout === 'boxes'">
                            <div v-for="item in current.items" :key="item.id"
                                class="px-3 py-2 border border-surface-500 rounded-md transition-all duration-300"
                                :class="current.highlights.includes(item.id) ? 'bg-primary' : 'bg-surface'">
                                {{ item.value }}
                            </div>
                        </template>
                    </TransitionGroup>
                </div>
            </div>
        </template>
    </Card>
</template>
