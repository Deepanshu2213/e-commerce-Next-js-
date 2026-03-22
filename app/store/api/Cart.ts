import { paymentInfo } from '@/app/api/paymentDetails/route';
import { CartItemsDb, ProductItem } from '@/app/components/CartItem';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface CartUpdate {
  ProductItem: ProductItem;
}
interface ResponseList<T> {
  data: T[];
}
export const CartApi = createApi({
  reducerPath: 'Cart',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api',
  }),
  tagTypes: ['cart'],
  endpoints: (builder) => {
    return {
      getCart: builder.query<ResponseList<CartItemsDb>, void>({
        query: () => {
          return {
            method: 'GET',
            url: '/cart',
          };
        },
      }),
      getPrice: builder.query<paymentInfo, void>({
        providesTags: (result) => {
          return [{ type: 'cart' }];
        },
        query: () => {
          return {
            url: '/paymentDetails',
            method: 'GET',
          };
        },
      }),
      updateCart: builder.mutation<CartItemsDb, CartUpdate>({
        invalidatesTags: () => {
          return [{ type: 'cart' }];
        },
        query: (payload) => {
          return {
            url: '/cart',
            method: 'POST',
            body: payload,
          };
        },
      }),
    };
  },
});

export const { useGetCartQuery, useGetPriceQuery, useUpdateCartMutation } =
  CartApi;
