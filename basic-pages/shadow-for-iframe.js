const shadowTarget = document.getElementById("shadow-root-2");
const shadow = shadowTarget.attachShadow({ mode: "open" });

const shadowParagraph = document.createElement("p");
const shadowStyles = document.createElement("style");

const shadowButton = document.createElement("button");

shadowStyles.innerHTML = `
  p {
    color: red;
    font-weight: bold;
  }
`;

shadowParagraph.innerHTML = "Shadow Paragraph";

shadowButton.innerHTML = "I am a shadow Button"

shadow.appendChild(shadowStyles);
shadow.appendChild(shadowParagraph);
shadow.appendChild(shadowButton);
