import Link from 'next/link'

import useSWR from 'swr';


const fetcher = (url) => fetch(url).then((res) => res.json()).then(data => data)

const Sobre = () => {

  const { data, error } = useSWR('https://fakestoreapi.com/products/2',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30
    });

  console.log(data, error)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return <div>


    <div>
      <Link href="."><a>Produtos</a></Link>
    </div>
    <h1>Texto Estatico</h1>
    {data.description}
  </div>

}

export default Sobre;