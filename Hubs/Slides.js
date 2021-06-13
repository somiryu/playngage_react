import React, { useState } from 'react'

export default function Slides({ objs, arrowBack, arrowNext, loop = false }) {
  const [slide, setSlide] = useState(0)
  const change = (x) => {
    setSlide(prev => objs[prev + x] ? prev + x :
      (x === -1 ? objs.length - 1 : 0)
    )
  }

  return (
    <div className="Slides">
      {(loop || objs[slide - 1]) && <div className="arrow arrow-back" onClick={() => change(-1)}>{arrowBack || "<"}</div>}
      <div className="slides-content">
        {objs[slide]}
      </div>

      {(loop || objs[slide + 1]) && <div className="arrow arrow-next" onClick={() => change(1)}>{arrowNext || ">"}</div>}
    </div>
  )
}
