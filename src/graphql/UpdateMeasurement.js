import { gql } from "@apollo/client";

export default gql`
    mutation updateMeasurement($id: Int!, $weight: Int, $date_measured: Int, $happiness: Int) {
        updateMeasurement(id: $id, weight: $weight, date_measured: $date_measured, happiness: $happiness) {
            id, weight, happiness, date_measured
        }
    }
`;