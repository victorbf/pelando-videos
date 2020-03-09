import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default GridContainer;
