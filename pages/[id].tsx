
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
    <div className="datailPage">
      <div className="datailPage-header">
        <h1 className="detailPage-header-title"> Product Details</h1>
        <a className="detailPage-header-link" href="."> Home </a>
      </div>
      <div className="datailPage-content">
        <img className="datailPage-content-img" src={dados.image} />
        <div className="datailPage-content-detail">
          <h2 className="datailPage-contet-detail-title">{dados.title}</h2>
          <p className="datailPage-contet-detail-description">{dados.description}</p>
          <p className="datailPage-contet-detail-rate"> Rate: {dados.rating.rate}</p>
          <p className="datailPage-contet-detail-coubt"> Count: {dados.rating.count}</p>
          <p className="datailPage-contet-detail-price"> Price: US$ {dados.price.toLocaleString()} </p>
        </div>
      </div>
    </div>
  );
}
