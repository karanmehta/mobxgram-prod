import React from "react"
import { observer } from "mobx-react"
import { NavLink } from "react-router-dom"

class PhotoItem extends React.Component {
  render() {
    const { mobxgramStoreItem, incrementLikes, index } = this.props
    return(
      <div className="col-md-4">
        <div className="panel panel-default">
          <img src={mobxgramStoreItem.imagelinks} alt="" className="img-thumbnail img-responsive" />
          <div className="panel-body text-center">
            <h3>{mobxgramStoreItem.name}</h3>
          </div>
          <footer className="clearfix panel-footer">
            <NavLink className="col-sm-6 text-center" to={`/${mobxgramStoreItem.name}-${mobxgramStoreItem.id}`}>
              <i className="fa fa-comments"></i> <span>{mobxgramStoreItem.comments.length}</span>
            </NavLink>
          <div className="col-sm-6 text-center" onClick={()=>incrementLikes(index)}>
              <i className="fa fa-thumbs-up"></i> <span>{mobxgramStoreItem.likes}</span>
          </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default observer(PhotoItem);
