import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import Template from '../../Template';
import { useDispatch } from 'react-redux';
import { Heading } from '../../components/Layout';
import BlocksList from '../../components/Blocks/BlocksList';

const Home = () => {
  return (
    <Template>
      <Heading bold size="h1">
        The Blocks Game
      </Heading>
      <BlocksList />
    </Template>
  );
};

export default Home;
