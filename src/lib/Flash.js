class Flash {

  _messages = null;

  //set message type and actual message
  static setMessage(type, message) { //type becomes the key, message becomes the value
    this._messages = this.messages || {}; //if messages is still null then we set it as an empty object otherwise we can't use it
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }
}

export default Flash;

//statics create only one instance of the funtion, they are a class method.
