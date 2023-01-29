export default class Api {
    constructor(options){
      this._url = options.url
      this._headers = options.headers
    }
  
    getUserInfo(){
      return fetch(`${this._url}/users/me`,{
        headers: this._headers
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    setUserInfo({newName, newAbout}){
      return fetch(`${this._url}/users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      }).then((res) =>{
        if (res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    getInitialCards(){
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      }).then((res) =>{
        if (res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    postCard({newName,newLink}){
      return fetch(`${this._url}/cards`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: newName,
          link: newLink
        })
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }

    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`,{
        method: 'DELETE',
        headers: this._headers
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    deleteLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: this._headers
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    putLike(cardId, userId){
      return fetch(`${this._url}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({
          _id: userId
        })
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  
    changeAvatar(avaLink){
      return fetch(`${this._url}/users/me/avatar`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avaLink.avaLink
        })
      }).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  }