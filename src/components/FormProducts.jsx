import { useRef } from "react";
import { useForm } from "react-hook-form";
import { createProductSchema } from "schemas/productSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { addProduct, editProduct } from "@services/api/products";

export default function FormProduct({ product, setOpen, setAlert }) {
  if (product?.category?.id || setOpen) {
    const formRef = useRef(null);

    const onSubmit = (data) => {
      const formData = {
        title: data.title,
        price: parseInt(data.price),
        description: data.description,
        categoryId: parseInt(data.category),
        // images: [data.images[0].name],
        images: ["https://api.lorem.space/image/watch?w=640&h=480&r=4197", "https://api.lorem.space/image/watch?w=640&h=480&r=9379", "https://api.lorem.space/image/watch?w=640&h=480&r=7934"],
      };
      // console.log("formData: ", formData);
      if (product) {
        console.log(formData);
        editProduct(product.id, formData)
          .then((response) => {
            console.log("response: ", response);
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: error.message,
              type: "error",
              autoClose: true,
            });
          });
      } else {
        addProduct(formData)
          .then((response) => {
            console.log("response: ", response);
            setOpen(false);
            setAlert({
              active: true,
              message: "Product added successfully",
              type: "success",
              autoClose: true,
            });
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: error.message,
              type: "error",
              autoClose: true,
            });
          });
      }
    };
    const defaultProduct = {
      title: product?.title || "",
      price: product?.price || 0,
      category: product?.category?.id,
      description: product?.description || "",
      images: ["https://placeimg.com/640/480/any"],
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: defaultProduct,
      resolver: joiResolver(createProductSchema),
    });

    return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full 
                shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.title && "border-red-300"}`}
                  {...register("title")}
                />
                {<p className="text-red-600"> {errors.title?.message} </p>}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="price" className={`block text-sm font-medium text-gray-700`}>
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full 
                  shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.price && "border-red-300"}`}
                  {...register("price")}
                />
                {<p className="text-red-600"> {errors.price?.message} </p>}
              </div>
              <div className="col-span-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white
                  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 sm:text-sm ${errors.category && "border-red-300"}`}
                  {...register("category")}
                  defaultValue={product?.category?.id}
                >
                  <option value="1">Clothes</option>
                  <option value="2">Electronics</option>
                  <option value="3">Furniture</option>
                  <option value="4">Toys</option>
                  <option value="5">Others</option>
                </select>
                {<p className="text-red-600"> {errors.category?.message} </p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  rows="3"
                  className={`form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500
                  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300
                  rounded-md ${errors.description && "border-red-300"}`}
                  {...register("description")}
                />
                {<p className="text-red-600"> {errors.description?.message} </p>}
              </div>
              <div className="col-span-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700">Cover photo</div>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2
                    border-gray-300 border-dashed rounded-md ${errors.images && "border-red-300"}`}
                  >
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="images" name="images" type="file" className="sr-only" {...register("images")} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {<p className="text-red-600"> {errors.images?.message} </p>}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return <div>Loading...</div>;
  }
}
