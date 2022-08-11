/**
 * @flow
 */
"use strict"
import React from "react"

const rversion = function(lib1, lib2) {
  const v = React.version || ''

  function diffv() {
    if (v === '') {
      return false
    }
    const va = v.split('.') || ['']
    const v1 = va[0]
    if (v1 === '') {
      return false
    }
    if (parseInt(v1) >= 17) {
      return true
    }
    return false
  }

  function fn(f) {
    if (f && typeof f === 'function') {
      return f()
    }
    return null
  }

  if (diffv() === true) {
    return fn(lib1)
  } else {
    return fn(lib2)
  }
}
module.exports = rversion
