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
      console.log('target', hoveredTileXPosition, hoveredTileYPosition)
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
      console.log('coordinatesNeighbourTilesList', this.coordinatesNeighbourTilesList)
      console.log('indicesOfNeighbourTilesList', this.indicesOfNeighbourTilesList)
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
  width: 500px;
}
.single-tile {
  width: 50px;
  height: 50px;
  background-color: blanchedalmond;
  _border: 2px solid black;
  text-align: center;
}

.single-tile.hovered {
  _background-color: goldenrod;
  animation: rotate-tile-forward 1s forwards;
}
.single-tile.neighbourHovered {
  _background-color: goldenrod;
  animation: rotate-tile-forward-half 0.5s forwards;
}

.single-tile.leaveTile {
  _background-color: rgb(231, 200, 120);
  animation: rotate-tile-backwards 0.5s backwards;
}
.background-container {
  position: relative;
}
.background-image-tiles {
  top: -300px;
  position: absolute;
  width: 250px;
  height: 190px;
  background-color: goldenrod;
  z-index: -10;
}
.hidden-text {
  position: absolute;
  top: -100px;
  right: 50px;
  z-index: -3;
}
.hidden-icons {
  position: absolute;
  top: -200px;
  left: 100px;
  z-index: -3;
}

@keyframes rotate-tile-forward {
  0% {
  }
  100% {
    transform: rotateY(270deg);
    border-radius: 20px;
  }
}
@keyframes rotate-tile-backwards {
  0% {
  }
  100% {
    transform: rotateY(-90deg) scaleY(0.5);
  }
}
@keyframes rotate-tile-forward-half {
  0% {
  }
  100% {
    transform: rotateY(70deg) scaleY(0.5);
    border-radius: 20px;
  }
}
</style>
