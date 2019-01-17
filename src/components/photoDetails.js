import React from "react"
import { observer, inject } from "mobx-react"
import PhotoItem from "./photoItem"

class PhotoDetails extends React.Component {
  constructor(props) {
    super(props)
    let Id = this.props.match.params.imageName.split("-").pop()
    this.PhotoIndex = this.props.mobxgramStore.mobxgramList.findIndex((mobxgramListItem)=>{
      return parseInt(mobxgramListItem.id,10) === parseInt(Id,10)
    })
  }
  render() {
    const { mobxgramStore } = this.props
    return(
      <section className="row">
        <section className="col-md-8 col-md-offset-2">
          <div className="row">
            <PhotoItem
            mobxgramStoreItem={mobxgramStore.mobxgramList[this.PhotoIndex]}
            incrementLikes={mobxgramStore.incrementLikes}
            index={this.PhotoIndex}
            />
            <div className="col-md-8">
              <br/>
              <ul>
              {
                mobxgramStore.mobxgramList[this.PhotoIndex].comments.map((commentsItem,i) => {
                  return <li key={i}><a href="#">{commentsItem.author}</a>: {commentsItem.text}</li>
                })
              }
              </ul>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (this.refs.name.value != "" && this.refs.comment.value != "") {
                  mobxgramStore.addComment({
                    index: this.PhotoIndex,
                    author: this.refs.name.value,
                    text: this.refs.comment.value
                  })
                  this.refs.name.value = ""
                  this.refs.comment.value = ""
                }
              }}>
              <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input id="name" type="text" className="form-control" placeholder="Name" ref="name" />
              </div>
              <div className="form-group">
              <label htmlFor="comments">Add comment :</label>
              <input id="comments" type="text" className="form-control" placeholder="Add comment" ref="comment" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" type="submit">Add comment</button>
              </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default inject("mobxgramStore")(observer(PhotoDetails))
