import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "./components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { darkTheme, lightTheme } from "./styles/theme";
import { useState } from "react";
const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html,body,div,span,applet,object,iframe,h1,
h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,
address,big,cite,code,del,dfn,em,img,ins,kbd,q,
s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,
dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,
caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,
details,embed,figure,figcaption,footer,header,hgroup,menu,
nav,output,ruby,section,summary,time,mark,audio,video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a{
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
body{
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
}
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 420px;
  min-width: 360px;
  margin: 0 auto;
`;
const ToggleBtn = styled.button`
  position: fixed;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  bottom: 20px;
  left: 20px;
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

function Layout() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Container>
          <GlobalStyle />
          <Header toggleDark={toggleDark} isDark={isDark} />
          <ReactQueryDevtools initialIsOpen={true} />
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
          <Outlet context={{ isDark }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Layout;
