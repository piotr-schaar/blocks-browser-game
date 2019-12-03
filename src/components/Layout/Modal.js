import styled from 'styled-components';

const MainWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2rem;
  z-index: 10;
  transform: translate(-50%, -50%);
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
`;

const Modal = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Modal;
