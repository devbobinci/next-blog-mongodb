import { useContext, useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import NotificationContext from "../../store/NotficationProvider";

// ! Wersja bez useContext !!!!!!

// async function sendContactData(contactDetail) {
//   const response = fetch("/api/contact", {
//     method: "POST",
//     body: JSON.stringify(contactDetail),
//     header: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }
// }

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); //pending/success/error // !bez useContext !!!!!!
  const [requestError, setRequestError] = useState(); // !bez useContext !!!!!!

  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  // ! Wersja bez useContext!!!!!!

  // useEffect(() => {
  //   if (requestStatus === "success" || requestStatus === "error") {
  //     const timer = setTimeout(() => {
  //       setRequestStatus(null);
  //       setRequestError(null);
  //     }, 3000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // });

  //? Aby uzyc opcji bez use kontext musze zmienic funckje na async
  function sendMessageHandler(e) {
    e.preventDefault();

    // ! Wersja bez useContext!!!!!!

    // setRequestStatus('pending');

    // try{
    //   await sendContactData({
    //     email: enteredEmail,
    //     name: enteredName,
    //     message: enteredMessage,
    //   })
    //   setRequestStatus("success");
    // }catch(error){
    // setRequestError(error.message)
    //   setRequestStatus("error");

    // }

    // let notification;

    // if (requestStatus === "pending") {
    //   notification = {
    //     status: 'pending',
    //     title: 'Sending a message...',
    //     message: 'Your message is on its way',
    //   };
    // }else if (requestStatus === "success") {
    //   notification = {
    //     status: 'success',
    //     title: 'Success!',
    //     message: 'Message sent successfully',
    //   };
    // }else if (requestStatus === "error") {
    //   notification = {
    //     status: 'error',
    //     title: 'Error!',
    //     message: requestError,
    //   };
    // }

    notificationCtx.showNotification({
      title: "Adding...",
      message: "Adding new commnet",
      status: "pending",
    });

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "Sent your message!",
          message: "Storing your message in database",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Something went wrong",
          message: error.message || "You screwed up",
          status: "error",
        });
      });

    setEnteredEmail("");
    setEnteredName("");
    setEnteredMessage("");
  }

  return (
    <>
      <section className={classes.contact}>
        <h2>How can I help you</h2>
        <form className={classes.form} onSubmit={sendMessageHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={(e) => {
                  setEnteredEmail(e.target.value);
                }}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={(e) => {
                  setEnteredName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows="5"
              required
              value={enteredMessage}
              onChange={(e) => {
                setEnteredMessage(e.target.value);
              }}
            ></textarea>
          </div>

          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>
      {/* Wersja bez useContext, zamineic activeNotification na notification */}
      {activeNotification && (
        <Notification
          status={activeNotification.status}
          title={activeNotification.title}
          message={activeNotification.message}
        />
      )}
    </>
  );
}
