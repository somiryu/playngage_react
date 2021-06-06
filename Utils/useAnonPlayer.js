import React, { useState, useEffect } from 'react'
import engine, { Players, Load } from "./engine"

const load = <Load id="loadingPlayer" />

export default function useAnonPlayer() {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(load)

  useEffect(() => {
    let id_in_app = engine.getUser() || Date.now() + (Math.random() + 1).toString(36).substring(7)
    engine.logIn(id_in_app) //Renews cookie
    console.log(id_in_app)
    //Call API
    Players.get_or_create(id_in_app, (p) => {
      console.log(p)
      setLoading(false)
      setPlayer(p)
    })
  }, [])

  const reloadPlayer = () => {
    setLoading(load)
    Players.get(engine.getUser(), (p) => { setPlayer(p); setLoading(false) })
  }

  const log = (email) => {
    //updateplayer
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) { } else {
      return
    }
    setLoading(load)
    let id_in_app = email.replace("@", "_").split(".").join("-")
    Players.update({ new_id_in_app: id_in_app, email }, (r) => {
      setLoading(false)
      if (r.success && r.success === true) {
        engine.logIn(id_in_app)
        setPlayer(r.player)
      }
    })
  }


  return [player, setPlayer, loading, log]
}
