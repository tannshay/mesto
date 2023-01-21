export default class UserInfo {
    constructor({nameSelector, aboutSelector}){
      this._name = document.querySelector(nameSelector)
      this._about = document.querySelector(aboutSelector)
    }
  
    getUserInfo(){
      return {
        name: this._name.textContent,
        about: this._about.textContent
      }
    }

    setUserInfo(inputName, inputAbout){
      this._name.textContent = inputName
      this._about.textContent = inputAbout
    }
  }