const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes("error")){
      return(
        <div className='virhe'>
            {message}
        </div>
      )
    }
    else{
      return (
        <div className='ilmoitus'>
          {message}
        </div>
      )
    }
    
  }
  export default Notification