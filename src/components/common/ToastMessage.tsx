import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface ToastMessageProps {
  content: string;
}

export default function ToastMessage({ content }: ToastMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <MessageWrap $isVisible={isVisible}>
      <MessageBox>
        <Content>{content}</Content>
      </MessageBox>
    </MessageWrap>
  )
}

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
`;

const MessageWrap = styled.div<{ $isVisible: boolean }>`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 40px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    animation: ${({ $isVisible }) =>
        $isVisible
            ? css`
                  ${fadeIn} 0.3s ease-in-out
              `
            : css`
                  ${fadeOut} 0.3s ease-in-out
              `};
`;

const MessageBox = styled.div`
    display: inline-flex;
    padding: 1rem 2rem;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.color.primary};
    background: #FFF;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.20);
`;

const Content = styled.span`
  color: ${(props) => props.theme.color.black}; 
  font-size: ${(props) => props.theme.font.middleSize};
  font-weight: 500;
  line-height: 140%; 
`;
