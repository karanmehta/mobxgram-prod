import React from "react"
import { observer, inject } from "mobx-react"
import { extendObservable, action } from "mobx"

class addPhoto extends React.Component {
  constructor() {
    super()
    this.addPhotoLocalState = extendObservable(
      this, {
        name: "",
        changeName: action((e) => {
          this.name = e.target.value
        }),
        imagelinks: "",
        changeImagelinks: action((e) => {
          this.imagelinks = e.target.value
        }),
        resetForm: action(() => {
          this.name = ""
          this.imagelinks = ""
        }),
      })
  }

  addPhotoToStore = (e) => {
    e.preventDefault()
    const { name, imagelinks, resetForm } = this.addPhotoLocalState
    const { history } = this.props

    if (name!="" && imagelinks!="") {
      this.props.mobxgramStore.addPhoto({
        name,
        comments:[],
        imagelinks,
        likes:0
      }).then((response) => {
        history.push("/")
      }).catch((e)=>{
        console.log(e)
      })
      resetForm()
    }
  }

  render() {
    const { name, changeName, imagelinks, changeImagelinks } = this.addPhotoLocalState
    return(
      <section className="container">
        <section className="col-md-6 col-md-offset-3">
          <form onSubmit={this.addPhotoToStore}>
          <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input id="name" type="text" className="form-control" placeholder="Name" ref="name" value={name} onChange={changeName} />
          </div>
          <div className="form-group">
          <label htmlFor="imagelinks">Photo Link :</label>
          <input id="imagelinks" type="text" className="form-control" placeholder="Photo link" ref="link" value={imagelinks} onChange={changeImagelinks} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Add comment</button>
          </div>
          </form>
        </section>
      </section>
    )
  }
}

export default inject("mobxgramStore")(observer(addPhoto))
