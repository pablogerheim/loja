import styled from "styled-components";

const StyledImg = styled.img`
  width: 35%;
  height: 35%;
`;
const StyledDiv = styled.div`
margin:10px;
`;

const StyledTitlo = styled.div`
display: grid;
background-color: #b5b5ff;  
grid-template-columns: 7fr 1fr;
`;

const StyledHone = styled.h1`
align-items: center;
display: flex;
font-size: revert-layer;
flex-direction: column;
justify-content: center;
margin: 25px;
`;

const StyledAhome = styled.a`
border-left: solid;
  border-left-color: currentcolor;
color: #0b0b64;
align-items: center;
border-color: #bba8ff;
height: 100%;
display: flex;
justify-content: center;
`;

export async function getStaticPaths() {
  const data = await fetch("https://fakestoreapi.com/products?limit=10").then(
    (res) => res.json()
  );

  const paths = await data.map((item: any) => {
    return { params: { id: item.id.toString() } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  
  const dados = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );

  return { props: { dados }, revalidate: 10 };
}

export default function details({ dados }) {

  if (!dados) return <h1>Loadind...</h1>;
  return (
    <StyledDiv>
      <StyledTitlo>
        <StyledHone> Detales do Produto</StyledHone>
        <StyledAhome href="."> Home </StyledAhome>
      </StyledTitlo>
      <StyledDiv>
        <StyledImg src={dados.image} />
      </StyledDiv>
      <div>
        <h1>{dados.title}</h1>
        <p>{dados.description}</p>
        <p> Rate: {dados.rating.rate}</p>
        <p> Count: {dados.rating.count}</p>
      </div>
      <div> Price: US$ {dados.price.toLocaleString()} </div>
    </StyledDiv>
  );
}
