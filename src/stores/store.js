import { defineStore } from 'pinia'
//import { reactive } from 'vue'

export const store = defineStore('Store', {
  state: () => ({
    tileData: {
      number: [],
      tileXCoordinates: [],
      tileYCoordinates: [],
      opacityOfTilesList: []
    },
    temporayData: {
      amountRows: 40,
      amountColumns: 40
    }
  }),
  actions: {
    initialCalcOfCoordinates() {
      let totalAmountOfTiles = this.temporayData.amountRows * this.temporayData.amountColumns
      for (let i = 0; i < totalAmountOfTiles; i++) {
        this.tileData.number.push(i)
      }
      for (let y = 1; y <= this.temporayData.amountRows; y++) {
        for (let x = 1; x <= this.temporayData.amountColumns; x++) {
          this.tileData.tileXCoordinates.push(x)
          this.tileData.tileYCoordinates.push(y)
          this.tileData.opacityOfTilesList.push(1)
        }
      }
    }
  }
})
