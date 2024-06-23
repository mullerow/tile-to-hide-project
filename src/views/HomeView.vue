<template>
  <main>
    <div class="background-image-tiles">
      <div class="tile-container">
        <div
          @mouseover="handleMouseHover($event, index)"
          @mouseleave="handleMouseLeave($event, index)"
          v-for="(tile, index) of store.tileData.number"
          :key="index"
          :data-id="index"
          :class="{
            'single-tile': true,
            hovered: hoveredTile === index,
            leaveTile: tileHoverLeave === index
          }"
        >
          {{ tile }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from '@/stores/store.js'
export default {
  data() {
    return {
      store: store(),
      hoveredTile: null,
      tileHoverLeave: null,
      neighbourTiles: []
    }
  },
  methods: {
    handleMouseHover(e, index) {
      this.hoveredTile = index
      this.tileHoverLeave = null
      const tileId = e.target.getAttribute('data-id')
      console.log('Id:', tileId)
      // berechne alle nummern der benachtbarten Kacheln
      for (let y = -6; y < 7; y += 6) {
        for (let x = -1; x < 2; x++) {
          let neighbourNumber = Number(tileId) + y + x
          if (neighbourNumber > 0 && neighbourNumber < this.store.tileData.number.length) {
            this.neighbourTiles.push(neighbourNumber)
          }
        }
      }
      console.log('this.neighbourTiles', this.neighbourTiles)
    },

    handleMouseLeave(e, index) {
      this.neighbourTiles = []
      setTimeout(() => {
        this.tileHoverLeave = index
      }, 1000),
        setTimeout(() => {
          this.hoveredTile = null
        }, 100)
    }
  },
  created() {
    console.log('habs getan')
    this.store.initialCalcOfCoordinates()
  }
}
</script>

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

.single-tile.hovered {
  background-color: goldenrod;
  animation: rotate-tile-forward 1s forwards;
}

.single-tile.leaveTile {
  background-color: rgb(231, 200, 120);
  animation: rotate-tile-backwards 0.5s backwards;
}
.background-image-tiles {
  width: 350px;
  height: 290px;
  background-color: goldenrod;
  z-index: -1;
}

@keyframes rotate-tile-forward {
  0% {
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes rotate-tile-backwards {
  0% {
  }
  100% {
    transform: rotateY(-180deg);
  }
}
@keyframes rotate-50-percent {
  0% {
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
