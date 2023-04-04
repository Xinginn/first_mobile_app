import { gql } from "@apollo/client";

export default placeQuery = gql`
query placeQuery($id: ID!) {
  place(id: $id){
    data{
      id
      attributes{
        title
        address
        latitude
        longitude
      }
    }
  }
}
`;