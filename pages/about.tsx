import Link from 'next/link'
import styled from "styled-components";
import useSWR from 'swr';

const StyledDiv = styled.div`
margin:10px;
`;

const StyledDivtitlo = styled.div`
display: grid;
background-color: #b5b5ff;  
grid-template-columns: 7fr 1fr;
`;

const Styledh1 = styled.h1`
align-items: center;
display: flex;
font-size: revert-layer;
flex-direction: column;
justify-content: center;
margin: 25px;
`;

const StyledA = styled.a`
border-left: solid;
  border-left-color: currentcolor;
color: #0b0b64;
align-items: center;
border-color: #bba8ff;
height: 100%;
display: flex;
justify-content: center;
`;

const fetcher = (url) => fetch(url).then((res) => res.json()).then(data => data)

const Sobre = () => {

  const { data, error } = useSWR('https://fakestoreapi.com/products/2',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30
    });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return <div>

    <StyledDivtitlo>
      <Styledh1>Texto Estatico</Styledh1>
      <StyledA href="."> Home </StyledA>
    </StyledDivtitlo>
    <StyledDiv>
      {data.description}
    </StyledDiv>
  </div>

}

export default Sobre;