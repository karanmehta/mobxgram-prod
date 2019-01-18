import React from "react"
import { observer, inject } from "mobx-react"
import { Switch, Route, withRouter, Link } from "react-router-dom"

import MobxgramList from "../components/mobxgramList"
import PhotoDetails from "../components/photoDetails"
import AddPhoto from "../components/addPhoto"

class App extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {
    this.props.mobxgramStore.getStore()
  }

  render() {
    const { mobxgramStore } = this.props
    return(
      <div>
      <Link to="/"><h1 className="text-center">Mobxgrame</h1></Link>
      {
        mobxgramStore.mobxgramList.length
        ?
        <Switch>
          <Route path="/add-photo" component={AddPhoto} />
          <Route exact path="/" component={MobxgramList} />
          <Route exact path="/:imageName" component={PhotoDetails} />
        </Switch>
        :
        null
      }
      </div>
    )
  }
}

export default inject("mobxgramStore")(withRouter(observer(App)))
