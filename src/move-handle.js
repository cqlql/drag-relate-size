
export default function ({initWidth}) {
    this.currWidth = initWidth
    this.minWidth = 10
    this.maxWidth = 200

    let tpWidth
    let minWidth
    let maxWidth
    this.down = function () {
      tpWidth = this.currWidth
      minWidth = this.minWidth
      maxWidth = this.maxWidth
    }

    this.move = function (x,move) {
      tpWidth += x

      let currWidth = tpWidth

      if (currWidth < minWidth) {
        currWidth = minWidth
      }
      else if(currWidth>maxWidth){
        currWidth = maxWidth
      }

      move(currWidth)

      this.currWidth = currWidth
    }

}
