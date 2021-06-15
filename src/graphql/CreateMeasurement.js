import { gql } from "@apollo/client";

export default gql`
    mutation createMeasurement($weight: Int!, $date_measured: Int!, $happiness: Int!) {
        createMeasurement(weight: $weight, date_measured: $date_measured, happiness: $happiness) {
            id, weight, happiness, date_measured
        }
    }
`;