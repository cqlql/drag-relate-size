
export default function domHandle({elem}) {
  let bar = document.createElement('div')

  bar.setAttribute('style', `position:absolute;right:-5px;top:0;bottom:0;width:10px;cursor:e-resize;`)

  elem.appendChild(bar)

  let style = window.getComputedStyle(elem, null)
  let isStatic = style.getPropertyValue('position') === 'static'
  let initWidth = parseFloat(style.getPropertyValue('width'))

  if(isStatic){
    elem.style.position  = 'relative'
  }

  return {bar,initWidth}
}
