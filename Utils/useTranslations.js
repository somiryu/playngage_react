import {useState, useEffect} from "react"
import engine from "./engine"

//Place translations in category "translations" in Immutables
//use [lang, lading, setLanguage, trans] = useTranslations(true) when getting immutables

//Call engine.translate(tag) // or engine.t(tag) from anywhere to get translation
// -- better ig language will not change in the future from other components
//or
//in other places you can use [lang, setLang, t] = useTranslations() to get translations
// -- in this case you can use t(tag) to translate.
// -- The second case is updated if lang is changes.

export default get =>{
	const [lang, setLang] = useState("es")
	const [loading, setLoading] = useState(true)

	useEffect(()=>{setLang(engine.translations.t)}, [])
	useEffect(()=>{
		setLoading(true)
		if (get) engine.translations.get(d=>setLoading(false));
	},[get])

	const setLanguage = (l) =>{engine.translations.lang = l;setLang(l)}
	const trans = (tag) =>{return engine.t(tag)}

	return get ? [lang, loading, setLanguage, trans] : [lang, setLanguage, trans]
}