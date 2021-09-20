import React from "react";
import styled from "styled-components";

const PriceTable = () => {
  return (
    <WrapperPricre>
      <Price>
        <tbody>
          <tr>
            <td className="text-dark2">Rate</td>
            <td>
              <CellWrap>
                <div className="text-dark2">
                  1 USDT = <span className="text">0,0004915</span> ETH
                </div>
                <div className="text">~ $1</div>
              </CellWrap>
            </td>
          </tr>
          <tr>
            <td className="text-dark2">Inverse Rate</td>
            <td>
              <CellWrap>
                <div className="text-dark2">
                  1 ETH = <span className="text">2,034.460829</span> USDT
                </div>
                <div className="text">~ $2,039</div>
              </CellWrap>
            </td>
          </tr>
        </tbody>
      </Price>
    </WrapperPricre>
  );
};

const WrapperPricre = styled.div`
  width: 100%;
  margin-top: 15px;
  border: 1px solid #2789f44d;
  border-radius: 16px;
  padding: 15px 10px;
`;
const Price = styled.table`
  width: 100%;
  color: #7e95b7;
  font-weight: 500;
  font-size: 14px;

  td:first-child {
    display: flex;
    align-items: flex-start;
  }

  td:last-child {
    text-align: right;

    span {
      color: #fff;
    }
  }
`;

const CellWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div:last-child {
    font-size: 10px;
    color: #fff;
  }
`;

export default PriceTable;
