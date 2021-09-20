import React from "react";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { HashRouter } from "react-router-dom";
import styled from "styled-components";
import "./i18n";
import { NetworkContextName } from "./constants";
import getLibrary from "./utils/getLibrary";


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

export default function App() {
  return (
    <HashRouter>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Wrapper>
                
              </Wrapper>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
    </HashRouter>
  );
}

const Wrapper = styled.div`
`;

