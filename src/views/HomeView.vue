<template>
  <main>
    <div class="tile-container">
      <div
        @mouseover="handleMouseHover($event, index)"
        @mouseleave="handleMouseLeave($event, index)"
        v-for="index of store.tileData.number"
        :key="index"
        :xCoordinates="store.tileData.tileXCoordinates[index]"
        :yCoordinates="store.tileData.tileYCoordinates[index]"
        :class="{
          'single-tile': true,
          hovered: hoveredTile === index,
          neighbourHovered: indicesOfNeighbourTilesList.includes(index),
          leaveTile: tileHoverLeave === index
        }"
        :style="{ opacity: this.store.tileData.opacityOfTilesList[index] }"
      ></div>
    </div>
    <div class="background-container">
      <img class="hidden-image" src="@/assets/background.png" />
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
      indicesOfNeighbourTilesList: [],
      opacitiyResetTimer: null
    }
  },
  methods: {
    handleMouseHover(e, index) {
      this.coordinatesNeighbourTilesList = []
      this.indicesOfNeighbourTilesList = []
      // füge der gehoverten Kachel
      this.hoveredTile = index
      this.tileHoverLeave = null
      // berechne alle koordinaten der direkt benachtbarten Kacheln
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
            // verringere die opacity der benachtbarten kacheln
            if (this.store.tileData.opacityOfTilesList[indexOfNeighbourTile] > 0) {
              this.store.tileData.opacityOfTilesList[indexOfNeighbourTile] -= 0.2
              this.store.tileData.opacityOfTilesList[indexOfNeighbourTile] = parseFloat(
                this.store.tileData.opacityOfTilesList[indexOfNeighbourTile].toFixed(2)
              )
            }
          }
        }
      }
      // verringere die opacity der gehoverten kachel
      if (this.store.tileData.opacityOfTilesList[index] < 0) {
        this.store.tileData.opacityOfTilesList[index] = 0
      }
      if (this.store.tileData.opacityOfTilesList[index] > 0) {
        this.store.tileData.opacityOfTilesList[index] -= 0.2
        this.store.tileData.opacityOfTilesList[index] = parseFloat(
          this.store.tileData.opacityOfTilesList[index].toFixed(2)
        )
      }
    },
    // regeneriere die opacitiy über die zeit
    startOpacityRecovery() {
      if (this.opacitiyResetTimer) {
        clearInterval(this.opacitiyResetTimer)
      }
      setInterval(() => {
        this.store.tileData.opacityOfTilesList = this.store.tileData.opacityOfTilesList.map(
          (opacity) => {
            if (opacity < 1) {
              opacity += 0.1
            }
            return opacity
          }
        )
      }, 5000)
    },

    handleMouseLeave(e, index) {
      this.neighbourTiles = []
      this.tileHoverLeave = index
      this.hoveredTile = null
    }
  },
  created() {
    this.store.initialCalcOfCoordinates()
    this.startOpacityRecovery()
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
  text-align: center;
  background-image: radial-gradient(#ecec84 20%, #ffb69b 30%, #a299ca 50%, #7ccaae 90%);
}

.single-tile.hovered {
  opacity: 0;
  animation: rotate-tile-forward 0.5s ease-in-out;
}
.single-tile.neighbourHovered {
  animation: rotate-tile-forward-neighbour 2s;
}

.single-tile.leaveTile {
  _animation: rotate-tile-backwards 0.5s backwards;
}
.background-container {
  position: relative;
}
.hidden-image {
  top: -400px;
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: #7ccaae;
  z-index: -10;
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
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes rotate-tile-forward-neighbour {
  0% {
    box-shadow: 0px 0px 10px #f5ff00;
  }
  100% {
    box-shadow: 0px 0px 25px #f5ff00;
    transform: scale(3);
    opacity: 0;
  }
}
</style>
