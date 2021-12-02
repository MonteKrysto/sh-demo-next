import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { request, gql } from "graphql-request";
import { endPoint } from "../../../constants";

const GET_MEMBERS = gql`
  query ($page: Int, $limit: Int) {
    members(page: $page, limit: $limit) {
      id
      firstname
      lastname
      memberName
      previsit
      verified
      created
      email
      zoomUrl
      schedulingUrl
      role
      moreInfo
      conditions {
        type
      }
      modalities {
        id
        type
      }
      specialties {
        id
        type
      }
      licenses {
        id
        type
      }
    }
  }
`;

const GET_MEMBER = gql`
  query ($id: ID!) {
    member(id: $id) {
      id
      firstname
      lastname
      memberName
      previsit
      verified
      created
      email
      zoomUrl
      schedulingUrl
      role
      moreInfo
      conditions {
        type
      }
      modalities {
        id
        type
      }
      specialties {
        type
      }
      licenses {
        id
        type
      }
    }
  }
`;

const fetchMembers = async (variables: { page: number; limit: number }) =>
  await request(endPoint, GET_MEMBERS, variables);

const useMembers = (variables = { page: 1, limit: 10 }, config = {}) => {
  return useQuery(["members", variables.page], () => fetchMembers(variables), {
    keepPreviousData: true,
    staleTime: 55000,
    refetchOnWindowFocus: false,
  });
};

const useMember = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchMember = async (variables = {}, config = {}) => await request(endPoint, GET_MEMBER, { id: id }, config);

  return useQuery(["member", id], fetchMember, { staleTime: 50000 });
};

export { useMembers, useMember, fetchMembers };
