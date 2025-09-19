<script setup lang="ts">
</script>

<template>
  <RouterLink to="/about">
    <n-button>
      Go to about
    </n-button>
  </RouterLink>
  <RouterLink to="/dashboard">
    <n-button>
      Go to dashboard
    </n-button>
  </RouterLink>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
