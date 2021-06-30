import { useEffect, useState } from "react";
import { axiosInstance } from "../../Services/ApiCalls";

export default function ItemDetails(props) {
  const { id } = props.match.params;
  const [product, setproduct] = useState(props);

  useEffect(() => {
    const getDetails = async () => {
      axiosInstance
        .get(`/products/${id}/`)
        .then((response) => {
          setproduct(response.data);
        })
        .catch((err) => console.log(err));
    };
    getDetails();
  }, []);

  return (
    <div>
      <h1>{product.id}</h1>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.image}></img>
    </div>
  );
}
