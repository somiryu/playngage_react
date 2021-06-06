//Add Token with addToken(api, test) function

import Loading from "../Loaders/Loading"

export const config = {
	api_token: "",
	test_api_token: "",
	base_url: 'https://engine.playngage.io/api/',
	test_url: "http://localhost:5000/api/",
	cable_url: "wss://engine.playngage.io/cable/",
	cable_url_test: "ws://127.0.0.1:5000/cable/",
	test: false,
	debug: false,
	expDays: 3,
	setToken: function (api, test) { this.api_token = api; this.test_api_token = test ? test : api },
	getToken: function () { this.test ? this.test_api_token : this.api_token },
	getCableUrl: function () { this.test ? this.cable_url_test : this.cable_url },
}



const engine = {
	translations: {
		lang: "es", tr: {},
		get: function (listener, cat = "translations") { Immutables.all(d => { this.tr = d; listener && listener(d) }, { by_tags: true, filter: { categories: cat } }) },
		translate: function (tag) { const tr = this.t[tag]; if (!tr) return "Incorrect tag"; return tr[this.lang] },
	},
	translate: function (tag, lang) {
		//console.log(this.translations.lang, this.translations.tr)
		let tra = this.translations.tr
		const tr = tra[tag];
		return (!tr || tr === undefined) ? tag : tr[lang || this.translations.lang] ? tr[lang || this.translations.lang] : (`Empty Trans ${tag}`)
	},
	t: function (tag, lang) { return this.translate(tag, lang) },
	lang: function () { return this.translations.lang },
	image: function (path) {
		if (this.test) { //REVISAR
			return path.replace("https://engine2.playngage.io", "http://localhost:5000").replace("http://localhost:5000", "http://localhost:3001")
		} else { return path }
	},
	getCookie: (cookie) => { var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) === ' ') { c = c.substring(1); }; if (c.indexOf(`${cookie}=`) === 0) { return c.split("=")[1]; } }; return false; },
	setCookie: (cookie, cvalue) => { let expDays = config.expDays; let d = new Date(); d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000)); document.cookie = `${cookie}=${cvalue};expires=${d.toUTCString()};path=/`; },
	deleteCookie: (cookie) => { document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;` },
	log: (a) => { if (config.debug) console.log(a) },
	setTest: () => config.test = true,
	setDebug: () => config.debug = true,
	logIn: (cvalue) => { let d = new Date(); d.setTime(d.getTime() + (config.expDays * 24 * 60 * 60 * 1000)); document.cookie = `iia=${cvalue};expires=${d.toUTCString()};path=/`; },
	getUser: () => { var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) === ' ') { c = c.substring(1); }; if (c.indexOf("iia=") === 0) { return c.split("=")[1]; } }; return false; },
	logOut: () => document.cookie = "iia=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",

	// INIT INTERCEPT ENDPOINT CALLS
	complete: (id_in_app, id_or_tag, listener, data = {}) => call("POST", `missions/${id_or_tag}/complete`, setDefaults(data, { id_in_app: id_in_app }), listener),
	intercept: (id_in_app, tags, listener, data = {}) => call("POST", "actions", setDefaults(data, { tags: tags, id_in_app: id_in_app }), listener),
}

const setParams = function (data, get) {
	var formData = get ? {} : new FormData();
	var checkNested = function (fD, key, value) {
		const insertField = (k, v) => get ? fD[k] = v : fD.append(k, v)

		if (typeof value != "object") return insertField(key, value)
		if (Array.isArray(value)) return insertField(key, value.join(","))
		if (key === "images" && !get) { for (let k in value) fD.append(k, value[k], value[k].name); return }
		for (var obj in value) checkNested(fD, `${key}[${obj}]`, value[obj]);
	}
	for (var obj in data) checkNested(formData, obj, data[obj])
	return formData;
}

const id = (agent) => (agent.agent_id || agent.agent.id)
const atype = (agent) => (agent.agent_type || agent.agent.agent_type)
const setDefaults = function (data = {}, defaults = {}) { for (var key in defaults) { data[key] = defaults[key] }; return data }

const call = function (method, service, data, listener) {
	const formData = setParams(data, method === "GET")
	var token = config.test ? config.test_api_token : config.api_token;
	var url = config.test ? config.test_url : config.base_url;

	//Set Headers
	var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Authorization", `Token token=${token}`);

	var miInit = { method: method, headers: myHeaders, mode: 'cors', cache: 'default' };
	//Include formData in body if post or put
	if (formData && (method === "POST" || method === "PUT" || method === "DELETE")) {
		//console.log('miInit =>', miInit); 
		formData.append("noEmpty", "true") //avoid multipart errors
		miInit.body = formData;
	}
	//Call
	function middlewareListener(data) {
		engine.log(`Returned from ${service} - ${method}`); engine.log(formData); engine.log(data);
		if (listener != null && listener !== undefined) { listener(data) } else { engine.log("No Listener") }
	}
	var built = new URL(url + service)
	if (method === "GET") { //You should have send true as second param in data
		Object.keys(formData).forEach(key => built.searchParams.append(key, formData[key]))
	}
	const controller = new AbortController()

	fetch(built, { ...miInit, signal: controller.signal })
		.then(response => response.json()).then(function (data) { middlewareListener(data) })
		.catch(err => console.log("Api error:", err))
}

export const Players = {
	create: (id_in_app, data = {}, listener) => { setDefaults(data, { id_in_app: id_in_app }); call("POST", "players/v2", data, listener) },
	get: (id_in_app, listener, data) => {
		setDefaults(data, { include: "basic,agent,quests" });
		call("GET", `players/${id_in_app}`, data, listener)
	},
	get_or_create: function (id_in_app, listener, data) {
		this.get(id_in_app, (d) => {
			if (d.status && d.status === "Invalid player: check id_in_app") { this.create(id_in_app, data, (cd) => { if (cd.player) this.get(id_in_app, (r) => listener(r)) }) } else { listener(d) }
		}, data)
	},
	update: (data = {}, listener) => call("PUT", `players/${engine.getUser()}`, data, listener),
}



export const Items = {
	getAgentItems: (listener, data = {}) => call("GET", "agent_items", data, listener),
	getOwnedAgentItems: (agent, listener, data = {}) => call("GET", "agent_items", setDefaults(data, { agent: id(agent), agent_type: atype(agent) }), listener),
	get: (tag, listener) => call("GET", `items/${tag}`, {}, listener),
	all: (listener, data = {}) => call("GET", "items", data, listener),
	give: (agent, id_or_tag, listener, data) => call("POST", `items/${id_or_tag}/agent/${id(agent)}/agent_type/${atype(agent)}/add`, data, listener),
	giveMultiple: (id_in_app, tags, listener, data = {}) => call("POST", `items/players/${id_in_app}/multiple`, setDefaults(data, { items: tags }), listener),
}

export const Agents = {
	update: (agent, data = {}, listener) => call("PUT", `agents/${id(agent)}/agent_type/${atype(agent)}`, data, listener),
	//in agent object include: updates: with all the options available in the api.
	multiple_update: (agents, listener) => {
		let data = { agents: {} }
		for (var i = agents.length - 1; i >= 0; i--) {
			let agent = agents[i]
			data.agents[id(agent)] = { ...agent.updates, agent_type: atype(agent) }
		}
		call("PUT", "agents/multiple", data, listener)
	},
	topLeaderboard: (currency_tag, listener, data) => call("GET", `agents/leaderboard/top/${currency_tag}`, data, listener),
	table_properties: (agent, tag, data, listener) => call("GET", `agents/${id(agent)}/agent_type/${atype(agent)}/table_properties/${tag}`, data, listener),
	send_trigger: (agent, id_or_tag, listener, data = {}) => call("POST", `missions/${id_or_tag}/complete`, setDefaults(data, { agent_id: id(agent), agent_type: atype(agent) }), listener),
	feedback: function (agent, tag, listener, data = {}) {
		this.update(agent, setDefaults(data, { reward: tag }), listener)
	},

	//No endpoints
	prop: (agent, tag) => agent.agent.properties[tag] ? agent.agent.properties[tag].value : null,
	checkProp: (agent, tag, value) => Agents.getProp(agent, tag) === value,
	cur: (agent, tag) => agent.agent.currencies[tag] ? agent.agent.currencies[tag].quantity : 0,
	getItemsByCategory: (agent, cat) => {
		if (!agent.items) return [false, "No items key"];
		const category = agent.items.items[cat]
		if (!category) return [false, `No category ${cat}`];
		return [category.items, true]
	},
	getSingleAgentItem: function (agent, cat, tag) {
		const [items, res] = this.getItemsByCategory(agent, cat)
		if (!items) return [false, res];
		const info = items[tag]
		if (!info) return [false, `No key with this tag: ${tag}`];
		const item = info.item
		const owned = info.owned[0]
		return [owned, item, items];
	},
	findFirstAgentItem: (agent, tag) => {
		let categories = agent.items.items;
		for (let cat in categories) {
			let items = categories[cat].items
			if (items[tag]) {
				return items[tag].owned[0]
			}
		}

	},
	searchByAgentItemProp: function (agent, cat, tag, value) {
		let r = []; const [items, res] = this.getItemsByCategory(agent, cat)
		if (!items) return [false, res];
		for (let t in items) { for (let i in items[t].owned) { const p = items[t].owned[i].agent.properties[tag]; if (p) { if (p.value === value) r.push([items[t].owned[i], items[t].item]) } } }
		return r
	},
	getAvailableMissions: (agent, quest) => agent.quests.available[quest].missions.available,
	getCooldownMissions: (agent, quest) => agent.quests.available[quest].missions.locked,
}

export const Decks = {
	all: (agent, data, listener) => call("GET", `agents/decks`, setDefaults(data, { agent_id: id(agent), agent_type: atype(agent) }), listener),
	get: (agent, tag, data, listener) => call("GET", `agents/decks/${tag}`, setDefaults(data, { agent_id: id(agent), agent_type: atype(agent) }), listener),
	update: (tag, action, listener, data = {}, id_in_app) => call("PUT", `agents/decks/${tag}`, setDefaults(data, { id_in_app: id_in_app || engine.getUser(), do: action }), listener),
}

export const Rooms = {
	all: (listener) => call("GET", "rooms", {}, listener),
	instances: (room_id, listener, data) => call("GET", `rooms/${room_id}/instances`, data, listener),
	instance: (id, listener) => call("GET", `rooms/instances/${id}`, {}, listener),
	by_code: (code, listener) => call("GET", `rooms/instances/code/${code}`, {}, listener),
	update_state: (id, state, listener) => { call("PUT", `rooms/instances/${id}/${state}`, {}, listener) },
	join: (id, listener, data = {}) => {
		call("POST", `rooms/instances/${id}/join`, setDefaults(data, { id_in_app: engine.getUser() }), (d) => {
			if (d.success === true) { setCookie(`instance_${id}`, "joined"); setCookie("current_instance", id) }
			if (d.status === "Already in the room") { setCookie(`instance_${id}`, "joined"); setCookie("current_instance", id) }
			listener(d);
		})
	},
	kick: (id, id_in_app, listener, data = {}) => call("DELETE", `rooms/instances/${id}/kick`, setDefaults(data, { id_in_app: id_in_app }), listener),
	getOwnParticipant: (instance) => {
		let participant = { isSpectator: true };
		if (!engine.getUser()) return participant;
		for (let i = 0; i < instance.participants.length; i++) {
			if (instance.participants[i].owner.basic.id_in_app === engine.getUser()) participant = instance.participants[i];
		}
		return participant;
	},
}

export const Trivia = {
	all: (listener, data = {}) => call("GET", "trivia", setDefaults(data, { id_in_app: engine.getUser() }), listener),
	get: (id, listener, data = {}) => call("GET", `trivia/${id}`, setDefaults(data, { id_in_app: engine.getUser() }), listener),
	answer: (q_id, a_ids, listener, data = {}) => call("POST", `questions/${q_id}/players/${engine.getUser()}`, setDefaults(data, { answer_ids: a_ids }), listener),
	open_answer: (q_id, answer, listener, data = {}) => call("POST", `questions/${q_id}/players/${engine.getUser()}`, setDefaults(data, { open_answer: answer }), listener),
}

//params:
//all: by_categories:true, by_tags:true, page, per_page, filter:{categories: "a,a"}, exclude:{categories:"a,a"}
export const Immutables = {
	all: (listener, data) => call("GET", "immutable_objects", data, listener),
}

export const Load = Loading;
export default engine;

