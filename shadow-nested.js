(() => {
  const shadowTarget = document.getElementById("shadow-root-nested");
  shadowTarget.style.border = '1px solid #00cd17';
  shadowTarget.style.padding = '10px 10px';

  const shadow = shadowTarget.attachShadow({ mode: "open" });

  const shadowParagraph = document.createElement("p");
  const shadowStyles = document.createElement("style");

  shadowStyles.innerHTML = `
    p {
      color: #2a5cb2;
      font-weight: bold;
    }
  `;

  shadowParagraph.innerHTML = "This is a Shadow Root ->  contains another Shadow Root";

  shadow.appendChild(shadowStyles);
  shadow.appendChild(shadowParagraph);


  const shadowRoot2 = document.createElement('div');
  shadowRoot2.style.border = '1px solid blue';
  shadowRoot2.style.padding = '20px 10px';

  const shadow2 = shadowRoot2.attachShadow({ mode: 'open' });
  
  shadow.appendChild(shadowRoot2);


  const div = document.createElement('div');
  div.innerHTML = 'This is a Shadow DOM inside Shadow DOM';

  shadow2.appendChild(div);

  const img = document.createElement('img');
  img.style = 'width: 100px; height: auto; margin-top: 10px;'
  img.src = "assets/placeholder.jpeg";

  shadow2.appendChild(img);
  
})();