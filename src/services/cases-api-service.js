import TokenService from './token-service'
import config from '../config'

const CasesApiService = {
  getCases() {
    return fetch(`${config.API_ENDPOINT}/cases`, {
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
  postCase(notes, contacts) {
    return fetch(`${config.API_ENDPOINT}/cases`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        case_notes: notes,
        contacts: contacts
      })
    })
      .then(res =>
        (!res.ok)
        ? res.json.then(e => Promise.reject(e))  
        : res.json()
      )
  },
}

export default CasesApiService