<template>
  <div class="modal--sa">
    <canvas
      ref="canvas"
      id="canvas"
    ></canvas>
    <div class="modal__actions fullwidth modal--sa__action rounded">
      <button
        class="modal__btn fullwidth"
        v-on:click="hideModal"
      >
        <span
          aria-hidden="true"
          class="fas fa-times"
        />
        Anuluj
      </button>
      <button
        class="modal__btn fullwidth modal__btn--violet"
        v-on:click="saveAppointmentAgreement"
      >
        <span
          aria-hidden="true"
          class="fas fa-save"
        />
        Zapisz
      </button>
    </div>
  </div>
</template>

<script>
  import { API_URL } from '@/apollo/constants'
  import { mapActions, mapGetters } from 'vuex'
  import '../modal.scss'

  export default {
    name: 'SignAgreement',
    data: function () {
      return {
        apiUrl: API_URL,
        drawing: null
      }
    },
    computed: {
      ...mapGetters({
        data: 'modal/data',
        historyData: 'addHistory/data'
      })
    },
    methods: {
      ...mapActions({
        hideModal: 'modal/hide',
        setHistory: 'addHistory/setData'
      }),
      saveAppointmentAgreement: function () {
        let canvas = this.drawing
        const file = canvas.toBlob(file => {
          const payload = Object.assign(this.historyData, {
            agreement: file
          })

          this.setHistory(payload)
          this.hideModal()
        })
      },
      addImageProcess: function (src) {
        return new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = src
          img.crossOrigin = 'anonymous'
        })
      }
    },
    mounted: async function () {
      var self = this
      const imageUrl = `${API_URL}/storage/files/${this.data.template}`
      const U = undefined
      const doFor = (count, callback) => {
        var i = 0
        while (i < count && callback(i++) !== true)
          }
      const drawModeDelay = 3 // number of frames to delay drawing just incase the pinch touch is
      // slow on the second finger
      const worldPoint = {x: 0, y: 0} // worldf point is in the coordinates system of the drawing
      const ctx = canvas.getContext('2d')
      var drawMode = false // true while drawing
      var pinchMode = false // true while pinching
      var startup = true // will call init when true

      var img = await this.addImageProcess(imageUrl)

      // the drawing image
      const drawing = document.createElement('canvas')
      const W = (drawing.width = img.width)
      const H = (drawing.height = img.height)
      const dCtx = drawing.getContext('2d')
      dCtx.fillStyle = 'transparent'
      dCtx.fillRect(0, 0, W, H)
      dCtx.drawImage(img, 0, 0)
      const mobileRatio = window.innerWidth / img.width
      const desktopRatio = (960 / img.height)
      const imageScale = window.innerWidth < 960 ? mobileRatio : desktopRatio

      // pointer is the interface to the touch
      const pointer = setupPointingDevice(canvas)
      ctx.font = '16px arial.'

      // drawing functions and data
      const drawnPoints = [] // array of draw points
      var iPoints = 0
      var lastPt = null

      function drawOnDrawing () {
        // draw all points on drawingPoint array
        dCtx.fillStyle = 'black'
        dCtx.lineWidth = img.width * 0.005
        for (; iPoints < drawnPoints.length; iPoints++) {
          const point = drawnPoints[iPoints]
          if (lastPt != null) {
            dCtx.beginPath()
            dCtx.moveTo(lastPt.x, lastPt.y)
            dCtx.lineTo(point.x, point.y)
            dCtx.lineCap = 'round'
            dCtx.stroke()
          }
          lastPt = {x: point.x, y: point.y}
        }
      }

      // called once at start
      function init () {
        startup = false
        view.setContext(ctx)
      }

      // standard vars
      var w = canvas.width
      var h = canvas.height
      var cw = w / 2 // center
      var ch = h / 2
      var globalTime

      // main update function
      function update (timer) {
        if (startup) {
          init()
        }
        globalTime = timer
        ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform
        ctx.globalAlpha = 1 // reset alpha
        ctx.globalCompositeOperation = 'source-over'
        if (w !== innerWidth || h !== innerHeight) {
          cw = (w = canvas.width = innerWidth) / 2
          ch = (h = canvas.height = innerHeight) / 2
        }

        ctx.clearRect(0, 0, w, h)
        view.apply()
        ctx.fillStyle = 'black'
        ctx.globalAlpha = 0.4
        ctx.fillRect(5, H, W - 5, 5)
        ctx.fillRect(W, 5, 5, H)
        ctx.globalAlpha = 1
        ctx.drawImage(drawing, 0, 0)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        if ((pointer.count === 1 || drawMode) && !pinchMode) {
          if (pointer.count === 0) {
            drawMode = false
            drawOnDrawing()
          } else {
            view.toWorld(pointer, worldPoint)
            drawnPoints.push({x: worldPoint.x, y: worldPoint.y})
            if (drawMode) {
              drawOnDrawing()
            } else if (drawnPoints.length > drawModeDelay) {
              drawMode = true
            }
          }
        } else if (pointer.count === 2 || pinchMode) {
          drawnPoints.length = 0 // dump any draw points
          if (pointer.count === 0) {
            pinchMode = false
          } else if (!pinchMode && pointer.count === 2) {
            pinchMode = true
            view.setPinch(pointer.points[0], pointer.points[1])
          } else {
            view.movePinch(pointer.points[0], pointer.points[1])
          }
        } else {
          pinchMode = false
          drawMode = false
        }
        requestAnimationFrame(update)
      }

      requestAnimationFrame(update)

      function mouse (element) {
        const mouse = {
          points: [],
          x: 0,
          y: 0,
          // isTouch : true,
          count: 0,
          w: 0,
          rx: 0,
          ry: 0
        }
        var m = mouse
        var t = mouse.points

        function newMouse () {
          if (t[0].id === -1) {
            return t[0]
          }
        }

        function getMouse (id) {
          if (t[0].id === id) {
            return t[0]
          }
        }

        function mouseDo () {
          var tCount = 0
          if (t[0].id !== -1) {
            if (tCount === 0) {
              m.x = t[0].x
              m.y = t[0].y
            }
            tCount += 1
          }
          m.count = tCount
        }

        function setMouse (mousePoint, point, start, down) {
          if (mousePoint === undefined) {
            return
          }
          if (start) {
            mousePoint.oy = point.pageX
            mousePoint.ox = point.pageY
            mousePoint.id = 0
          } else {
            mousePoint.ox = mousePoint.x
            mousePoint.oy = mousePoint.y
          }
          mousePoint.x = point.pageX
          mousePoint.y = point.pageY - window.scrollY
          mousePoint.down = down
          if (!down) {
            mousePoint.id = -1
            lastPt = null
            self.drawing = drawing
          }
        }

        function mouseEvent (e) {
          if (e.type === 'mousedown') {
            setMouse(newMouse(), e, true, true)
          } else if (e.type === 'mousemove') {
            setMouse(getMouse(0), e, false, true)
          } else if (e.type === 'mouseup') {
            setMouse(getMouse(0), e, false, false)
          }
          mouseDo()
          e.preventDefault()
          return false
        }

        element = element === undefined ? document : element
        doFor(1, () =>
          mouse.points.push({x: 0, y: 0, dx: 0, dy: 0, down: false, id: -1})
        );
        ['mousedown', 'mousemove', 'mouseup'].forEach(name =>
          element.addEventListener(name, mouseEvent)
        )
        return mouse
      }

      function touch (element) {
        const touch = {
          points: [],
          x: 0,
          y: 0,
          // isTouch : true,
          count: 0,
          w: 0,
          rx: 0,
          ry: 0
        }
        var m = touch
        var t = touch.points

        function newTouch () {
          for (var j = 0; j < m.pCount; j++) {
            if (t[j].id === -1) {
              return t[j]
            }
          }
        }

        function getTouch (id) {
          for (var j = 0; j < m.pCount; j++) {
            if (t[j].id === id) {
              return t[j]
            }
          }
        }

        function setTouch (touchPoint, point, start, down) {
          if (touchPoint === undefined) {
            return
          }
          if (start) {
            touchPoint.oy = point.pageX
            touchPoint.ox = point.pageY
            touchPoint.id = point.identifier
          } else {
            touchPoint.ox = touchPoint.x
            touchPoint.oy = touchPoint.y
          }
          touchPoint.x = point.pageX
          touchPoint.y = point.pageY - window.scrollY
          touchPoint.down = down
          if (!down) {
            touchPoint.id = -1
            lastPt = null
            self.drawing = drawing
          }
        }

        function mouseEmulator () {
          var tCount = 0
          for (var j = 0; j < m.pCount; j++) {
            if (t[j].id !== -1) {
              if (tCount === 0) {
                m.x = t[j].x
                m.y = t[j].y
              }
              tCount += 1
            }
          }
          m.count = tCount
        }

        function touchEvent (e) {
          var i, p
          p = e.changedTouches
          if (e.type === 'touchstart') {
            for (i = 0; i < p.length; i++) {
              setTouch(newTouch(), p[i], true, true)
            }
          } else if (e.type === 'touchmove') {
            for (i = 0; i < p.length; i++) {
              setTouch(getTouch(p[i].identifier), p[i], false, true)
            }
          } else if (e.type === 'touchend') {
            for (i = 0; i < p.length; i++) {
              setTouch(getTouch(p[i].identifier), p[i], false, false)
            }
          }
          mouseEmulator()
          e.preventDefault()
          return false
        }

        touch.pCount = navigator.maxTouchPoints
        element = element === undefined ? document : element
        doFor(navigator.maxTouchPoints, () =>
          touch.points.push({x: 0, y: 0, dx: 0, dy: 0, down: false, id: -1})
        );
        ['touchstart', 'touchmove', 'touchend'].forEach(name =>
          element.addEventListener(name, touchEvent)
        )
        return touch
      }

      function setupPointingDevice (element) {
        if (navigator.maxTouchPoints === undefined) {
          if (
            navigator.appVersion.indexOf('Android') > -1 ||
            navigator.appVersion.indexOf('iPhone') > -1 ||
            navigator.appVersion.indexOf('iPad') > -1
          ) {
            navigator.maxTouchPoints = 5
          }
        }
        if (navigator.maxTouchPoints > 0) {
          return touch(element)
        } else {
          return mouse(element)
        }
      }

      const view = (() => {
        const matrix = [1, 0, 0, 1, 0, 0] // current view transform
        const invMatrix = [1, 0, 0, 1, 0, 0] // current inverse view transform
        var m = matrix // alias
        var im = invMatrix // alias
        var scale = imageScale // current scale
        var rotate = 0
        var maxScale = 1
        const pinch1 = {x: 0, y: 0} // holds the pinch origin used to pan zoom and rotate with two touch points
        const pinch1R = {x: 0, y: 0}
        var pinchDist = 0
        var pinchScale = 1
        var pinchAngle = 0
        var pinchStartAngle = 0
        const workPoint1 = {x: 0, y: 0}
        const workPoint2 = {x: 0, y: 0}
        const wp1 = workPoint1 // alias
        const wp2 = workPoint2 // alias
        var ctx
        const pos = {x: 0, y: 0} // current position of origin
        var dirty = true
        const API = {
          canvasDefault () {
            ctx.setTransform(1, 0, 0, 1, 0, 0)
          },
          apply () {
            if (dirty) {
              this.update()
            }
            ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])
          },
          reset () {
            scale = 1
            rotate = 0
            pos.x = 0
            pos.y = 0
            dirty = true
          },
          matrix,
          invMatrix,
          update () {
            dirty = false
            m[3] = m[0] = Math.cos(rotate) * scale
            m[2] = -(m[1] = Math.sin(rotate) * scale)
            m[4] = pos.x
            m[5] = pos.y
            this.invScale = 1 / scale
            var cross = m[0] * m[3] - m[1] * m[2]
            im[0] = m[3] / cross
            im[1] = -m[1] / cross
            im[2] = -m[2] / cross
            im[3] = m[0] / cross
          },
          toWorld (from, point = {}) {
            // convert screen to world coords
            var xx, yy
            if (dirty) {
              this.update()
            }
            xx = from.x - m[4]
            yy = from.y - m[5]
            point.x = xx * im[0] + yy * im[2]
            point.y = xx * im[1] + yy * im[3]
            return point
          },
          toScreen (from, point = {}) {
            // convert world coords to screen coords
            if (dirty) {
              this.update()
            }
            point.x = from.x * m[0] + from.y * m[2] + m[4]
            point.y = from.x * m[1] + from.y * m[3] + m[5]
            return point
          },
          setPinch (p1, p2) {
            // for pinch zoom rotate pan set start of pinch screen coords
            if (dirty) {
              this.update()
            }
            pinch1.x = p1.x
            pinch1.y = p1.y
            var x = p2.x - pinch1.x
            var y = p2.y - pinch1.y
            pinchDist = Math.sqrt(x * x + y * y)
            pinchStartAngle = Math.atan2(y, x)
            pinchScale = scale
            pinchAngle = rotate
            this.toWorld(pinch1, pinch1R)
          },
          movePinch (p1, p2, dontRotate) {
            if (dirty) {
              this.update()
            }
            var x = p2.x - p1.x
            var y = p2.y - p1.y
            var pDist = Math.sqrt(x * x + y * y)
            scale = pinchScale * (pDist / pinchDist)
            if (!dontRotate) {
              var ang = Math.atan2(y, x)
              rotate = pinchAngle + (ang - pinchStartAngle)
            }
            this.update()
            pos.x = p1.x - pinch1R.x * m[0] - pinch1R.y * m[2]
            pos.y = p1.y - pinch1R.x * m[1] - pinch1R.y * m[3]
            dirty = true
          },
          setContext (context) {
            ctx = context
            dirty = true
          }
        }
        return API
      })()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../main";

  .modal--sa {
    max-width: 90vw;

    &__action {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      width: calc(100% - 2rem);
      border-radius: 0.5rem;
      overflow: hidden;
      z-index: 100;

      span {
        margin-right: 0.5rem;
      }
    }

    canvas {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 2;
      width: 100vw;
      height: 100vh;
    }
  }
</style>
