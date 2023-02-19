import ContactForm from "../components/contact/contact-form";
import Head from "next/head";
import { NotificationContextProvier } from "../store/NotficationProvider";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Sent me your messages" />
      </Head>
      <NotificationContextProvier>
        <ContactForm />
      </NotificationContextProvier>
    </>
  );
}
