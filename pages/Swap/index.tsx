import { Token } from "@forbitswap/sdk";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Text } from "rebass";
import {
  ButtonError,
  ButtonLight,
  ButtonConfirmed,
} from "../../components/Button";
import { GreyCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import { SwapPoolTabs } from "../../components/NavigationTabs";
import { AutoRow, RowBetween } from "../../components/Row";
import ConfirmSwapModal from "../../components/swap/ConfirmSwapModal";
import {
  ArrowWrapper,
  BottomGrouping,
  Wrapper,
} from "../../components/swap/styleds";
import TokenWarningModal from "../../components/TokenWarningModal";
import { useActiveWeb3React } from "../../hooks";
import { useCurrency } from "../../hooks/Tokens";
import { useOrderRouting } from "../../hooks/useOrderRouting";
import { useWalletModalToggle } from "../../state/application/hooks";
import { Field } from "../../state/swap/actions";
import {
  useDefaultsFromURLSearch,
  useSwapActionHandlers,
} from "../../state/swap/hooks";
import {
  useExpertModeManager,
  useUserSlippageTolerance,
} from "../../state/user/hooks";
import styled from "styled-components";
import GasPrice from "../../../general/components/GasPrice";
import Polling from "../../components/Header/Polling";
import PriceTable from "../../../general/components/PriceTable";
import { ETH, useGetSwapArguments, WETH } from "../../../general/store";
import { useCurrencyBalance } from "../../state/wallet/hooks";
import { useLoadingData } from "../../hooks/useLoadingData";


const ButtonDown = styled.button`
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

  img {
    width: 100%;
  }
  &:hover {
    transform: rotate(180deg);
  }
`;

export default function Swap() {
  const loadedUrlParams = useDefaultsFromURLSearch();
  const { getRoutingData } = useLoadingData();
  const [state, actions] = useGetSwapArguments();
  const isDeposit = Boolean(state.token0.address.toLowerCase() === ETH.toLowerCase() && state.token1.address.toLowerCase() === WETH)
  const isWithdraw = Boolean(state.token1.address.toLowerCase() === ETH.toLowerCase() && state.token0.address.toLowerCase() === WETH)

  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ];

  // modal and loading
  const [
    { showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash },
    setSwapState,
  ] = useState<{
    showConfirm: boolean;
    tradeToConfirm: any;
    attemptingTxn: boolean;
    swapErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  });

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(
    false
  );
  const urlLoadedTokens: Token[] = useMemo(
    () =>
      [loadedInputCurrency, loadedOutputCurrency]?.filter(
        (c): c is Token => c instanceof Token
      ) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  );
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true);
  }, []);
  const { account } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const [isExpertMode] = useExpertModeManager();
  const [allowedSlippage] = useUserSlippageTolerance();
  const {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
  } = useSwapActionHandlers();

  /****************** CALL API ******************/
  /****************** *******************/
  /**************************/
  

  //validate button flow
  const userHasSpecifiedInputOutput = Boolean(state.inputAmount);
  const inputBalance = useCurrencyBalance(
    account ?? undefined,
    state.token0 ?? undefined
  );

  const inputBalanceNum = Number(inputBalance?.toSignificant(4));
  const noRoute = Boolean(state.inputAmount && !state.outputAmount);
  const insuffBalance = Boolean(inputBalanceNum < Number(state.inputAmount) || !Number(inputBalanceNum));
  const showApproveFlow = Boolean(Number(state.inputAmount) > state.allowance);

  /*<<<<<<<<<<<<<<<<<<<<<<<<< ROUTING SWAP FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  /*<<<<<<<<<<<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  /*<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>*/
  const { aggregator, withdrawAndDepositETH, approveToken } = useOrderRouting(
    allowedSlippage
  );

  const handleApprove = async () => {
    const result = await approveToken();
  };

  const handleSwapRouting = async () => {
    setSwapState({
      showConfirm: true,
      tradeToConfirm,
      attemptingTxn: true,
      swapErrorMessage,
      txHash,
    })
    if (isDeposit || isWithdraw) {
      withdrawAndDepositETH()
        .then(res => {
          setSwapState({
            showConfirm: true,
            tradeToConfirm,
            attemptingTxn: false,
            swapErrorMessage,
            txHash: res,
          })
          return res
        })
        .catch(err => {
          setSwapState({
            showConfirm: true,
            tradeToConfirm,
            attemptingTxn,
            swapErrorMessage: err.message,
            txHash,
          })
        })
    }
    else {
      aggregator()
        .then(res => {
          setSwapState({
            showConfirm: true,
            tradeToConfirm,
            attemptingTxn: false,
            swapErrorMessage,
            txHash: res,
          })
          return res
        })
        .catch(err => {
          setSwapState({
            showConfirm: true,
            tradeToConfirm,
            attemptingTxn,
            swapErrorMessage: err.message,
            txHash,
          })
        })
    }
  };

  const handleTypeInput = useCallback(
    (value: string) => {
      actions.changeInputAmount(value);
      onUserInput(Field.INPUT, value);
      getRoutingData(value);
    },

    //eslint-disable-next-line
    [onUserInput, actions.changeInputAmount, getRoutingData]
  );

  const handleTypeOutput = useCallback(
    (value: string) => {
      actions.changeOutputAmount(value);
      onUserInput(Field.OUTPUT, value);
    },
    //eslint-disable-next-line
    [onUserInput]
  );

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      onCurrencySelection(Field.INPUT, inputCurrency);
      if (
        inputCurrency.address === state.token1.address ||
        inputCurrency.address === state.token1.address ||
        inputCurrency.symbol === state.token1.symbol
      ) {
        actions.swapCurrency();
      } else {
        actions.changeToken0(inputCurrency);
        getRoutingData(state.inputAmount, inputCurrency?.address, true);
      }
    },
    // eslint-disable-next-line
    [
      onCurrencySelection,
      onUserInput,
      actions.swapCurrency,
      actions.changeToken0,
      getRoutingData,
    ]
  );

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency);
      if (
        outputCurrency.address === state.token0.address ||
        outputCurrency.symbol === state.token0.symbol
      ) {
        actions.swapCurrency();
      } else {
        actions.changeToken1(outputCurrency);
        getRoutingData(state.inputAmount, outputCurrency?.address, false);
      }
    },
    // eslint-disable-next-line
    [
      onCurrencySelection,
      actions.swapCurrency,
      actions.changeToken1,
      getRoutingData,
    ]
  );

  useEffect(() => {
    getRoutingData(state.inputAmount)
  },[state.token0, state.token1, state.type])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    });
  }, [attemptingTxn, swapErrorMessage, tradeToConfirm, txHash]);
  return (
    <>
      <TokenWarningModal
        isOpen={urlLoadedTokens.length > 0 && !dismissTokenWarning}
        tokens={urlLoadedTokens}
        onConfirm={handleConfirmTokenWarning}
      />

      <Wrapper id="swap-page">
        <div>
          <SwapPoolTabs active={"swap"} />
        </div>
        <ConfirmSwapModal
          isOpen={showConfirm}
          trade={undefined}
          originalTrade={tradeToConfirm}
          // onAcceptChanges={handleAcceptChanges}
          attemptingTxn={attemptingTxn}
          txHash={txHash}
          recipient={''}
          allowedSlippage={allowedSlippage}
          onConfirm={handleSwapRouting}
          swapErrorMessage={swapErrorMessage}
          onDismiss={handleConfirmDismiss}
        />
        <AutoColumn gap={"md"}>
          <Text className="text text-dark2">You pay</Text>
          <CurrencyInputPanel
            value={state.inputAmount ? state.inputAmount : ""}
            showMaxButton={false}
            currency={state.token0}
            onUserInput={handleTypeInput}
            onCurrencySelect={handleInputSelect}
            id="swap-currency-input"
          />

          <AutoColumn justify="space-between">
            <AutoRow
              justify={isExpertMode ? "space-between" : "center"}
              style={{ padding: "0 1rem" }}
            >
              <ArrowWrapper clickable>
                <ButtonDown
                  onClick={() => {
                    onSwitchTokens();
                    actions.swapCurrency();
                  }}
                >
                  <img
                    src="../images/icons/arrow-circle-light.svg"
                    alt="arrow circle icon"
                    className="logo_light"
                  ></img>
                  <img
                    src="../images/icons/arrow-circle-dark.svg"
                    alt="arrow circle icon"
                    className="logo_dark"
                  ></img>
                </ButtonDown>
              </ArrowWrapper>
            </AutoRow>
          </AutoColumn>
          <Text className="text text-dark2">You Receive</Text>
          <CurrencyInputPanel
            value={state.outputAmount ? state.outputAmount : ""}
            onUserInput={handleTypeOutput}
            showMaxButton={false}
            currency={state.token1}
            onCurrencySelect={handleOutputSelect}
            id="swap-currency-output"
            disabled={true}
            field={Field.OUTPUT}
          />
        </AutoColumn>

        <BottomGrouping>
          {!account ? (
            <ButtonLight
              className="btn_mode"
              onClick={toggleWalletModal}
              boxShadow="rgb(0 0 0 / 19%) -3px 2px 3px 0px, rgb(0 0 0 / 23%) 0px 4px 12px 1px"
            >
              Connect Wallet
            </ButtonLight>
          ) : !userHasSpecifiedInputOutput ? (
            <GreyCard
              style={{ textAlign: "center" }}
              className="text-dark2 text"
            >
              Enter amount
            </GreyCard>
          ) : noRoute ? (
            <GreyCard
              style={{ textAlign: "center" }}
              className="text-dark2 text"
            >
              Insufficient liquidity for this trade
            </GreyCard>
          ) : insuffBalance ? (
            <GreyCard
              style={{ textAlign: "center" }}
              className="text-dark2 text"
            >
              Insufficient balance for this trade
            </GreyCard>
          ) : showApproveFlow ? (
            <RowBetween>
              <ButtonConfirmed
                onClick={handleApprove}
                width="100%"
                id="swap-button"
                disabled={!showApproveFlow ? true : false}
              >
                Allow multicall contract to use {state.token0.symbol}
              </ButtonConfirmed>
            </RowBetween>
          ) : (
            <>
              <div style={{ marginBottom: 10 }} />
              <RowBetween>
                <ButtonError
                  onClick={() => {
                    setSwapState({
                      showConfirm: true,
                      tradeToConfirm,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      txHash: undefined,
                    })
                  }}
                  id="swap-button"
                >
                  <Text>
                    {isDeposit ? "Deposit ETH" : isWithdraw ? "Withdraw WETH" : "Swap"}
                  </Text>
                </ButtonError>
              </RowBetween>
            </>
          )}
        </BottomGrouping>
        <PriceTable />
        <GasPrice />
        <Polling />
      </Wrapper>
    </>
  );
}
