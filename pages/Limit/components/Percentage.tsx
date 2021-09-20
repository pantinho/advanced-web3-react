import React, { useState } from "react";
import styled from "styled-components";

const Percentage = () => {
  const [click, setClick] = useState("10%");
  const number = [
    {
      value: "10%",
    },
    {
      value: "25%",
    },
    {
      value: "50%",
    },
    {
      value: "75%",
    },
    {
      value: "MAX",
    },
  ];
  return (
    <WrapperPercent>
      {number.map((item: any, idx: any) => (
        <Percent
          onClick={() => setClick(item.value)}
          className={click === item.value ? "active bg-limit" : "bg-limit"}
          key={idx}
        >
          {item.value}
        </Percent>
      ))}
    </WrapperPercent>
  );
};

const WrapperPercent = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  margin-top: 15px;
  padding: 15px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
`;
const Percent = styled.div`
  width: 100%;
  color: #7e95b7;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  /* background: #04223c; */
  padding: 4px 12px;
  border-radius: 8px;
  cursor: pointer;
  border: 0.5px solid #0168ff87;
  &.active {
    background-color: #0168ff !important;
    color: #fff;
  }
`;

export default Percentage;
