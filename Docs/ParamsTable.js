import React from "react"

const ParamsTable = ({ data }) => <table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Value</th>
      <th>Explanaition</th>
    </tr>
  </thead>
  <tbody>
    {data.map(e => <tr key={"param" + e[2]}><td>{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td></tr>)}
  </tbody>
</table>

export default ParamsTable