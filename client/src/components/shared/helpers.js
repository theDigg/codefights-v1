import { css, keyframes } from "styled-components";

export const smallFont = css`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const wideFont = css`
  ${smallFont};
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const fadeKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fade = css`
  animation: ${fadeKeyframes} 0.25s;
`;

export const transition = props => css`
  transition: all ${props.slow ? "0.3s" : "0.15s"} ease;
`;

export const headerItem = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 16px;

  @media (max-width: 425px) {
    padding: 0 8px;
  }
`;

export const link = props => css`
  ${transition};

  ${props.underline && "border-bottom: 1px solid transparent"};
  text-decoration: none;
  color: ${props => props.theme.normalText};

  :hover {
    ${props.underline && "border-bottom: 1px solid"};
    color: ${props => props.theme.accent};
  }
`;
