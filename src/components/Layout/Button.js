import styled, { css } from 'styled-components';

const buttonbase = css`
  border: none;
  padding: 10px 25px;
  color: var(--color-white);
  font-weight: 700;
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 20px;
`;

const variants = {
  primary: css`
    background: var(--color-main);
    color: var(--color-white);
    &:hover {
      background: var(--color-mainDark);
    }
  `,
};

/* size variants */

const Button = styled.button`
  ${buttonbase};
  ${({ variant }) => variants[variant]}
`;

export default Button;
