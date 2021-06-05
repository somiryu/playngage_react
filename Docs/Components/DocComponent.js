import React from 'react'
import ParamsTable from "../ParamsTable"

export default function DocComponent({ component, name, ctype, properties }) {
  return (
    <div id="Docs">
      <div className="Section">
        <h4>{name}</h4>
        <code>import {name} from "../playngage_react/{ctype}/{name}</code>
        <div className="flex center">
          <div>{component}</div>
          <div className="comp">
            <ParamsTable data={properties} />
          </div>
        </div>
      </div>
    </div>
  )
}
