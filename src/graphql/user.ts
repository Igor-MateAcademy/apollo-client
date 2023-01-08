import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers($q: String) {
    data: allUsers(filter: { q: $q }) {
      id
      firstName
      lastName
      coords
      isFavorite
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $coords: JSON!, $isFavorite: Boolean!) {
    createUser(firstName: $firstName, lastName: $lastName, coords: $coords, isFavorite: $isFavorite) {
      firstName
      lastName
      coords
      isFavorite
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      coords
      isFavorite
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $firstName: String, $lastName: String, $coords: JSON, $isFavorite: Boolean) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, coords: $coords, isFavorite: $isFavorite) {
      id
      firstName
      lastName
      coords
      isFavorite
    }
  }
`;
