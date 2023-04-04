import { gql } from "@apollo/client";

export default placesQuery = gql`
query placesQuery {
  places(pagination: {limit:-1}) {
    data {
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