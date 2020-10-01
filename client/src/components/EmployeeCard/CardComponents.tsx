import React from "react";
import styled from "styled-components";
import { TeamMember } from "../../models/TeamMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { officePhoneBase } from "../../constants/contacts";
import { TeamInterface } from "../../models/TeamInterface";
import { setTeamColor } from "../../utils/functions";
import { breakpoints } from "../../constants/breakpoints";
import { darkGrey, mediumGrey } from "../../constants/colors";

interface iContainerProps {
  team: TeamInterface;
  isDragging: boolean;
  canDrag: boolean;
}

export const Container = styled.div`
  color: #292929;
  display: flex;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-height: 120px;
  max-height: 160px;
  padding: 1em;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 1em;
  background-color: white;
  border-bottom: ${(props: iContainerProps) =>
    `3px solid ${setTeamColor(props.team)}`};

  opacity: ${(props: iContainerProps) => (props.isDragging ? 0.4 : 1)};
  cursor: ${(props: iContainerProps) => (!props.canDrag ? "auto" : "move")};
  cursor: ${(props: iContainerProps) => (!props.canDrag ? "auto" : "grab")};
  cursor: ${(props: iContainerProps) =>
    !props.canDrag ? "auto" : "-moz-grab"};
  cursor: ${(props: iContainerProps) =>
    !props.canDrag ? "auto" : "-webkit-grab"};

  a {
    color: #292929;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
  }

  @media (max-width: ${breakpoints.bigScreens}px) {
    width: 50vw;
    min-width: 320px;
    min-height: 160px;
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ProfilePic = styled.div`
  border-radius: 50%;
  margin-bottom: 30px;
  width: 85px;
  height: 85px;
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  background-image: ${(props: { imageUrl: string }) =>
    "url(" + props.imageUrl + ")"};
`;

export const EditDeleteButtons = styled.div`
  display: flex;

  svg {
    padding-right: 0.5em;
    opacity: 0.3;
    cursor: pointer;
  }

  svg:hover {
    opacity: 1;
  }
`;

const DetailsContainer = styled.div`
  font-size: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Contacts = styled.div`
  font-size: 0.7em;

  svg {
    padding: 0 3px 0 15px;
  }
`;

interface iContactDetailProps {
  icon: IconProp;
  hyperLink: string;
  text: string;
}

const ContactDetail: React.FC<iContactDetailProps> = ({
  icon,
  hyperLink,
  text
}) => {
  return (
    <span>
      <FontAwesomeIcon
        icon={icon}
        color={mediumGrey}
        style={{ paddingRight: 6 }}
      />
      <a href={hyperLink}>{text}</a>
    </span>
  );
};

const Designation = styled.h4`
  letter-spacing: 0.7px;
  font-size: 0.9em;
  color: ${darkGrey};
  padding-bottom: 10px;
  font-weight: 600;
`;

export const Details: React.FC<{ staffMember: TeamMember }> = ({
  staffMember
}) => {
  return (
    <DetailsContainer>
      <Designation>{staffMember.designation}</Designation>
      <p style={{ paddingBottom: "1.1em" }}>
        <em>
          {staffMember.firstName + " " + staffMember.lastName.toUpperCase()}
        </em>
      </p>
      <Contacts>
        <div>
          {staffMember.officePhone && (
            <ContactDetail
              icon="phone-square-alt"
              hyperLink={`tel:${officePhoneBase}${staffMember.officePhone}`}
              text={staffMember.officePhone}
            />
          )}
          {staffMember.mobile && (
            <ContactDetail
              icon="mobile-alt"
              hyperLink={`tel:+356${staffMember.mobile}`}
              text={staffMember.mobile}
            />
          )}

          <div style={{ marginTop: ".5em" }}>
            <ContactDetail
              icon="envelope"
              hyperLink={`mailto:${staffMember.email}`}
              text={staffMember.email}
            />
          </div>
        </div>
      </Contacts>
    </DetailsContainer>
  );
};
