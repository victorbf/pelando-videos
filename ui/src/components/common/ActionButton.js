import styled from 'styled-components';
import {
  PrimaryColor, SecondaryColor, White,
  FontColor, SuccessColor,
} from '../../assets/styles/global/Variables.style';

const BackgroundColor = (color) => {
  switch (color) {
    case 'primary':
      return PrimaryColor;
    case 'success':
      return SuccessColor;
    default:
      return SecondaryColor;
  }
};

const Color = (color) => {
  switch (color) {
    case 'primary':
      return White;
    case 'success':
      return White;
    default:
      return FontColor;
  }
};

const ActionButton = styled.button`
  border-radius: 50%;
  position: ${(props) => (props.absolute ? 'absolute' : 'inherit')};
  left: ${(props) => (props.left ? '20px' : 'inherit')};
  right: ${(props) => (props.right ? '20px' : 'inherit')};
  bottom: 3rem;
  background: ${(props) => BackgroundColor(props.color)};
  width: 40px;
  height: 40px;
  color: ${(props) => Color(props.color)};

  &:disabled {
    opacity: 0.5;
  }
`;

export default ActionButton;
