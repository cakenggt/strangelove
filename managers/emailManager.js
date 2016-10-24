var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.sendRegistrationEmail = function(email, options){

  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('test@example.com');
  var to_email = new helper.Email(email);
  var subject = 'Email Confirmation';
  var mail = new helper.Mail();
  mail.setFrom(new helper.Email("test@example.com", "Example User"));
  mail.setTemplateId("944d3b61-8bf1-4310-83e8-c56d1421d8f9");

  var personalization = new helper.Personalization();
  personalization.addTo(new helper.Email(email));
  personalization.addSubstitution(new helper.Substitution("-link-", options.link));
  mail.addPersonalization(personalization);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  return sg.API(request);

};
