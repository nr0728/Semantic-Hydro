import React from 'react';
import { Message } from 'semantic-ui-react';
import Notification from '../notification';

export default class SemanticNotification extends Notification {
  render() {
    const { type, message } = this.props;
    
    const messageProps = {
      info: { info: true },
      success: { positive: true },
      warn: { warning: true },
      error: { negative: true },
    }[type] || { info: true };

    return (
      <Message {...messageProps}>
        <Message.Header>{message}</Message.Header>
      </Message>
    );
  }
}
