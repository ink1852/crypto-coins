import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Loader = styled.div`
  /* HTML: <div class="loader"></div> */

  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #74a478 94%, #0000) top/12px 12px no-repeat,
    conic-gradient(#0000 30%, #74a478);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 12px), #000 0);
  animation: l13 1s infinite linear;

  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

function Loading() {
  return (
    <>
      <Wrapper>
        <Loader />
      </Wrapper>
    </>
  );
}

export default Loading;
