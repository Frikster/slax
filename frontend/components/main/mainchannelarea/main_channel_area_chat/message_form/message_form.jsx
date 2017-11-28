import React from 'react';
import { withRouter } from 'react-router-dom';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {body: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = this.state.body;
    this.setState({body: ""});
    this.props.createMessage({body: body, channel_id: this.props.match.params.channelId, user_id: this.props.currentUser.id }).then(() => document.getElementById('message-list').lastChild.scrollIntoView(false));
  }

  update(property) {
    return (e) => this.setState({ [property]: e.target.value });
  }

  render() {
    let placeholder;

    if(this.props.channel.is_dm) {
      if(this.props.channel.users.length === 2) {
        placeholder = `Message @${this.props.channel.users.filter(user => user.username !== this.props.currentUser.username)[0].username}`;
      } else {
        placeholder = `Message ${this.props.channel.users.filter(user => user.username !== this.props.currentUser.username).map(user => user.username).join(', ')}`;
      }
    } else if(this.props.channel.is_dm === false) {
      placeholder = `Message #${this.props.channel.name}`;
    } else {
      placeholder = '';
    }
    return (
      <section className='message-form'>
        <form className='message-form-actual' onSubmit={this.handleSubmit}>
          <input autocomplete="off" id='message-form-input' ref={i => i && i.focus()} type='text' value={this.state.body} placeholder={placeholder} onChange={this.update('body')}></input>

        </form>

      </section>
    );
  }

}

export default withRouter(MessageForm);
