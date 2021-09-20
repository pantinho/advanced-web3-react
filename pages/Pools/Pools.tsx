import React from "react";
import styled from "styled-components";
import { PoolData } from "./constant";

const Pools = () => {
    const Card = ({
        tokenA,
        tokenB,
        iconTokenA,
        iconTokenB,
        tvl,
        volume24h,
        volume7D,
    }: any) => {
        return (
            <StyledCard className='bg-pool-card gradient-light'>
                <WrapperPair>
                    <IconPair className='gradient-dark bg-icon-pair'>
                        <TokenIcon>
                            <img src={iconTokenA} alt={`icon` + tokenA}></img>
                        </TokenIcon>
                        <TokenIcon>
                            <img src={iconTokenB} alt={`icon` + tokenB}></img>
                        </TokenIcon>
                        <div className='circle-bg bg-icon-pair'></div>
                        <div className='circle'></div>
                    </IconPair>
                    <NamePair>
                        <Text className='text'>{tokenA + `/` + tokenB}</Text>
                        <Percent className='text bg-percent'>0.3%</Percent>
                    </NamePair>
                </WrapperPair>
                <MainCard>
                    <Row>
                        <Text className='text'>TVL</Text>
                        <Text className='text'>{`$` + tvl + `m`}</Text>
                    </Row>
                    <Row>
                        <Text className='text'>Volume 24H</Text>
                        <Text className='text'>{`$` + volume24h + `m`}</Text>
                    </Row>
                    <Row>
                        <Text className='text'>Volume7D</Text>
                        <Text className='text'>{`$` + volume7D + `m`}</Text>
                    </Row>
                </MainCard>
            </StyledCard>
        );
    };

    return (
        <PoolsWrapper>
            <Header>
                <Text className='text'>Top Tokens</Text>
                <ImgHeader>
                    <img src='./images/pools/rocket1.png' alt='rocket' />
                </ImgHeader>
                <SearchBar
                    type='text'
                    className='input-dark'
                    placeholder='Search pool or tokens'
                ></SearchBar>
                <ImgHeader>
                    <img src='./images/pools/ufo.png' alt='ufo' />
                </ImgHeader>
                <ImgHeader>
                    <img src='./images/pools/ufo1.png' alt='ufo' />
                </ImgHeader>
            </Header>
            <Main>
                {PoolData.map((item: any) => {
                    return (
                        <Card
                            tokenA={item.tokenA}
                            tokenB={item.tokenB}
                            iconTokenA={item.iconTokenA}
                            iconTokenB={item.iconTokenB}
                            tvl={item.tvl}
                            volume24h={item.volume24h}
                            volume7D={item.volume24h}
                        />
                    );
                })}
            </Main>
        </PoolsWrapper>
    );
};

const ImgHeader = styled.div`
    img {
        max-width: 100px;
        height: auto;
        margin: 20px;
    }
    @media (max-width: 700px) {
        display: none;
    }
`;

const PoolsWrapper = styled.div`
    max-width: 1400px;
    width: 100%;
    padding: 0 2rem;
    position: relative;
    @media (max-width: 768px) {
        padding: 0;
        width: 95%;
        margin: 0 auto;
    }
`;
const Text = styled.p`
    margin-bottom: 0;
`;
const SearchBar = styled.input`
    max-width: 700px;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #0168ff;
    border-radius: 14px;
    @media (max-width: 576px) {
        margin-top: 10px;
        border-radius: 12px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    @media (max-width: 576px) {
        flex-direction: column;
        align-items: unset;
    }
`;

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const StyledCard = styled.div`
    width: 31.5%;
    padding: 1rem 1.2rem 0.5rem 1.2rem;
    border-radius: 16px;
    background: #ffffff;
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;
    max-width: 400px;
    @media (max-width: 1600px) {
        width: 48%;
    }
    @media (max-width: 576px) {
        width: 100%;
    }
    ::after {
        z-index: -1 !important;
    }
`;
const WrapperPair = styled.div`
    text-align: center;
    @media (max-width: 576px) {
        margin-bottom: 0;
    }
`;
const IconPair = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 50%;
    background: #f8f9fa;
    z-index: 0;
    .circle-bg {
        position: absolute;
        z-index: 0;
        width: 60px;
        height: 60px;
        background: #f8f9fa;
        border-radius: inherit;
        z-index: -1;
    }
    .circle {
        content: "";
        position: absolute;
        top: -1;
        let: -1;
        width: 61px;
        height: 62px;
        z-index: -2;
        border-radius: inherit;
        background: linear-gradient(
            52deg,
            #00ff36 7%,
            #00ee57 17%,
            #00c5ad 37%,
            #00a4f1 52%,
            #0b18fc 88%,
            #0d00ff 94%
        );
        @media (max-width: 576px) {
            width: 52px;
            height: 52px;
        }
    }

    @media (max-width: 576px) {
        width: 50px;
        height: 50px;
    }
`;
const TokenIcon = styled.div`
    img {
        width: 40px;
        height: 40px;
    }
    margin: -20px;
    @media (max-width: 576px) {
        img {
            width: 30px;
            height: 30px;
        }
        margin: -15px;
    }
`;
const NamePair = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Percent = styled.div`
    font-size: 0.6rem;
    padding: 2px 5px;
    margin-left: 5px;
    border-radius: 4px;
    border: 1px solid #0168ff;
`;
const MainCard = styled.div``;
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
`;

export default Pools;
