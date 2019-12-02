import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import Template from '../../Template';
import { useDispatch } from 'react-redux';
import { Heading } from '../../components/Layout';
import { createBlocks, checkAllBocksForPossibleMatches } from '../../store/blocks/Blocks.actions';
import BlocksList from '../../components/Blocks/BlocksList';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBlocks());
    dispatch(checkAllBocksForPossibleMatches());
  }, []);

  return (
    <Template>
      <Heading bold size="h1">
        Home
      </Heading>
      <BlocksList></BlocksList>
    </Template>
  );
};

export default Home;
