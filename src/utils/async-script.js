const callbacks = []
const asyncLoadScript = (src, existVariable, callback) => {
  const existingScript = document.getElementById(src)
  const cb = callback || function() {} // eslint-disable-line

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }

  if (existingScript && cb) {
    if (existVariable) {
      cb(null, existingScript)
    } else {
      callbacks.push(cb)
    }
  }

  function stdOnEnd(script) {
    script.onload = function() {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      callbacks.forEach(fn => fn(null, script))
      callbacks.length = 0
    }
    script.onerror = function() {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      callbacks.forEach(fn => fn(null, script))
      callbacks.length = 0
    }
  }
}

export default asyncLoadScript
