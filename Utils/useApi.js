import React, { useState, useEffect, useCallback, useRef } from 'react'
import * as API from "./engine"

// call("Player", "rewardAssociations", {id: 3}, true, (res)=>{})
export default function useApi(model, api, args, autoLoad = true, callback) {
  const [results, setResults] = useState(<API.Load id={`${model}-${api}`} />)
  const signal = useRef()

  const call = useCallback((newArgs) => {
    setResults(<API.Load id={`${model}-${api}`} />)
    const listener = (response) => {
      if (callback) callback(response)
      if (!response.success) {
        setResults(response.success === false ? response.status : response)
      } else {
        setResults(response)
      }
    }
    const data = { ...args, ...newArgs }
    signal.current = API[model][`${api}Hook`]({ data, listener })

  }, [api, args])

  useEffect(() => {
    autoLoad ? call() : setResults(false)
    return () => { if (signal.current) signal.current.abort() }
  }, [])

  return [results, call]
}
