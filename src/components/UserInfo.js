export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);

    this._nameInput = document.querySelector('.form__input_value_name');
    this._jobInput = document.querySelector('.form__input_value_job');
  }

  getUserInfo() {
    return {
      nameProfile: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    };
  }

  openUseInfo(infoProfile) {
    this._nameInput.value = infoProfile.nameProfile;
    this._jobInput.value = infoProfile.job;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.nameProfile;
    this._infoSelector.textContent = data.job;
  }
  setAvatarUser(data) {
    this._avatarSelector.src = data.avatar;
  }
}
