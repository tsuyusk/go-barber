import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  margin: -176px 0 auto;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    & > div:nth-child(4) {
      margin-bottom: 24px;
    }

    & > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  width: 186px;
  align-self: center;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  > label {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #ff9000;
    border-radius: 50%;
    border: 0;
    bottom: 0;
    right: 0;
    transition: all 0.3s ease;

    display: flex;
    place-content: center;
    align-items: center;

    input {
      display: none;
    }

    > svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
