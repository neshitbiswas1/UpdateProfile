export const generateVCF = ({ name, email, phone, company, title }) => {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:${name};;;;`, // Proper 'N' field (LastName;FirstName;MiddleName;Prefix;Suffix)
    `ORG:${company}`,
    `TITLE:${title}`,
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    "END:VCARD"
  ];
  return lines.join("\r\n"); // Use CRLF for proper compatibility
};
