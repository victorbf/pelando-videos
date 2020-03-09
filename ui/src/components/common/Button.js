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
  padding: 0 0.5rem;
  border: 1px solid ${SecondaryColor};
  min-width: 150px;
  border-radius: 20px;
  font-size: 14px;
`;

export default Button;
