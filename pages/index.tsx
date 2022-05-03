import useSWR from "swr";
import Head from "next/head";
import styled from "styled-components";
import { v4 } from 'uuid';
import ClipLoader from "react-spinners/ClipLoader";

const StyledImg = styled.img` 
width: 100px;
height: 100px;
margin-right: 10px;
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

const StyledDiv = styled.div`
display: grid;
grid: auto-flow / 1fr 1fr 1fr;
`;

const StyledDivtitlo = styled.div`
display: grid;
background-color: #b5b5ff;  
grid-template-columns: 7fr 1fr;
`;

const Styledh1 = styled.h1`
align-items: center;
display: flex;
font-size: 46px;
flex-direction: column;
justify-content: center;
margin: 25px;
`;

const StyledProduct = styled.div`
display: flex;
flex-direction: row;
padding: 10px;
margin: 10px;
  transition: box-shadow .3s;
  border-radius:10px;
  border: 1px solid #ccc;
  background: #fff;
  float: left;
  :hover {  box-shadow: 0 0 11px rgba(33,33,33,.2); }
`;

const StyledDetail = styled.a`
align-self: flex-end;
`;
const StyledTitleCard = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 5px;
width: 100%;
`;

export function Users() {
  const address = `https://fakestoreapi.com/products?limit=10`;
  const fetcher = async (url: any) =>
    await fetch(url).then((res) => res.json());
  const { data, error } = useSWR(address, fetcher);

  if (error) return <p>Loading failed...</p>;
  if (!data) return <div className="loader"><ClipLoader/> <h1>Loadind...</h1></div>;
  return (<>
    <StyledDivtitlo>
      <Styledh1>Loja 10 </Styledh1>
      <StyledA href="http://localhost:3000/about "> About us </StyledA>
    </StyledDivtitlo>
    <StyledDiv>
      {data.map((item: any) => (
        <StyledProduct key={v4()}>
          <div>
            <StyledImg src={item.image} />
          </div>
          <StyledTitleCard>
            {item.title}
            <StyledDetail href={`http://localhost:3000/${item.id}`}>
              {" "}
              Product Details
            </StyledDetail>
          </StyledTitleCard>
        </StyledProduct>
      ))}
    </StyledDiv>
  </>);
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Random user generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Users />
    </div>
  );
}

