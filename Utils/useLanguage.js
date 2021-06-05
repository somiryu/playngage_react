import React, { useEffect, useState } from 'react'
import engine, { Load } from "./engine"

export default function useLanguage() {
  const [lang, setLang] = useState(engine.getCookie("mlang") || "es")
  const [loading, setLoading] = useState(<Load id="lang" />)
  useEffect(() => engine.translations.get(() => setLoading(false)), [])

  const t = (tag) => engine.t(tag, lang)

  useEffect(() => {
    engine.setCookie("mlang", lang)
    engine.translations.lang = lang
  }, [lang])

  return [t, lang, setLang, loading]
}
