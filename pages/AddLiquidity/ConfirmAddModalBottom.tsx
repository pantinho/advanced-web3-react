import { Currency, CurrencyAmount, Fraction, Percent } from '@forbitswap/sdk';
import React from 'react';
import { Text } from 'rebass';
import { ButtonPrimary } from '../../components/Button';
import { RowBetween, RowFixed } from '../../components/Row';
import CurrencyLogo from '../../components/CurrencyLogo';
import { Field } from '../../state/mint/actions';
import { TYPE } from '../../theme';

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean;
  price?: Fraction;
  currencies: { [field in Field]?: Currency };
  parsedAmounts: { [field in Field]?: CurrencyAmount };
  poolTokenPercentage?: Percent;
  onAdd: () => void;
}) {
  return (
    <>
      <RowBetween>
        <TYPE.body className="text">
          {currencies[Field.CURRENCY_A]?.symbol} Deposited
        </TYPE.body>
        <RowFixed>
          <CurrencyLogo
            currency={currencies[Field.CURRENCY_A]}
            style={{ marginRight: '8px' }}
          />
          <TYPE.body className="text">
            {parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}
          </TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body className="text">
          {currencies[Field.CURRENCY_B]?.symbol} Deposited
        </TYPE.body>
        <RowFixed>
          <CurrencyLogo
            currency={currencies[Field.CURRENCY_B]}
            style={{ marginRight: '8px' }}
          />
          <TYPE.body className="text">
            {parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}
          </TYPE.body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <TYPE.body className="text">Rates</TYPE.body>
        <TYPE.body className="text">
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(
            4,
          )} ${currencies[Field.CURRENCY_B]?.symbol}`}
        </TYPE.body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <TYPE.body className="text">
          {`1 ${
            currencies[Field.CURRENCY_B]?.symbol
          } = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </TYPE.body>
      </RowBetween>
      <RowBetween>
        <TYPE.body className="text">Share of Pool:</TYPE.body>
        <TYPE.body className="text">
          {noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%
        </TYPE.body>
      </RowBetween>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <Text fontWeight={500} fontSize={20} className="text">
          {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
        </Text>
      </ButtonPrimary>
    </>
  );
}
