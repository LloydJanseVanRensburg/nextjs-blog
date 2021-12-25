import { useState, useEffect, useRef } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
}

function ContactForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setErrorMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    setRequestStatus('pending');

    try {
      await sendContactData({
        email,
        name,
        message,
      });

      setRequestStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setRequestStatus('error');
    }

    emailRef.current.value = '';
    nameRef.current.value = '';
    messageRef.current.value = '';
  };

  let notificationData;

  if (requestStatus === 'pending') {
    notificationData = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notificationData = {
      status: 'success',
      title: 'Success!',
      message: 'Your message is sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notificationData = {
      status: 'error',
      title: 'Error!',
      message: errorMessage,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>

      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="message" rows="5" required></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {notificationData && (
        <Notification
          status={notificationData.stauts}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
