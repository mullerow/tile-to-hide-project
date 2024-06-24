<template>
  <main>
    <div class="tile-container">
      <div
        @mouseover="handleMouseHover($event, index)"
        @mouseleave="handleMouseLeave($event, index)"
        v-for="(tile, index) of store.tileData.number"
        :key="index"
        :data-id="index"
        :xCoordinates="store.tileData.tileXCoordinates[index]"
        :yCoordinates="store.tileData.tileYCoordinates[index]"
        :class="{
          'single-tile': true,
          hovered: hoveredTile === index,
          neighbourHovered: indicesOfNeighbourTilesList.includes(index),
          leaveTile: tileHoverLeave === index
        }"
      ></div>
    </div>
    <div class="background-container">
      <div class="background-image-tiles"></div>
      <div class="hidden-text">Hallo Verena ❤️</div>
      <div class="hidden-icons">❤️🐮❤️</div>
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
      coordinatesNeighbourTilesList: [],
      indicesOfNeighbourTilesList: []
    }
  },
  methods: {
    handleMouseHover(e, index) {
      this.coordinatesNeighbourTilesList = []
      this.indicesOfNeighbourTilesList = []
      // füge der gehoverten Kachel
      this.hoveredTile = index
      this.tileHoverLeave = null
      const tileId = e.target.getAttribute('data-id')
      console.log('Id:', tileId)
      // berechne alle koordinaten der benachtbarten Kacheln
      let hoveredTileXPosition = Number(e.target.attributes.xCoordinates.value)
      let hoveredTileYPosition = Number(e.target.attributes.yCoordinates.value)
      for (let deltaX = -1; deltaX <= 1; deltaX++) {
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
          if (deltaX === 0 && deltaY === 0) continue // die gehoverte kachel ausschließen
          let neighbourTileXcoordinate = hoveredTileXPosition + deltaX
          let neighbourTileYcoordinate = hoveredTileYPosition + deltaY
          this.coordinatesNeighbourTilesList.push([
            neighbourTileXcoordinate,
            neighbourTileYcoordinate
          ])
          let indexOfNeighbourTile = this.store.tileData.tileXCoordinates.findIndex(
            (xCoord, index) =>
              xCoord === neighbourTileXcoordinate &&
              this.store.tileData.tileYCoordinates[index] === neighbourTileYcoordinate
          )
          if (indexOfNeighbourTile !== -1) {
            this.indicesOfNeighbourTilesList.push(indexOfNeighbourTile)
            this.hoveredTile = index
          }
        }
      }
    },

    handleMouseLeave(e, index) {
      this.neighbourTiles = []
      this.tileHoverLeave = index
      this.hoveredTile = null
    }
  },
  created() {
    this.store.initialCalcOfCoordinates()
  }
}
</script>

<style>
.tile-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  width: 400px;
}
.single-tile {
  width: 10px;
  height: 10px;
  background-color: blanchedalmond;
  text-align: center;
  background-image: radial-gradient(#ecec84 10%, #ffb69b 60%, #a299ca, #7ccaae 90%);
}

.single-tile.hovered {
  opacity: 0;
  animation: rotate-tile-forward 0.5s ease-in-out;
}
.single-tile.neighbourHovered {
  animation: rotate-tile-forward-half 0.3s forwards;
}

.single-tile.leaveTile {
  animation: rotate-tile-backwards 0.5s backwards;
}
.background-container {
  position: relative;
}
.background-image-tiles {
  top: -400px;
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: #7ccaae;
  z-index: -10;
}
.hidden-text {
  position: absolute;
  top: -100px;
  left: 150px;
  z-index: -3;
}
.hidden-icons {
  position: absolute;
  top: -320px;
  left: 100px;
  z-index: -3;
}

@keyframes rotate-tile-forward {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    border-radius: 25px;
  }
}
@keyframes rotate-tile-backwards {
  0% {
    border-radius: 15px;
    translate: 0px 30px;
    opacity: 0;
  }
  100% {
    translate: 0px 0px;
    opacity: 0;
  }
}
@keyframes rotate-tile-forward-half {
  0% {
    transform: scale(1);
  }
  100% {
    border-radius: 15px;
    translate: 0px 30px;
  }
}
</style>
