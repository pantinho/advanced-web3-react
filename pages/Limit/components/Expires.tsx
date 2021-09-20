import styled from "styled-components";
import React, { useState, useRef } from "react";
import { DateData } from "../constants/index";
import { useOnClickOutside } from "../../../../swap-ether/hooks/useOnClickOutside";

const Expires = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const [option, setOption] = useState("7 Days");
  const handleOptionClick = (value: any) => {
    setOption(value);
    setClick(false);
  };
  const [price, setPrice] = useState("0.00419");

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setClick(false));

  const RenderOptions = ({ data }: any) => {
    return (
      <OptionWrap className="bg-limit text">
        {data.map((item: any, index: any) => (
          <Option key={index} onClick={() => handleOptionClick(item.time)}>
            {item.time}
          </Option>
        ))}
      </OptionWrap>
    );
  };

  return (
    <ContentWrap>
      <Content>
        <Title className="text">Price</Title>
        <LimitOrder className="bg-limit text">
          <Input
            className="text"
            title="Token Amount"
            type="number"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Input>
          <Span>ETH</Span>
        </LimitOrder>
      </Content>
      <Content>
        <Title className="text">Expires in</Title>
        <div ref={ref}>
          <LimitOrder onClick={handleClick} className="bg-limit text">
            <DefaultOption>{option}</DefaultOption>
            <DropdownBtn
              className="text"
              style={click ? { transform: "rotate(180deg)" } : {}}
            >
              <i className="fas fa-caret-down"></i>
            </DropdownBtn>
          </LimitOrder>
          {click ? <RenderOptions data={DateData} /> : <></>}
        </div>
      </Content>
    </ContentWrap>
  );
};
const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  width: 100%;
  margin-top: 16px;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
`;
const Title = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: #7e96b8;
  margin-bottom: 8px;
`;
const LimitOrder = styled.div`
  height: 40px;
  line-height: 15px;
  padding: 16px;
  border-radius: 16px;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  /* background-color: #04223c; */
  position: relative;
  z-index: 30;
  cursor: pointer;
`;
const Input = styled.input`
  background: #0000;
  border: none;
  width: calc(100% - 32px);
  padding: 10px 0;
  margin: -10px 0;
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &input[type="number"] {
    -moz-appearance: textfield;
  }
`;
const Span = styled.span`
  color: #7e96b8;
`;
const DefaultOption = styled.div``;

const DropdownBtn = styled.div`
  transition: all ease-in-out 0.5s;
`;
const OptionWrap = styled.div`
  position: absolute;
  left: 0px;
  top: -24px;
  will-change: transform;
  transform: translate(0px, 74px);
  height: 200px;
  width: 100%;
  min-width: auto;
  z-index: 25;
  padding: 20px 0 0;
  overflow-y: auto;
  border: 1px solid #0168ff;
  /* background-color: #02192c; */
  border-radius: 16px;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: transparent !important;
  }
`;
const Option = styled.div`
  display: block;
  margin: 4px 8px;
  padding: 12px 8px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background: #0168ff30;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
  @media (max-width: 320px) {
    font-size: 11px;
  }
`;

export default Expires;
