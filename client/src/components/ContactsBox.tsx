import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.jpg";
import { PrintModeContext } from "../contexts/printMode/PrintModeContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { contactDetails } from "../constants/contacts";
import { breakpoints } from "../constants/breakpoints";
import { teamColors, borderYellow } from "../constants/colors";

const ContactsBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 35%;
  align-self: flex-end;
  padding: 0;
  color: #212f3d;

  ul {
    list-style: none;
    text-align: left;
    font-size: 0.9em;
    padding: 0 1em 1em 1em;
  }

  li {
    padding: 0.3em;
  }

  li svg {
    padding-right: 0.7em;
  }

  h2 {
    background-color: ${teamColors[3]};
    color: white;
    margin-top: 0;
    padding: 1em;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 4px solid ${borderYellow};
  }

  a {
    color: #212f3d;
  }

  img {
    width: 60px;
    height: 60px;
    align-self: flex-end;
    padding: 0 2em 2em 0;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    width: 90%;
    align-self: center;
  }
`;

interface iContactDetail {
  textForPrint: string;
  iconType: IconProp;
  text?: string;
  linkUrl?: string;
  linkText?: string;
}

const ContactDetail: React.FC<iContactDetail> = ({
  textForPrint,
  iconType,
  text,
  linkUrl,
  linkText
}) => {
  const { isInPrintMode } = useContext(PrintModeContext);
  return (
    <li>
      {isInPrintMode ? textForPrint : <FontAwesomeIcon icon={iconType} />}
      {text}
      {linkUrl && (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      )}
    </li>
  );
};

export const ContactsBox = () => {
  return (
    <ContactsBoxContainer>
      <h2>Representation's contact details</h2>
      <ul>
        <ContactDetail
          textForPrint="Address: "
          iconType="home"
          text={contactDetails.address}
        />
        <ContactDetail
          textForPrint="Phone: "
          iconType="phone-square-alt"
          linkUrl={contactDetails.phone.link}
          linkText={contactDetails.phone.text}
        />
        <ContactDetail
          textForPrint="Email: "
          iconType="envelope"
          linkUrl={contactDetails.email.link}
          linkText={contactDetails.email.text}
        />
        <ContactDetail
          textForPrint="Twitter: "
          iconType={["fab", "twitter"]}
          linkUrl={contactDetails.twitter.link}
          linkText={contactDetails.twitter.text}
        />
        <ContactDetail
          textForPrint="Facebook: "
          iconType={["fab", "facebook"]}
          linkUrl={contactDetails.facebook.link}
          linkText={contactDetails.facebook.text}
        />
        <ContactDetail
          textForPrint="Instagram: "
          iconType={["fab", "instagram"]}
          linkUrl={contactDetails.instagram.link}
          linkText={contactDetails.instagram.text}
        />
        <ContactDetail
          textForPrint="Website: "
          iconType="desktop"
          linkUrl={contactDetails.website.link}
          linkText={contactDetails.website.text}
        />
      </ul>
      <img src={logo} alt="EC Rep logo" />
    </ContactsBoxContainer>
  );
};
