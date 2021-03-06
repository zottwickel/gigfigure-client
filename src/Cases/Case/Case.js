import React from 'react';
import CasesContext from '../../contexts/CasesContext';
import formatDate from '../../services/format-date';
import CasesApiService from '../../services/cases-api-service';
import './Case.css';
/**
 * This component will display a single case.
 */
class Case extends React.Component {

  static contextType = CasesContext;

  componentDidMount() {
    this.context.clearError();
    if (this.context.isLoggedIn) {
      CasesApiService.getCases()
        .then(this.context.setCases)
        .catch(this.context.setError);
    }
  }

  render() {
    const thisCase = this.context.cases.filter(el => el.case_id.toString() === this.props.match.params.case_id)[0];
    return(
      <div className='ca_box'>
        {(this.context.cases.length > 0) ? <>
        <div className='ca_item'>
          <h3 className='c_header'>{`Case ${thisCase.case_id}`}</h3>
          <h4 className='ca_subheading'>Notes</h4>
          <p>{thisCase.case_notes}</p>
          <h4 className='ca_subheading'>Date</h4>
          <p>{formatDate(thisCase.date)}</p>
          <h4 className='ca_subheading'>Contacts</h4>
          <ul className='ca_co_list'>
            {thisCase.contacts.map(contact => {
              return (
                <li key={contact.contact_id} className='ca_co_item'>
                  <h5 className='ca_subheading'>Name</h5>
                  <p>{contact.name}</p>
                  <h6 className='ca_subheading'>Phone</h6>
                  <p>{contact.phone}</p>
                  <h6 className='ca_subheading'>Email</h6>
                  <p>{contact.email}</p>
                </li>
              );
            })}
          </ul>
        </div>
        </>: null }
      </div>
    );
  };
};

export default Case;