'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MoveHandle = function (_ref) {
  var initWidth = _ref.initWidth;

  this.currWidth = initWidth;
  this.minWidth = 10;
  this.maxWidth = 200;

  var tpWidth = void 0;
  var minWidth = void 0;
  var maxWidth = void 0;
  this.down = function () {
    tpWidth = this.currWidth;
    minWidth = this.minWidth;
    maxWidth = this.maxWidth;
  };

  this.move = function (x, move) {
    tpWidth += x;

    var currWidth = tpWidth;

    if (currWidth < minWidth) {
      currWidth = minWidth;
    } else if (currWidth > maxWidth) {
      currWidth = maxWidth;
    }

    move(currWidth);

    this.currWidth = currWidth;
  };
};

/**
 * 更基础的拖动
 * 针对pc鼠标事件实现
 *
 * 兼容性：ie9+
 *
 * @param onDown 可通过 return false 阻止拖动发送
 */
function drag$1(_ref) {
  var eDrag = _ref.eDrag,
      onMove = _ref.onMove,
      _ref$onDown = _ref.onDown,
      onDown = _ref$onDown === undefined ? function () {} : _ref$onDown,
      _ref$onUp = _ref.onUp,
      onUp = _ref$onUp === undefined ? function () {} : _ref$onUp;

  eDrag.addEventListener('mousedown', down);

  function down(e) {

    if (onDown(e) === false) return;

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);

    function mousemove(e) {
      onMove(e);
    }

    function mouseup() {
      onUp();

      //解除所有事件
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }
  }
}

/**
 * 计算坐标
 * 点与点相加
 * */
function Figure() {
  this.start = function (x, y) {
    this.prevX = x;
    this.prevY = y;
  };

  this.move = function (x, y, fn) {
    fn(x - this.prevX, y - this.prevY);

    this.prevX = x;
    this.prevY = y;
  };
}

/**
 * 针对pc鼠标事件实现
 *
 * 此处使用了点点相加处理，如需更加灵活，请使用drag-base
 *
 * 兼容性：ie9+
 */

var figure = new Figure();

function drag(_ref) {
  var eDrag = _ref.eDrag,
      _onMove = _ref.onMove,
      _ref$onDown = _ref.onDown,
      _onDown = _ref$onDown === undefined ? function () {} : _ref$onDown,
      _ref$onUp = _ref.onUp,
      onUp = _ref$onUp === undefined ? function () {} : _ref$onUp;

  drag$1({
    eDrag: eDrag,
    onMove: function onMove(event) {
      figure.move(event.pageX, event.pageY, function (x, y) {
        _onMove({ x: x, y: y, event: event });
      });
    },
    onDown: function onDown(e) {
      if (_onDown(e) === false) return false;
      figure.start(e.pageX, e.pageY);
    },

    onUp: onUp
  });
}

function domHandle(_ref) {
  var elem = _ref.elem;

  var bar = document.createElement('div');

  bar.setAttribute('style', 'position:absolute;right:-5px;top:0;bottom:0;width:10px;cursor:e-resize;');

  elem.appendChild(bar);

  var style = window.getComputedStyle(elem, null);
  var isStatic = style.getPropertyValue('position') === 'static';
  var initWidth = parseFloat(style.getPropertyValue('width'));

  if (isStatic) {
    elem.style.position = 'relative';
  }

  return { bar: bar, initWidth: initWidth };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 *
 * 参数 elem 在非 static 定位的情况会自动设置为 relative
 *
 * 目前只实现 x 方向
 * */

var _class = function (_MoveHandle) {
  inherits(_class, _MoveHandle);

  function _class(_ref) {
    var elem = _ref.elem,
        _ref$onDown = _ref.onDown,
        _onDown = _ref$onDown === undefined ? function () {} : _ref$onDown,
        _ref$onMove = _ref.onMove,
        _onMove = _ref$onMove === undefined ? function () {} : _ref$onMove,
        _ref$onUp = _ref.onUp,
        onUp = _ref$onUp === undefined ? function () {} : _ref$onUp;

    classCallCheck(this, _class);

    var _domHandle = domHandle({ elem: elem }),
        bar = _domHandle.bar,
        initWidth = _domHandle.initWidth;

    var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, { initWidth: initWidth }));

    drag({
      eDrag: bar,
      onDown: function onDown(e) {
        _onDown();

        _this.down();

        if (e.cancelable) e.preventDefault();
      },
      onMove: function onMove(_ref2) {
        var x = _ref2.x;


        _onMove(x);

        _this.move(x, function (currWidth) {
          elem.style.width = currWidth + 'px';

          _this.currWidth = currWidth;
        });
      },
      onUp: onUp
    });
    return _this;
  }

  return _class;
}(MoveHandle);

exports.MoveHandle = MoveHandle;
exports.DragRelateSize = _class;
