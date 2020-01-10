class ContactForm extends React.Component {
   handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
      method: "POST",
      url: "/send",
      data: {
	email: email,
	message:message
      }
    }).then((response) => {
      if ( response.data.msg === 'success' ){
	this.displayFeedback(true);
	this.resetForm()
      } else if ( response.data.msg === 'fail' ){
	this.displayFeedback(false);
	console.log('Message failed to send.')
      }
    })
  };

  displayFeedback = (value) => {
    let feedbackWrapper = document.getElementById('form-feedback');
    let feedback = '';

    if (value) {
      feedback = 'Thank you for your message!';
      feedbackWrapper.classList.add('form-success');
    } else {
      feedback = 'Oops! Looks like something went wrong. Please try again later.';
      feedbackWrapper.classList.add('form-error');
    }

    feedbackWrapper.innerHTML = feedback;
  }

  resetForm = () => document.getElementById( 'contact-form' ).reset();

  render(){
    return (
      <form id="contact-form" onSubmit={ this.handleSubmit } method="POST">
	<div id="form-feedback"></div>
	<div className="input-field">
	  <i className="material-icons prefix">email</i>
	  <input type="email" id="email" required />
	  <label htmlFor="email">Your Email</label>
	</div>
	<div className="input-field">
	  <i className="material-icons prefix">message</i>
	  <textarea name="message" id="message" 
		    className="materialize-textarea" required></textarea>
	  <label htmlFor="message">Your message</label>
	</div>              
	<div className="input-field center">
	  <button className="btn">Submit</button>
	</div>
      </form>
    )
  }
}

ReactDOM.render(<ContactForm />,
		document.getElementById('contact-root'));
