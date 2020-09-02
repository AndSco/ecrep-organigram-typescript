export const officePhoneBase = "+35623425";

interface iTextLink {
  link: string;
  text: string;
}

interface iContactDetails {
  address: string;
  phone: iTextLink;
  email: iTextLink;
  twitter: iTextLink;
  facebook: iTextLink;
  instagram: iTextLink;
  website: iTextLink;
}

export const contactDetails: iContactDetails = {
  address: "Europe House, 254 St Paul’s Str, Valletta",
  phone: {
    link: "tel:+35623425100",
    text: "+356 2342 5100"
  },

  email: {
    link: "mailto:comm-rep-mt@ec.europa.eu",
    text: "comm-rep-mt@ec.europa.eu"
  },
  twitter: {
    link: "https://twitter.com/ECRepMalta",
    text: "@ECRepMalta"
  },
  facebook: {
    link: "https://www.facebook.com/KummissjoniEwropea",
    text: "KummissjoniEwropea"
  },
  instagram: {
    link: "https://www.instagram.com/euinmalta/",
    text: "EUinMalta"
  },
  website: {
    link: "https://ec.europa.eu/malta/",
    text: "ec.europa.eu/malta"
  }
};
