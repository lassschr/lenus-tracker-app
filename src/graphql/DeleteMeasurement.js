import { gql } from "@apollo/client";

export default gql`
    mutation deleteMeasurement($id: Int!) {
        deleteMeasurement(id: $id) {
            id, weight, happiness, date_measured
        }
    }
`;