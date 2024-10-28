import { Category, Product } from "@/types";
import {
  QueryFunction,
  QueryKey,
  SkipToken,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

const getAllCategories = async (): Promise<Category[]> =>
  fetch("https://dummyjson.com/products/categories").then((res) => res.json());

export type GetAllPromiseProductReturn = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

/**
 * @requires Pakai useInfinity dari tanstack/reactquery
 */
const getAllProducts = ({
  limit = 10,
  category,
}: {
  limit?: number;
  category?: string;
}): Pick<
  UseInfiniteQueryOptions<
    GetAllPromiseProductReturn,
    Error,
    GetAllPromiseProductReturn,
    GetAllPromiseProductReturn,
    QueryKey,
    unknown
  >,
  "queryFn" | "getNextPageParam" | "queryKey"
> => {
  const queryKey: string[] = ["products"];
  if (!!category) queryKey.push(category);
  return {
    queryFn: async ({ pageParam }) => {
      const categoryUrl = category ? "/category/" + category : "";
      return fetch(
        `https://dummyjson.com/products${categoryUrl}?limit=${limit}&skip=${pageParam}`
      ).then((res) => res.json());
    },
    getNextPageParam(lastPage, all) {
      if (lastPage.limit < all[0].limit) return null;
      return lastPage.skip + lastPage.limit;
    },
    queryKey,
  };
};

const dummyjson = { getAllCategories, getAllProducts };
export default dummyjson;
