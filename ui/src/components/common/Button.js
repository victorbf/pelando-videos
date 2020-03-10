import styled from 'styled-components';
import {
  PrimaryColor, SecondaryColor, White,
  DangerColor, WarningColor, SuccessColor,
} from '../../assets/styles/global/Variables.style';

const currentBGColor = (props) => {
  switch (props) {
    case 'primary':
      return PrimaryColor;
    case 'danger':
      return DangerColor;
    case 'warning':
      return WarningColor;
    case 'success':
      return SuccessColor;
    default:
      return SecondaryColor;
  }
};

const Button = styled.button`
  background: ${(props) => currentBGColor(props.action)};
  color: ${(props) => props.action && White};
  padding: 0.3rem 0;
  height: 100%;
  border: 1px solid ${(props) => currentBGColor(props.action)};
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  min-width: 150px;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  font-size: 14px;
  margin-left: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: 0;
  }
`;

export default Button;
