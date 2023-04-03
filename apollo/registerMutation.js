import { gql } from "@apollo/client";

export default registerMutation = gql`
mutation registerMutation($input: UsersPermissionsRegisterInput!){
  register(input: $input){ 
  	jwt
    user{ 
    	id
    }
  }
}
`;