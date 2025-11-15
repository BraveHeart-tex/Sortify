<template>
    <header class="border-b transition-colors duration-300
               bg-surface-0 text-surface-900 border-surface-200
               dark:bg-surface-900 dark:text-surface-0 dark:border-surface-700">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">

            <!-- Logo -->
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg
                           bg-gradient-to-br from-primary-500 to-primary-700
                           dark:from-primary-400 dark:to-primary-600">
                    <svg class="w-6 h-6 text-surface-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </div>

                <h1 class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 
                           bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-600">
                    Sortify
                </h1>
            </div>

            <!-- Dark Mode Toggle -->
            <Button @click="toggleDarkMode" class="p-2 rounded-lg transition-all duration-300
                       bg-surface-100 hover:bg-surface-200
                       text-surface-900
                       dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-surface-0" text rounded
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">

                <i v-if="isDark" class="pi pi-sun text-primary-300"></i>
                <i v-else class="pi pi-moon text-surface-700"></i>

            </Button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import Button from 'primevue/button';

const isDark = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
};

onMounted(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDark.value = saved === 'dark' || (!saved && prefersDark);

    document.documentElement.classList.toggle('dark', isDark.value);
});

watch(isDark, (val) => {
    localStorage.setItem('theme', val ? 'dark' : 'light');
});
</script>

<style scoped>
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}
</style>
