import { gql } from "@apollo/client";

export default deletePlaceMutation = gql`
mutation deletePlaceMutation($id: ID!){
  deletePlace(id: $id){ 
    data{
      id
    }
  }
}
`;