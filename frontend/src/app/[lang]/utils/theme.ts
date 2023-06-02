import {createGlobalStyle} from "styled-components";

const fontFamilies = [
  {
    name: "Poppins",
    extension: "ttf",
    weights: [100,200, 300, 400, 500,600, 700,800, 900],
    styles: ["normal", "italic"],
  },
];

const fontFace = () => {
  let fontFaceStyle = "";
  fontFamilies.forEach(({name, extension, weights, styles}) => {
    weights.forEach((fontWeight) => {
      styles.forEach((fontStyle) => {
        fontFaceStyle += `
          @font-face {
            font-family: ${name};
            src: url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}/fonts/${name}-${fontWeight}-${fontStyle}.${extension});
            font-weight: ${fontWeight};
            font-style: ${fontStyle};
          }
        `;
      });
    });
  });
  return fontFaceStyle;
};

export const GlobalStyle = createGlobalStyle`
  ${fontFace()}
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
    color: #1F1F1F;
    font-weight: 400;
  }
`;

export const theme = {
  colors: {
    primary: "#0E5686",
  },
};
