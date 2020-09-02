import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../../contexts/form/FormContext";
import { FormContainer, Props } from "./FormContainer";
import { Form } from "./Form";

interface addFormProps extends Props {}

// WILL USE THE SAME COMPONENT FOR UPLOAD AND EDIT!
export const AddForm: React.FC<addFormProps> = () => {
  const {
    isVisible,
    hide: closeForm,
    formAction,
    userToEdit,
    resetForm
  } = useContext(FormContext);

  return (
    <FormContainer isVisible={isVisible}>
      <FontAwesomeIcon
        icon="chevron-circle-right"
        onClick={() => {
          resetForm();
          closeForm();
        }}
        size="2x"
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          marginTop: 15,
          paddingRight: 10
        }}
      />
      <h2>
        {formAction === "EDIT" && userToEdit
          ? `EDIT ${userToEdit.firstName.toUpperCase()} ${userToEdit.lastName.toUpperCase()}`
          : "ADD A STAFF MEMBER"}
      </h2>
      <Form action="ADD" />
    </FormContainer>
  );
};

// {
//   action === "EDIT" && !needNewTeam ? (
//     <div className="add-team">
//       <p>
//         Team:{" "}
//         <strong className="team-designation">
//           {/* {props.staffMember.team} */}
//         </strong>
//       </p>
//       <FontAwesomeIcon icon="edit" onClick={() => setNeedNewTeam(true)} />
//     </div>
//   ) : (
//     <div className="bottom-form">
//       <label forhtml="team">Team:</label>
//       <select name="team" onChange={e => handleChange(e, "team")}>
//         <option value="DGT">DGT</option>
//         <option value="HOR">Head of Representation</option>
//         <option value="Media & Political Team">Media & Political Team</option>
//         <option value="Communications Team">Communications Team</option>
//         <option value="Administration Team">Administration Team</option>
//         <option value="Economic Team">Economic Team</option>
//       </select>
//     </div>
//   );
// }

// {
// props.action === "edit" && !needNewPicture && (
//   <div className="change-image">
//     <p>Profile picture: </p>
//     <img
//       src={props.staffMember.imageUrl}
//       width="40"
//       height="40"
//       onClick={() => setNeedNewPicture(true)}
//       alt={props.staffMember.name}
//     />
//     <FontAwesomeIcon
//       icon="edit"
//       onClick={() => setNeedNewPicture(true)}
//     />
//   </div>
// )
// }
// {
// (needNewPicture || props.action !== "edit") && (
//   <div className="bottom-form">
//     <label forhtml="image">Upload pic:</label>
//     <input
//       type="file"
//       name="image"
//       onChange={e => fileChangeHandler(e)}
//     />
//   </div>
// )
// }
