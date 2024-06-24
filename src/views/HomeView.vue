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
          :xCoordinates="store.tileData.tileXCoordinates[index]"
          :yCoordinates="store.tileData.tileYCoordinates[index]"
          :class="{
            'single-tile': true,
            hovered: hoveredTile === index,
            neighbourHovered: indicesOfNeighbourTilesList.includes(index),
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
.single-tile.neighbourHovered {
  background-color: goldenrod;
  animation: rotate-tile-forward-half 0.5s forwards;
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
@keyframes rotate-tile-forward-half {
  0% {
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
