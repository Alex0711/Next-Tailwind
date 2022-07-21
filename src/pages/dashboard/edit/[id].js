import FormProduct from "@components/FormProducts";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "@services/api";
import useAlert from "@hooks/useAlert";

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    if (router.isReady) {
      var { id } = router.query; //traigo el id que me da router
      getProduct(id);
    }
  }, [router?.isReady, router.query]); //quedo escuchando router, para ver cuando carga

  return product.category ? <FormProduct product={product} alert={alert} setAlert={setAlert} /> : <div>Loading</div>;
}
