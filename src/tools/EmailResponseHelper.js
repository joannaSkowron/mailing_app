export const emailResponseQuotationHelper = (emailData) => {
  return {
    subject: emailData.title,
    subjectRE: `RE: ${emailData.title}`,
    subjectFWD: `FWD: ${emailData.title}`,
    address: emailData.from.address,
    addressTO: emailData.to.map(obj => obj.address).join(', '),
    addressCC: emailData.cc.map(obj => obj.address).join(', '),
    addressBCC: emailData.bcc.map(obj => obj.address).join(', '),
    content: emailData.content,
    contentQuotation:
      `<br><br>
              <hr>
              From: ${emailData.from.address}<br>
              CC: ${emailData.cc.map(obj => obj.address).join(', ')}<br>
              Received: ${new Date(emailData.date).toLocaleString()}<br><br>
              ${emailData.content}`,
  }
}


export const stateUpdateBasedOnResponseType = (responsetype, emailResponseQuotation) => {
  const { subject, subjectRE, subjectFWD, address, addressTO, addressCC, addressBCC, content, contentQuotation } = emailResponseQuotation;

  if (responsetype === 'reply') {
    return {
      address,
      subject: subjectRE,
      content: contentQuotation,
    }
  } else if (responsetype === 'replyall') {
    return {
      address,
      addressCC: addressTO + ', ' + addressCC,
      subject: subjectRE,
      content: contentQuotation,
    }
  } else if (responsetype === 'forward') {
    return {
      subject: subjectFWD,
      content: contentQuotation,
    }
  } else if (responsetype === 'edit') {
    return {
      address: addressTO,
      addressCC,
      addressBCC,
      subject,
      content: content,
    }
  }
}