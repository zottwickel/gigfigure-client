import TokenService from './token-service'
import config from '../config'

const ContactsApiService = {
  getContacts() {
    return fetch(`${config.API_ENDPOINT}/contacts`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
        ? res.json.then(e => Promise.reject(e))  
        : res.json()
      )
  },
  postContact(name, type, subtype, phone, email, notes) {
    return fetch(`${config.API_ENDPOINT}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        type: type,
        subtype: subtype,
        phone: phone,
        email: email,
        notes: notes,
      })
    })
      .then(res => 
        (!res.ok)
        ? res.json.then(e => Promise.reject(e))  
        : res.json()
      )
  },
}

export default ContactsApiService