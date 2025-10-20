import type { Contact } from "@shared/types";

interface ContactDisplayProps {
  contacts: Contact[];
  username: string;
}

const ContactDisplay = ({ contacts }: ContactDisplayProps) => {
  return (
    <div>
        <h2>Your Contacts</h2>
        {contacts.map((contact: Contact) => (
          <div key={contact.name}>
            {contact.name} {contact.number}
          </div>
        ))}
    </div>
  )
}

export default ContactDisplay;