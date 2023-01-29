export default class UserInfo {
    constructor({nameSelector, aboutSelector,avatarSelector}){
      this._name = document.querySelector(nameSelector)
      this._about = document.querySelector(aboutSelector)
      this._avatar = document.querySelector(avatarSelector)
    }
  
    getUserInfo(){
      return {
        name: this._name.textContent,
        about: this._about.textContent
      }
    }

    setUserInfo(data){
      if(data.avatar){
        this._avatar.src = data.avatar
      }
      this._name.textContent = data.name
      this._about.textContent = data.about
      this._userId = data.id
    }

    getUserId(){
      return this._userId
    }

    setAvatar(avatarLink){
      this._avatar.src = avatarLink
    }
  }