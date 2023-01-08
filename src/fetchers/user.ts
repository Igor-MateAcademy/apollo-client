import { useMutation, useQuery } from '@apollo/client';

import { User } from 'models';

import { GET_USERS, CREATE_USER, DELETE_USER, GET_USER, UPDATE_USER } from 'graphql';

export const useUsers = () => useQuery(GET_USERS);

export const useCreateUser = () => useMutation(CREATE_USER);

export const useDeleteUser = () => useMutation(DELETE_USER);

export const useGetUser = ({ ...rest }) => useQuery(GET_USER, rest);

export const useUpdateUser = () => useMutation(UPDATE_USER);
