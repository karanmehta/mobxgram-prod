import React from "react"
import { observer, inject } from "mobx-react"
import PhotoItem from "./photoItem"
import { NavLink } from "react-router-dom"

class MobxgramList extends React.Component {
  render() {
    const { mobxgramStore } = this.props
    return(
      <section className="row">
        <section className="col-md-10">
        <section>
          <NavLink className="btn btn-default" to="/add-photo">Add Photo</NavLink>
        </section>
        <section>
        {
          mobxgramStore.mobxgramList.map((mobxgramStoreItem,i) => {
            return <PhotoItem
            key={i}
            mobxgramStoreItem={mobxgramStoreItem}
            incrementLikes={mobxgramStore.incrementLikes}
            index={i}
            />
          })
        }
        </section>
        </section>
      </section>
    )
  }
}

export default inject("mobxgramStore")(observer(MobxgramList));
