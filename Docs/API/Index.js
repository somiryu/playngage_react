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
          <li><a href="#Rooms">Module: Rooms</a></li >
          <li><a href="#Trivia">Module: Trivia</a></li >
        </ul>
      </div>
      <div className="Section" id="Installation">
        <h3>Installation</h3>
        <p>To Install the project clone the git project as submodule.</p>
        <p>On your entry file</p>
        <code>import engine, {"{ SubModules }"} from "./playngage_react/Utils/api"</code>
        <code>import "./playngage_react/Styles/app_styles"</code>
        <p>Common init</p>
        <code>import engine, {"{config, Immutables, Players}"} from "../playngage_react/Utils/engine"</code>
      </div>
      <div className="Section" id="ApiToken">
        <h3>Set ApiToken</h3>
        <p>Get the API Token from your playngage app.</p>
        <p>On your entry file</p>
        <code>import {"{ config }"} from "./playngage_react/Utils/api"</code>
        <code>config.setToken(api_token, test_token*)</code>
        <p>api_token is the token of your app. test_token only for devs with engine access.</p>
      </div>
      <div className="Section" id="Common">
        <h3>Common Parameter</h3>
        <p>Agents that have the "filters" params can have this options.</p>
        <code>let params = {"{}"}<br />
          params.filter = {"{}"}<br />
          params.exclude = {"{}"}<br />
          params.lb = {"{}"}<br />
          params.from = $date(YYYY-MM-dd)<br />
          params.to = $date(YYYY-MM-dd)<br />
          params.page = $value<br />
          params.per_page = $value<br />
        </code>
        <h4>Within filter of exlude key you can add</h4>
        <code>
          {"{ids: [id,id]"}<br />
          {"{properties: {[$tag]: $value}}"}<br />
          {"{category: $tag}"}<br />
          {"{currencies: {[$tag]: {[$action]: $value}}"}<br />
          {"{levels: {[$currency_tag]: {[$action]: $value}}"}<br />
          {"{owner: $agent_id, owner_type: $agent_type}"}<br />
        </code>
        <p>Actions can be gt, lt, eq. GT is greater or equal than. LT is Lesser or equal than.</p>
        <h4>For leaderboard you can include:</h4>
        <p>Within the lb key you can add</p>
        <code>
          {"{[$currency_tag]: {[$action]: $value}}"}<br />
        </code>
        <p>Actions can be: "above_poistion", "below_position", "position", "above_percentage" or "below_pergentage"</p>
      </div>

      <div className="Section" id="language">
        <h3>useLanguage for translations</h3>
        <p>To use translations with the engine:</p>
        <ol>
          <li>Create a category with tag "translations", with fields "es" and "en"</li>
          <li>Create one immutable for each word, with a tag and translations in the correct fields (en or es).</li>
        </ol>
        <p>In react's code:</p>
        <code>
          import useLanguage from "../playngage_react/Utils/useLanguage"
        </code>
        <code>
          const [t, language, setLanguage, loading] = useLanguage()
        </code>
        <div>
          <ParamsTable data={[
            ["t", "func", "t(tag) to get translation"],
            ["language", "string", "Has the language tag"],
            ["setLanguage", "func", "Changes Language and stores cookie"],
            ["loading", "JSX", "Loading component or false"]
          ]} />
        </div>
      </div>

      <div className="Section" id="Immutables">
        <h3>Immutables</h3>
        <p>Import Immutables Submodule.</p>
        <div className="SubSection">
          <h4>Get All:</h4>
          <p>Call:</p>
          <code>Immutables.all(listener, data)</code>
          <code>data={"{by_categories:true, by_tags:true, page, per_page, filter:{categories: 'a,a'}, exclude:{categories:'a,a'}}"}</code>
          <h5>Example</h5>
          <code>useEffect(()={">"}
              Immutables.all(response ={">"} setData(response), {"{by_tags: true}"} ),[])
          </code>
        </div>
      </div>
    </div>
  )
}




