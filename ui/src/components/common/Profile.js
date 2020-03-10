import styled from 'styled-components';

export const ProfilePic = styled.img`
  border-radius: 50%;
  width: 50px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
`;

export const ProfileInfo = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  margin-right: 1.5rem;
  small {
    font-weight: 200;
  }
`;
