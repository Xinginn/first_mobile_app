import { gql } from "@apollo/client";

export default updatePlaceMutation = gql`
mutation updatePlaceMutation($id: ID!, $data: PlaceInput!){
  updatePlace(id: $id, data: $data){ 
    data {
      id
    }
  }
}
`;