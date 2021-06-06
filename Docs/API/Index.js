import React from 'react'
import ParamsTable from "../ParamsTable"



export default function Index({ back }) {
  return (
    <div id="Docs">
      <h3>Welcome to the Playngage React Library API Documentatio</h3>
      <div className="App-link" onClick={back}>Back</div>
      <div className="TableContents">
        <ul>
          <li><a href="#Installation">Installation</a></li>
          <li><a href="#ApiToken">Set API Token</a></li>
          <li><a href="#Common">Common Parameter</a></li>
          <li><a href="#language">Module: useLanguage</a></li>
          <li><a href="#engine">Module: engine</a></li>
          <li><a href="#Players">Module: Players</a></li>
          <li><a href="#Agents">Module: Agents</a></li >
          <li><a href="#Immutables">Module: Immutables</a></li >
          <li><a href="#Items">Module: Items</a></li >
          <li><a href="#Decks">Module: Decks</a></li >
          <li><a href="#Rooms">Module: Rooms</a></li >
          <li><a href="#Trivia">Module: Trivia</a></li >
        </ul>
      </div>
      <div className="Section" id="Installation">
        <h3>Installation</h3>
        <p>To Install the project clone the git project as submodule.</p>
        <p>On your entry file</p>
        <Code onClick={copy}>import engine, {"{ SubModules }"} from "./playngage_react/Utils/api"</Code>
        <Code>import "./playngage_react/Styles/app_styles"</Code>
        <p>Common init</p>
        <Code>import engine, {"{config, Immutables, Players}"} from "../playngage_react/Utils/engine"</Code>
      </div>
      <div className="Section" id="ApiToken">
        <h3>Set ApiToken</h3>
        <p>Get the API Token from your playngage app.</p>
        <p>On your entry file</p>
        <Code>import {"{ config }"} from "./playngage_react/Utils/api"</Code>
        <Code>config.setToken(api_token, test_token*)</Code>
        <p>api_token is the token of your app. test_token only for devs with engine access.</p>
      </div>
      <div className="Section" id="Common">
        <h3>Common Parameter</h3>
        <p>Agents that have the "filters" params can have this options.</p>
        <Code>let params = {"{}"}<br />
          params.filter = {"{}"}<br />
          params.exclude = {"{}"}<br />
          params.lb = {"{}"}<br />
          params.from = $date(YYYY-MM-dd)<br />
          params.to = $date(YYYY-MM-dd)<br />
          params.page = $value<br />
          params.per_page = $value<br />
        </Code>
        <h4>Within filter of exlude key you can add</h4>
        <Code>
          {"{ids: [id,id]"}<br />
          {"{properties: {[$tag]: $value}}"}<br />
          {"{category: $tag}"}<br />
          {"{currencies: {[$tag]: {[$action]: $value}}"}<br />
          {"{levels: {[$currency_tag]: {[$action]: $value}}"}<br />
          {"{owner: $agent_id, owner_type: $agent_type}"}<br />
        </Code>
        <p>Actions can be gt, lt, eq. GT is greater or equal than. LT is Lesser or equal than.</p>
        <h4>For leaderboard you can include:</h4>
        <p>Within the lb key you can add</p>
        <Code>
          {"{[$currency_tag]: {[$action]: $value}}"}<br />
        </Code>
        <p>Actions can be: "above_poistion", "below_position", "position", "above_percentage" or "below_pergentage"</p>
      </div>

      <div className="Section" id="language">
        <h3>useLanguage for translations</h3>
        <p>To use translations with the engine:</p>
        <ol>
          <li>Create a category with tag "translations", with fields "es" and "en"</li>
          <li>Create one immutable for each word, with a tag and translations in the correct fields (en or es).</li>
        </ol>
        <p>In react's Code:</p>
        <Code>import useLanguage from "../playngage_react/Utils/useLanguage"</Code>
        <Code>const [t, language, setLanguage, loading] = useLanguage()</Code>
        <div>
          <ParamsTable data={[
            ["t", "func", "t(tag) to get translation"],
            ["language", "string", "Has the language tag"],
            ["setLanguage", "func", "Changes Language and stores cookie"],
            ["loading", "JSX", "Loading component or false"]
          ]} />
        </div>
      </div>


      <Section name="Players">
        <SubSection service="Get Player" call={"Players.get(id_in_app, listener, params)"}
          params={[
            ["include", "Arr", "Array with basic, agent, advanced, quests, items, tutorials. Defaults to basic,agent,quests"],
            ["filter:{tutorials: $value}", "Arr", "Array of filters"],
          ]}
        />
        <SubSection service="Create" call="Players.create(id_in_app, data = {}, listener)"
          params={[
            ["id_in_app", "String", "Key"],
            ["setup", "String", "Defaults to player setup"],
            ["email", "String", "Field"],
            ["name", "String", "Field"],
            ["description", "String", "Field"],
            ["city", "String", "Field"],
            ["country", "String", "Field"],
            ["properties:{[$tag]: $value}", "String", "Set a value"],
            ["team:{['id' or 'tag']: $value}", "Id", "Join a team"],
            ["stories", "Arr", "Give stories to the player"],

          ]}
        />
        <SubSection service="Get or Create" call="Players.get_or_create(id_in_app, listener, data={})"
          params={[["See above", "", "Same as get and create"]]}
        />
        <SubSection service="Update Player" call="Players.update(listener, data)"
          params={[
            ["id_in_app?", "N/A", "Gets logged player by cookie"],
            ["field", "value", "A player field with a new value"],
            ["new_id_in_app", "String", "Changes id_in_app"]
          ]}
        />
      </Section>

      <Section name="Immutables">
        <SubSection service="Get All" call="Immutables.all(listener, params)"
          params={[
            ["by_categories", "Bool", "Keys with category tags"],
            ["by_tags", "Bool", "Entries with obj tag"],
            ["page", "Int", "Page"],
            ["per_page", "Int", "Per page"],
            ["filter:{categories: $value}", "Arr of tags", "Filter by categories"],
            ["exclude:{categories: $value}", "Arr of tags", "Exclude categories"],
          ]}
        />
      </Section>


      <Section name="Decks">
        <SubSection service="Get All" call="Decks.all(agent, listener, params)"
          params={[
            ["includes", "Arr", "Can be discarded, in_deck"],
          ]}
        />
        <SubSection service="Get By Tag" call="Decks.get(agent, tag, listener, params)"
          params={[
            ["includes", "Arr", "Can be discarded, in_deck"],
          ]}
        />
        <SubSection service="Update" call="Decks.update(tag, action, listener, data = {}, id_in_app*)"
          params={[
            ["action", "draw | discard", "To draw or dicards cards"],
            ["qty", "Int", "Quanity to draw or discard. Defaults to 1"],
            ["category", "tag", "Draws or discards from this category"],
            ["includes", "Arr", "Can be discarded, in_deck"],
          ]}
        />
      </Section>


    </div>
  )
}




const Section = ({ name, children }) =>
  <div className="Section" id={name}>
    <h3>{name}</h3>
    <p>Import {name} SubModule</p>
    {children}
  </div>

const SubSection = ({ service, call, params }) =>
  <div className="SubSection">
    <h4>{service}</h4>
    <a href="#Docs" style={{ color: "rgb(54 202 87)" }}>To Top</a>
    <p>Call:</p>
    <Code>{call}</Code>
    <ParamsTable data={params} />
  </div>


const Code = ({ children }) => <code style={{ cursor: "pointer" }} onClick={copy}>{children}</code>




const copy = (e) => {
  e = e.target
  if (e.innerHTML === "COPIED!") return;
  console.log(e, e[0])
  var old = e.innerHTML
  var sel = window.getSelection();;
  if (window.getSelection && document.createRange) { //Browser compatibility
    setTimeout(function () {
      let range = document.createRange(); //range object
      range.selectNodeContents(e); //sets Range
      sel.removeAllRanges(); //remove all ranges from selection
      sel.addRange(range); //add Range to a Selection.
      document.execCommand("copy");
      e.innerHTML = "COPIED!"
      setTimeout(() => { e.innerHTML = old }, 1000);
    }, 1);
  }
}