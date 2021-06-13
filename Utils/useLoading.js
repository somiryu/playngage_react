import React, { useState, useEffect } from "react"
import { Load } from "./engine"

const useLoading = (loadersArray = [], text = "Cargando...", id = "generalLoader") => {
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    setLoaded(loadersArray.filter(e => !React.isValidElement(e) && e !== true).length)
  }, [...loadersArray])

  if (loaded === loadersArray.length) return false

  return (
    <div id={id} className="generalLoader">
      <Load id="general_loader" />
      <div className="loader-label">{text} <span className="loader-loaded">{loaded}</span>/<span className="loader-toLoad">{loadersArray.length - 1}</span></div>
    </div>
  )
}

export default useLoading