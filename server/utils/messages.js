const generateMessage = (message) => {
  return {
    from: message.from,
    text: message.text,
    date: new Date().getTime()
  }
}

module.exports = {
  generateMessage
}
