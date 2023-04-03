import { gql } from "@apollo/client";

export default createPlaceMutation = gql`
mutation createPlaceMutation($data: PlaceInput!){
  createPlace(data: $data){ 
    data {
      id
    }
  }
}
`;