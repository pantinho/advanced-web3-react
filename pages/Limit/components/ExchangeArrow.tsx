import styled from "styled-components";
import React from "react";
import { useSwapActionHandlers } from "../../../state/swap/hooks";

const ExchangeArrow = () => {
    const { onSwitchTokens } = useSwapActionHandlers();
    return (
        <ExchangeIcon onClick={() => onSwitchTokens()}>
            <img src='./images/tran.png' alt='tran'></img>
        </ExchangeIcon>
    );
};

const ExchangeIcon = styled.div`
    border: none;
    max-width: 25px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    background: transparent;
    transition: ease-in-out 0.5s all;
    cursor: pointer;
    img {
        width: 100%;
    }
    &:hover {
        transform: rotate(180deg);
    }
`;

export default ExchangeArrow;
