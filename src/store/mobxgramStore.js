import { extendObservable, action } from "mobx"
import axios from "axios"
import sampleStore from "./sampleStore"

// const ROOTURL = "http://localhost:7777/photolists"

const { protocol, hostname } = window.location
let ROOTURL = `${protocol}//${hostname}:7777/photolists`
console.log(ROOTURL)
class Mobxgram {
  constructor() {
    extendObservable(
      this,
      {
        mobxgramList: [],
        getStore: action(() => {
          this.mobxgramList.replace(sampleStore)
          axios.get(ROOTURL).then((response) => {
            this.mobxgramList.replace(response.data)
          }).catch((e) => {
            console.log("Could not connect to db. ",e)
          })
        }),
        addPhoto: action((newPhoto) => {
          this.mobxgramList = this.mobxgramList.concat(newPhoto)
          return axios.post(ROOTURL,newPhoto)
        }),
        incrementLikes: action((index) => {
          let selectedListItem = this.mobxgramList[index]
          let newValue = {
            ...selectedListItem,
            likes:selectedListItem.likes + 1,
          }
          this.mobxgramList = [
            ...this.mobxgramList.slice(0,index),
            newValue,
            ...this.mobxgramList.slice(index+1),
          ]
          axios.put(ROOTURL + "/" + newValue.id, newValue)
        }),
        addComment: action(({index,author,text}) => {
          let mobxgramList = this.mobxgramList.slice()
          let selectedListItem = mobxgramList[index]
          selectedListItem.comments = [
            ...selectedListItem.comments,
            {
              author,
              text
            }
          ]
          this.mobxgramList.replace(mobxgramList)
          axios.put(ROOTURL + "/" + index, selectedListItem)
        })
      }
    )
  }
}

export default new Mobxgram()
