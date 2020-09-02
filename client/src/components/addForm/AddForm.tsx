import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../../contexts/form/FormContext";
import { FormContainer, Props } from "./FormContainer";
import { Form } from "./Form";

interface addFormProps extends Props {}

// WILL USE THE SAME COMPONENT FOR UPLOAD AND EDIT!
export const AddForm: React.FC<addFormProps> = () => {
  const { isVisible, hide: closeForm, formAction, userToEdit } = useContext(
    FormContext
  );

  // // FOR EDITING! Set state with params of the current object. these will populate the input as starting values
  // const { action, staffMember } = props;
  // useEffect(() => {
  //   if (action === "edit") {
  //     setDesignation(staffMember.designation);
  //     setName(staffMember.name);
  //     setOfficePhone(staffMember.officePhone);
  //     setMobile(staffMember.mobile);
  //     setTeam(staffMember.team);
  //     setEmail(staffMember.email);
  //     setImageFile(staffMember.imageFile);
  //   }
  // }, [action, staffMember]);

  // const handleChange = (e, value) => {
  //   if (value === "designation") setDesignation(e.target.value);
  //   if (value === "name") setName(e.target.value);
  //   if (value === "officePhone") setOfficePhone(e.target.value);
  //   if (value === "mobile") setMobile(e.target.value);
  //   if (value === "email") setEmail(e.target.value);
  //   if (value === "team") setTeam(e.target.value);
  // };

  // const fileChangeHandler = e => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  // };

  // // first I handle the image axios request, send it to cloudinary and get back image URL;
  // // Then I include imageUrl in newEmployee object and send this to Mlab with another axios post
  // // Now the database will also include the imageUrl
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   context.startLoading();
  //   managePicture()
  //     .then(res => {
  //       const endPointData = "/api/employees/new";
  //       const newEmployee = {
  //         designation,
  //         name,
  //         officePhone,
  //         mobile,
  //         email,
  //         team,
  //         imageUrl: res.data.url
  //       };
  //       axios
  //         .post(endPointData, newEmployee)
  //         .then(res => console.log(res))
  //         .then(() => context.manageNewInput())
  //         .catch(err => console.log(err));
  //     })
  //     .catch(err => console.log(err));
  //   props.closeForm();
  // };

  // // Isolated picture logic, so it is reusable
  // const managePicture = () => {
  //   const fd = new FormData();
  //   console.log(imageFile);
  //   fd.append("image", imageFile, imageFile.name);
  //   const endPointImage = "/api/images";
  //   return axios.post(endPointImage, fd);
  // };

  // const handleUpdate = (e, employeeId) => {
  //   e.preventDefault();
  //   context.startLoading();
  //   console.log("UPDATE");
  //   const editEndPoint = `/api/employees/${employeeId}`;

  //   if (needNewPicture) {
  //     if (!imageFile) {
  //       context.stopLoading();
  //       // props.closeForm();
  //       context.addError("Upload a pic to continue!");
  //       return;
  //     }
  //     managePicture().then(res => {
  //       const updatedEmployee = {
  //         designation,
  //         name,
  //         officePhone,
  //         mobile,
  //         email,
  //         team,
  //         imageUrl: res.data.url
  //       };
  //       console.log("UPDATED EMPLOYEE FROM NEEDpic", updatedEmployee);
  //       axios
  //         .put(editEndPoint, updatedEmployee)
  //         .then(res => console.log(res))
  //         .then(() => {
  //           props.closeForm();
  //           context.triggerEditing();
  //         })
  //         .catch(err => console.log(err));
  //       // setNeedNewPicture(false);
  //     });
  //   } else {
  //     const updatedEmployee = {
  //       designation,
  //       name,
  //       officePhone,
  //       mobile,
  //       email,
  //       team,
  //       imageUrl: props.staffMember.imageUrl
  //     };
  //     axios
  //       .put(editEndPoint, updatedEmployee)
  //       .then(res => console.log(res))
  //       .then(() => {
  //         props.closeForm();
  //         context.triggerEditing();
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };

  return (
    <FormContainer isVisible={isVisible}>
      <FontAwesomeIcon
        icon="chevron-circle-right"
        onClick={closeForm}
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
