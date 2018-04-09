import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessages = () => {
  const messages = Flash.getMessages(); //get all messages
  Flash.clearMessages();
  return(
    <div className="container">
      {messages && Object.keys(messages).map((type, i) => //check there are messages then map over each message key and create a notification div for each.
        <div key={i} className={`notification is-${type}`}>{messages[type]}</div>//creates notification of type (type) and displays the message (value)
      )}
    </div>
  );
};

export default FlashMessages;
