// pages/index
import useSWR from "swr";
import Head from "next/head";
import styled from "styled-components";

const StyledImg = styled.img` 
width: 100px;
height: 100px;sss
`;

const StyledA = styled.a`
margin: 20px;
display: block
`;

export function Users() {
  const address = `https://fakestoreapi.com/products?limit=10`;
  const fetcher = async (url: any) =>
    await fetch(url).then((res) => res.json());
  const { data, error } = useSWR(address, fetcher);

  if (error) return <p>Loading failed...</p>;
  if (!data) return <h1>Loadind...</h1>;
  return (
    <div className="container">
      <StyledA href="http://localhost:3000/about "> About us </StyledA>
      {data.map((item: any) => (
        <div>
          <div>
            <StyledImg src={item.image} />
          </div>
          {item.title}
          <a href={`http://localhost:3000/${item.id}`}>
            {" "}
            Ir para os detales do produto
          </a>
        </div>
      ))}
    </div>
  );
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
