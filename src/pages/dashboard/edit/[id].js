import FormProduct from "@components/FormProducts";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "@services/api";

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    if (router.isReady) {
      var { id } = router.query; //traigo el id que me da router
      getProduct(id);
    }
  }, [router?.isReady]); //quedo escuchando router, para ver cuando carga

  return <FormProduct product={product} />;
}
