'use client'
import React, {useRef} from 'react'
import Contacts from './Contacts'

const ContactsWrapper: React.FC = () => {
    const contactsRef = useRef<HTMLDivElement>(null)
    return (
        <div ref={contactsRef}>
            <Contacts ref={contactsRef} />
        </div>
    )
}

export default ContactsWrapper
