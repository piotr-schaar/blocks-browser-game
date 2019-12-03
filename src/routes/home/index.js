import { h } from 'preact';
import { useSelector, useDispatch } from 'react-redux';
import { createBlocks } from '../../store/blocks/Blocks.actions';
import Template from '../../Template';
import { Heading } from '../../components/Layout';
import BlocksList from '../../components/Blocks/BlocksList';
import Modal from '../../components/Layout/Modal';
import Button from '../../components/Layout/Button';

const Home = () => {
  const { possiblesMoves } = useSelector(({ BlocksReducer }) => BlocksReducer);
  const dispatch = useDispatch();

  const modalHandleClick = () => dispatch(createBlocks());

  return (
    <Template>
      <Heading bold size="h1">
        The Blocks Game
      </Heading>
      {possiblesMoves === false && (
        <Modal>
          <Heading smallPadding bold size="h2">
            Game over!!!
          </Heading>
          <Button variant="primary" onClick={modalHandleClick}>
            Try again
          </Button>
        </Modal>
      )}
      <BlocksList />
    </Template>
  );
};

export default Home;
