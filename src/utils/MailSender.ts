import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

export const sendEmail = async (
  fromEmail: String,
  fromName: String,
  toEmail: String,
  toName: String,
  subject: String,
  emailTemplate: String,
  emailParams: Map<String, String>
) => {
  const request = prepareEmail(
    fromEmail,
    fromName,
    toEmail,
    toName,
    subject,
    emailTemplate,
    emailParams
  );
  const res = await mailjet.post("send", { version: "v3.1" }).request(request);

  return res;
};

const prepareEmail = (
  fromEmail: String,
  fromName: String,
  toEmail: String,
  toName: String,
  subject: String,
  emailTemplate: String,
  emailParams: Map<String, String>
) => {
  return {
    Messages: [
      {
        From: {
          Email: fromEmail,
          Name: fromName,
        },
        To: [
          {
            Email: toEmail,
            Name: toName,
          },
        ],
        Subject: subject,
        TextPart: "",
        HTMLPart: prepareHtmlTemplate(emailTemplate, emailParams),
      },
    ],
  };
};

const prepareHtmlTemplate = (emailTemplate: String, emailParams: Map<String, String>) => {
  let preparedTemplate = emailTemplate;

  // Replace placeholders in the template with values from emailParams
  emailParams.forEach((value, key) => {
    const regex = new RegExp("{{" + key + "}}", "g");
    preparedTemplate = preparedTemplate.replace(regex, value.toString());
  });

  return preparedTemplate;
};
