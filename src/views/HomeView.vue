<script>
import { store } from '@/stores/store.js'
export default {
  data() {
    return {
      store: store()
    }
  }
}
</script>

<template>
  <main>
    <div class="tile-container">
      <div v-for="tile of store.tileData.data" :key="tile" class="single-tile">{{ tile }}</div>
    </div>
  </main>
</template>

<style>
.tile-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 400px;
}
.single-tile {
  width: 50px;
  height: 50px;
  background-color: blanchedalmond;
  border: 2px solid black;
  text-align: center;
}

.single-tile:hover {
  background-color: goldenrod;
  animation: rotate-tile 1s forwards;
}

@keyframes rotate-tile {
  0% {
  }
  100% {
    transform: rotateY(180deg);
  }
}
</style>
