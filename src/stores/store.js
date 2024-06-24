import { defineStore } from 'pinia'
//import { reactive } from 'vue'

export const store = defineStore('Store', {
  state: () => ({
    tileData: {
      number: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29
      ],
      tileXCoordinates: [],
      tileYCoordinates: []
    },
    temporayData: {
      amountRows: 5,
      amountColumns: 6
    }
  }),
  actions: {
    initialCalcOfCoordinates() {
      for (let y = 1; y <= this.temporayData.amountRows; y++) {
        for (let x = 1; x <= this.temporayData.amountColumns; x++) {
          this.tileData.tileXCoordinates.push(x)
          this.tileData.tileYCoordinates.push(y)
        }
      }
    }
  }
})
