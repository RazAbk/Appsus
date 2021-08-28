import { eventBusService } from '../services/event-bus-service.js'

export class UserMsg extends React.Component {

  state = {
    msg: null
  }
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.onCloseMsg, msg.time)
      })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }

  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }

  // Answer to go back to the emailCompose component 
  userAnswer = (answer) => {
    eventBusService.emit('user-answer', answer);
    this.onCloseMsg();
  }

  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    if (msg.type === 'confirm') return (
      <React.Fragment>
        <section className={`user-msg confirm`}>
          <button className="user-msg-exit-btn" onClick={() => { this.onCloseMsg; this.userAnswer('no') }}>X</button>
          <h1>{msg.txt}</h1>
          <div className="confirm-buttons">
            <button onClick={() => { this.userAnswer('yes') }}>Yes</button>
            <button onClick={() => { this.userAnswer('no') }}>No</button>
          </div>
        </section>
        <div className="user-msg-screen"></div>
      </React.Fragment>
    )
    if (msg.type === 'message') return (
      <React.Fragment>
        <section className={`user-msg message`}>
          <button className="user-msg-exit-btn" onClick={this.onCloseMsg}>X</button>
          <h1>{msg.txt}</h1>
        </section>
        <div className="user-msg-screen"></div>
      </React.Fragment>

    )
    if (msg.type === 'duplicate' || 'pined' ||'delete') return (
      <React.Fragment>
        <section className={`user-msg message`}>
          <button className="user-msg-exit-btn" onClick={this.onCloseMsg}>X</button>
          <h1>{msg.txt}</h1>
        </section>
        <div className="user-msg-screen"></div>
      </React.Fragment>
    )
  }
}
