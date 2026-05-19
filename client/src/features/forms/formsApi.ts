import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Form, ResponsePayload, FormResponse } from "./types";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  }),
  tagTypes: ["Form", "Response"],
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => "/forms",
      providesTags: ["Form"],
    }),
    getFormById: builder.query<Form, string>({
      query: (id) => `/forms/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Form", id }],
    }),
    createForm: builder.mutation<Form, Omit<Form, "id">>({
      query: (newForm) => ({
        url: "/forms",
        method: "POST",
        body: newForm,
      }),
      invalidatesTags: ["Form"],
    }),
    deleteForm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/forms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Form"],
    }),
    submitResponse: builder.mutation<void, ResponsePayload>({
      query: (response) => ({
        url: `/forms/${response.formId}/responses`,
        method: "POST",
        body: response,
      }),
      invalidatesTags: ["Response"],
    }),
    getResponses: builder.query<FormResponse[], string>({
      query: (formId) => `/forms/${formId}/responses`,
      providesTags: ["Response"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useGetResponsesQuery,
  useSubmitResponseMutation,
} = formsApi;
