import { gql } from "@apollo/client";

export default loginMutation = gql`
mutation loginMutation($input: UsersPermissionsLoginInput!){
  login(input: $input){
    jwt
  }
} 
`;