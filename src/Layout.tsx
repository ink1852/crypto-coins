import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

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
}
*{
  box-sizing: border-box;
}
body{
  font-family: "Roboto Condensed", "Times New Roman";
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
}



`;

function Layout() {
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
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default Layout;
