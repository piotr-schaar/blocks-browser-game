import styled from 'styled-components';

const MainWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
`;

const Modal = ({ children }) => {
  return <MainWrapper>MODAL</MainWrapper>;
};

export default Modal;
