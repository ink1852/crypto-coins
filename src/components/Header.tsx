import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 48px;
  outline: none;
`;
const ToggleBtn = styled.button`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  /* position: fixed;
  bottom: 20px;
  left: 20px; */
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
`;
interface IToogleBtn {
  toggleDark: () => void;
  isDark: boolean;
}
function Header({ toggleDark, isDark }: IToogleBtn) {
  return (
    <>
      <Wrapper>
        <Link to={"/"}>
          <Title>Coins</Title>
        </Link>
        <ToggleBtn onClick={toggleDark}>
          {isDark ? (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
              />
            </svg>
          ) : (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
            </svg>
          )}
        </ToggleBtn>
      </Wrapper>
    </>
  );
}

export default Header;
