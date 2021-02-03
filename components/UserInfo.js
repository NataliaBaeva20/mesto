import { nameInput, jobInput } from '../utils/constants.js';

export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      nameProfile: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    };
  }

  openUseInfo(infoProfile) {
    console.log(infoProfile);
    nameInput.value = infoProfile.nameProfile;
    jobInput.value = infoProfile.job;

  }

  setUserInfo(data) {
    console.log(this._nameSelector);
    console.log('это профиль');
    this._nameSelector.textContent = data.nameProfile;
    this._infoSelector.textContent = data.job;
  }
}
