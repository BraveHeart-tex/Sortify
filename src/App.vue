<script lang="ts" setup>
import Sorter from "@/components/Sorter.vue";
import { Button } from "primevue";

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark.toString());
}
</script>

<template>
  <div class="flex items-center flex-col h-screen justify-center">
    <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
    <Sorter />
  </div>
</template>