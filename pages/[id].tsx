import { COOKIE_NAME_PRERENDER_DATA } from "next/dist/server/api-utils";
import styled from "styled-components";

const StyledImg1 = styled.img`
  width: 300px;
  height: 300px;
`;
const StyledDiv = styled.div`
  display: block;
`;

export async function getStaticPaths() {
  const data = await fetch("https://fakestoreapi.com/products?limit=10").then(
    (res) => res.json()
  );

  const paths = await data.map((item: any) => {
    return { params: { id: item.id.toString() } };
  });

  console.log(paths);
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  console.log(id);

  const dados = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  return { props: { dados }, revalidate: 10 };
}

export default function details({ dados }) {
  console.log(dados);

  if (!dados) return <h1>Loadind...</h1>;
  return (
    <div>
      <a href={`http://localhost:3000`}> Voltar para home </a>
      <StyledDiv>
        <StyledImg1 src={dados.image} />
      </StyledDiv>
      <div>
        <h1>{dados.title}</h1>
        <p>{dados.description}</p>
        <p> Rate: {dados.rating.rate}</p>
        <p> Count: {dados.rating.count}</p>
      </div>
      <div> Price: US$ {dados.price.toLocaleString()} </div>
    </div>
  );
}
