/**
 *
 * 参数 elem 在非 static 定位的情况会自动设置为 relative
 *
 * 目前只实现 x 方向
 * */

import dragPlus from './drag-plus'
import domHandle from './dom-handle'
import MoveHandle from './move-handle'

export default class extends MoveHandle{
  constructor({elem,onDown=()=>{}, onMove=()=>{},onUp=()=>{}}){

    let {bar,initWidth} = domHandle({elem})

    super({initWidth})

    dragPlus({
      eDrag: bar,
      onDown:(e)=> {
        onDown()

        this.down()

        if (e.cancelable) e.preventDefault()
      },
      onMove:({x})=> {

        onMove(x)

        this.move(x,(currWidth) =>{
          elem.style.width = currWidth + 'px'

          this.currWidth = currWidth
        })
      },
      onUp
    })
  }
}
