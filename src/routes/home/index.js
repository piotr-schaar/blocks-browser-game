import { h } from 'preact';
import { useSelector } from 'react-redux';
import Template from '../../Template';
import { Heading } from '../../components/Layout';
import BlocksList from '../../components/Blocks/BlocksList';
import Modal from '../../components/Layout/Modal';

const Home = () => {
  const { possiblesMoves } = useSelector(({ BlocksReducer }) => BlocksReducer);

  return (
    <Template>
      <Heading bold size="h1">
        The Blocks Game
      </Heading>
      {!possiblesMoves && <Modal>Game over!</Modal>}
      <BlocksList />
    </Template>
  );
};

export default Home;
