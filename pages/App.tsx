import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import AddLiquidity from "./AddLiquidity";
import Swap from "./Swap/components/Tab";

const Marginer = styled.div`
  margin-top: 5rem;
  @media (max-width: 1024px) {
    margin-top: 2rem;
  }
  @media (max-width: 576px) {
    margin-top: 1rem;
  }
`;



export default function App() {
  return (
    <Suspense fallback={null}>
      <Popups />
      <Web3ReactManager>
        <Switch>
          <Route exact path="/">
            <Redirect to="/swap" />
          </Route>
          <Route exact path="/swap">
            <Swap isPool={false} />
          </Route>
          <Route exact path="/limit">
            <Swap isLimit={true} />
          </Route>
          <Route exact path="/add" component={AddLiquidity} />
        </Switch>
      </Web3ReactManager>
      <Marginer />
    </Suspense>
  );
}
