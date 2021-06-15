import { gql } from "@apollo/client";

export default gql`
    query measurements {
        measurements {
            id, weight, happiness, date_measured
        }
    }
`;