import styled from "styled-components";
import { TeamInterface } from "../../models/TeamInterface";
import { setTeamColor } from "../../utils/functions";
import { breakpoints } from "../../constants/breakpoints";

interface TeamContainerProps {
  teamName: TeamInterface;
  isHorTeam?: boolean;
}

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  margin-top: ${(props: TeamContainerProps) => (props.isHorTeam ? 0 : "2em")};
  width: 25vw;
  min-width: 350px;

  h2 {
    background-color: ${(props: TeamContainerProps) =>
      setTeamColor(props.teamName)};
    border-bottom: 2px solid white;
    padding: 0.5em;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0.4em 0;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    width: 95%;
  }

  @media (max-width: ${breakpoints.bigScreens}px) {
    margin-bottom: 3.5em;
    align-items: center;
    order: ${(props: TeamContainerProps) => (props.isHorTeam ? -1 : "")};

    h2 {
      width: 70vw;
      min-width: 350px;
      margin-bottom: 1em;
    }
  }
`;

export const MembersContainer = styled.div``;
