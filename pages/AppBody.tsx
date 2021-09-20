import React from "react";
import styled from "styled-components";

export const BodyWrapper = styled.div`
    /* position: absolute;
        top: 20vh;
        right: 0;
        left: 0; */
    margin: auto;
    max-width: 420px;
    width: 100%;
    background: white;

    box-shadow: rgb(0 0 0 / 12%) -6px 4px 10px 0px,
        rgba(0, 0, 0, 0.23) -1px 7px 18px 0px;
    border-radius: 30px;
    padding: 1rem;
    @media (max-width: 576px) {
        position: relative;
        top: 0;
        border-radius: 22px;
        margin-top: 0;
    }
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
    return <BodyWrapper className='mode-tab'>{children}</BodyWrapper>;
}
