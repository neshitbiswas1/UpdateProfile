// Generates VCF contact string
export const generateVCF = (profile) => {
  return `
BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
ORG:${profile.company}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.linkedin || ""}
END:VCARD
  `.trim();
};
