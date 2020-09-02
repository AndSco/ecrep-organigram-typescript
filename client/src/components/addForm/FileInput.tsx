import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "./TextInput";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { mediumGrey, teamColors, lightGrey } from "../../constants/colors";
import { FormContext } from "../../contexts/form/FormContext";
import { apiUrls } from "../../constants/apiUrls";
import axios from "axios";
import { PaddedIcon } from "../UI/PaddedIcon";
import { breakpoints } from "../../constants/breakpoints";
import { ProfilePic } from "../EmployeeCard/CardComponents";

const StyledFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  :focus,
  :hover {
    background-color: red;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    margin-top: 1em;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: ${mediumGrey};
  background-color: white;
  display: inline-block;
  cursor: pointer;
  padding: 0.4em;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;

  :focus,
  :hover {
    background-color: ${teamColors[4]};
    color: white;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    margin-top: 1em;
  }
`;

const EditPicContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin-left: 1.5em;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const FileInput: React.FC = () => {
  const { updateForm, userToEdit } = useContext(FormContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [needChangeImage, setNeedChangeImage] = useState(false);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files?.[0] as File;
    setImageFile(fileUploaded);
    uploadPicture(fileUploaded);
  };

  useEffect(() => {
    console.log("IMAGE FILE", imageFile);
  }, [imageFile]);

  const uploadPicture = async (imageFile: File) => {
    startLoading();
    const fd = new FormData();
    fd.append("image", imageFile, imageFile.name);
    const { data: url } = await axios.post(apiUrls.images, fd);
    console.log("URL", url);
    updateForm({ type: "imageUrl", payload: url });
    stopLoading();
  };

  return userToEdit && !needChangeImage ? (
    <Container>
      <EditPicContainer onClick={() => setNeedChangeImage(true)}>
        <ProfilePic imageUrl={userToEdit.imageUrl} />
        <p>Click to change picture</p>
      </EditPicContainer>
    </Container>
  ) : (
    <Container>
      <StyledFileInput
        type="file"
        id="image"
        name="image"
        accept=".png, .jpg, .JPG, .PNG, .jpeg"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          fileChangeHandler(e)
        }
        style={{ backgroundColor: "white", height: 35, margin: "0.5em 0" }}
      />
      <StyledLabel htmlFor="image">
        <PaddedIcon icon="image" color={lightGrey} marginRight={10} /> ADD A
        PROFILE PIC
      </StyledLabel>
    </Container>
  );
};
