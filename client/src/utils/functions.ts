import { TeamInterface } from "../models/TeamInterface";
import { TeamMember } from "../models/TeamMember";
import { InputName } from "../models/Form";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import { teamColors } from "../constants/colors";

export const setTeamColor = (team: TeamInterface) => {
  switch (team) {
    case "DGT":
      return teamColors[0]; // "#FC814A";

    case "Press & Political":
      return teamColors[1]; //"#D972FF";

    case "Head of Representation Office":
      return teamColors[2]; //"#8447FF";

    case "Communication":
      return teamColors[3]; //"#FBAF00";

    case "Administration":
      return teamColors[4]; //"#CC2936";

    case "Economic - ESO":
      return teamColors[5]; //"#5B6C5D";

    default:
      return teamColors[6]; //"#64C964";
  }
};

export const filterByTeam = (array: TeamMember[], teamName: TeamInterface) => {
  return array
    .filter(item => item.team === teamName)
    .sort((a, b) => {
      if (a.indexInTeam! > b.indexInTeam!) return 1;
      else return -1;
    });
};

export const setTeamName = (teamName: TeamInterface): string => {
  switch (teamName) {
    case "Head of Representation Office":
      return "Head of Rep. Office";

    case "Press & Political":
      return "Media & Political Team";

    case "Communication":
      return "Communications Team";

    case "Economic - ESO":
      return "Economic Team";

    case "Administration":
      return "Administration Team";

    default:
      return teamName;
  }
};

export const setFormLabel = (inputName: InputName) => {
  switch (inputName) {
    case "firstName":
      return "FIRST NAME";

    case "lastName":
      return "LAST NAME";

    case "officePhone":
      return "OFFICE PHONE";

    default:
      return inputName.toUpperCase();
  }
};

// SAVE as PFD - onclick, I add a class changing size to A2, removed after the PDF has been saved
export const savePdf = async function() {
  try {
    const toPrint = document.querySelector(".App") as HTMLDivElement;
    // toPrint.className += " to-print";

    const iconsContainer = document.getElementById(
      "icons-container"
    ) as HTMLDivElement;
    iconsContainer.style.display = "none";

    const employees = document.querySelectorAll(".employee") as NodeListOf<
      HTMLDivElement
    >;

    employees.forEach(div => {
      div.style.boxShadow = "none";
      div.style.padding = "15px 25px";
    });

    // const teams = document.querySelectorAll(".teams") as NodeListOf<
    //   HTMLDivElement
    // >;
    // teams.forEach(div => {
    //   // div.style.transform = "scale(1.06)";
    // });

    await html2canvas(toPrint, { useCORS: true }) // to allow saving external images!
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPdf("p", "mm", "a2");
        pdf.addImage(imgData, "PNG", 0, 0, 420, 594);
        pdf.save("EC_Rep_organigram.pdf");
      })
      .then(() => {
        iconsContainer.style.display = "flex";
        return;
      });
  } catch (err) {
    console.error(err);
  }
};
