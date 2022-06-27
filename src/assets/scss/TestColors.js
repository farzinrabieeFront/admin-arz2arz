import React from "react";
const colors = [
  "#000000",
  "#1e1b18",
  "#1E2026",
  "#35322f",
  "#696969",
  "#2F4F4F",
  "#708090",
  "#778899",
  "#808080",
  "#70798E",
  "#AFB7CB",
  "#707070",
  "#70798E",
  "#5d5b59",
  "#868482",
  "#aeadac",
  "#d7d6d5",
  "#A9A9A9",
  "#C0C0C0",
  "#D3D3D3",
  "#DCDCDC",
];
export default function TestColors() {
  return (
    <div className="d-flex">
      <div className="ml-3">
        {colors.map((color, index) => {
          return (
            <div className="my-3 d-flex justify-content-center">
              <div
                style={{
                  backgroundColor: color,
                  width: "500px",
                  height: "50px",
                  color: "#fff",
                  marginLeft: "5px",
                }}
              >
                {index + 1} - test color {color} for text
              </div>
              <h5 style={{ color: color }}>test color {color} for text</h5>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <h5 style={{ color: '#1e1b18' }}>test color doubledark for text</h5>
        <h5 style={{ color: '#35322f' }}>test color dark for text</h5>
        <h5 style={{ color: '#5d5b59' }}>test color medium for text</h5>
        <h5 style={{ color: '#868482' }}>test color regular for text</h5>
        <h5 style={{ color: '#aeadac' }}>test color light for text</h5>
        <h5 style={{ color: '#d7d6d5' }}>test color pale for text</h5>
      </div>
    </div>
  );
}
