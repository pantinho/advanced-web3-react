import React, { useState, useEffect, useCallback } from "react";
import Swap from "../index";
import Settings from "../../../components/Settings";
import { Link, NavLink } from "react-router-dom";

import styled from "styled-components";
import Limit from "../../Limit";
import Web3 from "web3";
import { useActiveWeb3React } from "../../../hooks";

import { useGetSwapArguments } from "../../../../general/store";

export default function Header({ isLimit }: any) {
  const [state, actions] = useGetSwapArguments()
  const [nonce, setNonce] = useState(0);
  const { account } = useActiveWeb3React();
  const web3 = new Web3(Web3.givenProvider);

  const getTransactionCount = useCallback(async (address: any) => {
    await web3.eth.getTransactionCount(address).then((data) => {
      setNonce(data);
    });
  },[web3.eth]);

  useEffect(() => {
    if (account) {
      getTransactionCount(account);
    }
  }, [account, getTransactionCount]);
  return (
    <>
      <HeaderFrame>
        <Tab className="swap-tab">
          {
            (!state.openSetting) ?
            <SwapTab>
              <NavTab className="nav-tab">
                <WrapTab>
                  <Route
                    to="/swap"
                    className="tab-name"
                    activeClassName="tab-actived"
                  >
                    Market
                  </Route>
                  <Route
                    to="/limit"
                    className="tab-name"
                    activeClassName="tab-actived"
                  >
                    {" "}
                    Limit{" "}
                  </Route>
                </WrapTab>
                <WrapTab>
                  <IconTab>
                    <CountDownWrap>
                      <img
                        className="logo_dark"
                        src="./images/svg-setting/refresh-dark.svg"
                        alt=""
                      ></img>
                      <img
                        className="logo_light"
                        src="./images/svg-setting/refresh-light.svg"
                        alt=""
                      ></img>
                    </CountDownWrap>
                  </IconTab>
                  <IconTab>
                    <Link to="/add">
                      <img
                        className="logo_dark"
                        src="./images/svg-setting/icon-add-token-dark.svg"
                        alt=""
                      ></img>
                      <img
                        className="logo_light"
                        src="./images/svg-setting/icon-add-token-light.svg"
                        alt=""
                      ></img>
                    </Link>
                  </IconTab>
                  <StyledMenuButton onClick={() => {
                    actions.openSetting(true)
                  }}>
                    <IconSetting className="fillicon">
                      <img
                        src="./images/svg-setting/icon-setting-dark.svg"
                        alt="setting-icon"
                        className="logo_dark"
                      ></img>
                      <img
                        src="./images/svg-setting/icon-setting-light.svg"
                        alt="setting-icon"
                        className="logo_light"
                      ></img>
                    </IconSetting>
                  </StyledMenuButton>
                </WrapTab>
              </NavTab>
          {!isLimit ? <Swap /> : <Limit nonce={nonce} />}
          </SwapTab>
          : <Settings />
    }
        </Tab>
      </HeaderFrame>
    </>
  );
}

const StyledMenuButton = styled.button`
  /* position: relative; */
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 0.5;
  }
`;

const SwapTab = styled.div`
  padding: 1rem;
`;

const IconSetting = styled.div`
  img {
    height: 18px;
  }
`;
const HeaderFrame = styled.div``;

const IconTab = styled.div`
  display: flex;
  height: 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  a {
    display: block;
  }
  img {
    height: 18px;
  }
`;

const NavTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const WrapTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:nth-child(1) {
    background: ${({theme}) => theme.bg5};
    border-radius: 8px;
    padding: 4px;
  }
`;

const Tab = styled.div`
  position: relative;
  background: white;
  /* box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px,
    rgba(0, 0, 0, 0.23) -1px 7px 18px 0px; */
  box-shadow: 0 3.75912px 22.5547px rgb(0 0 0 / 8%);
  // padding: 0 1rem;

  @media (max-width: 576px) {
    border-radius: 22px;
  }
`;

const Route = styled(NavLink)`
  line-height: initial;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 2px 16px;
  text-decoration: none!important;
  color: ${({theme}) => theme.text1};
  &:hover {
    color: ${({theme}) => theme.text1};
  }
  &.tab-actived{
    background: ${({theme}) => theme.bg2};
  }
`;

const CountDownWrap = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 12s linear infinite;
  height: 18px;

  img {
    height: 18px;
    /* :last-child {
            position: absolute;
            width: 8px;
            top: 3px;
            right: -2px;
        } */
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`;
