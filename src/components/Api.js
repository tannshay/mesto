export default class Api {
    constructor(options){
      this._url = options.url
      this._headers = options.headers
    }

    _checkResponse(res) {
      if(res.ok){
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    getUserInfo(){
      return fetch(`${this._url}/users/me`,{
        headers: this._headers
      }).then(this._checkResponse)
    }
  
    setUserInfo({newName, newAbout}){
      return fetch(`${this._url}/users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      }).then(this._checkResponse)
    }
  
    getInitialCards(){
      return fetch(`${this._url}/cards`,{
        headers: this._headers
      }).then(this._checkResponse)
    }
  
    postCard({newName,newLink}){
      return fetch(`${this._url}/cards`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: newName,
          link: newLink
        })
      }).then(this._checkResponse)
    }

    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`,{
        method: 'DELETE',
        headers: this._headers
      }).then(this._checkResponse)
    }
  
    deleteLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`,{
        method: 'DELETE',
        headers: this._headers
      }).then(this._checkResponse)
    }
  
    putLike(cardId, userId){
      return fetch(`${this._url}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({
          _id: userId
        })
      }).then(this._checkResponse)
    }

    changeAvatar(avaLink){
      return fetch(`${this._url}/users/me/avatar`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avaLink.avaLink
        })
      }).then(this._checkResponse)
    }
  }