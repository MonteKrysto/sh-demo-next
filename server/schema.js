import { useColorModeValue } from "@chakra-ui/color-mode";
import { gql } from "apollo-server-express";
import memberModel from "./models/MemberModel.js";
import conditionModel from "./models/conditionModel.js";
import modalityModel from "./models/modalityModel.js";
import specialtyModel from "./models/specialtyModel.js";
import licenseModel from "./models/licenseModel.js";
import { paginatedResults } from "./utils.js";

export const typeDefs = gql`
  type Condition {
    id: ID!
    type: String!
  }

  type Specialty {
    id: ID!
    type: String!
  }

  type License {
    id: ID!
    type: String!
  }

  type Modality {
    id: ID!
    type: String!
  }

  type Member {
    id: ID!
    firstname: String!
    lastname: String!
    memberName: String!
    email: String!
    previsit: String!
    verified: String!
    created: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    dob: String!
    age: Int!
    practiceLocation: String!
    signedUp: String!
    customer: String!
    zoomUrl: String!
    schedulingUrl: String!
    calendarId: ID!
    role: String!
    moreInfo: String!
    conditions: [Condition]
    modalities: [Modality]
    specialties: [Specialty]
    licenses: [License]
  }

  # type PaginatedMember {
  #   members: [Member]!
  #   cursor: String!
  #   hasMore: Boolean!
  # }
  type PaginatedMember {
    members: [Member]!
    totalCount: Int!
  }

  type Query {
    members(page: Int, limit: Int): [Member] #PaginatedMember
    member(id: ID!): Member
    conditions: [Condition]
    condition(id: ID!): Condition
    licenses: [License]
    license(id: ID!): License
    specialties: [Specialty]
    specialty(id: ID!): Specialty
    modalities: [Modality]
    modality(id: ID!): Modality
  }
`;

export const resolvers = {
  Query: {
    members: async (_, args) => {
      const { page, limit = 0 } = args;

      return await memberModel.list(page, limit);
    },
    member(_, { id }) {
      return memberModel.find(id);
    },
    conditions() {
      return conditionModel.list();
    },
    condition(_, { id }) {
      return conditionModel.find(id);
    },
    specialties() {
      return specialtyModel.list();
    },
    specialty(_, { id }) {
      return specialtyModel.find(id);
    },
    licenses() {
      return licenseModel.list();
    },
    license(_, { id }) {
      return licenseModel.find(id);
    },
    modalities() {
      return modalityModel.list();
    },
    modality(_, { id }) {
      return modalityModel.find(id);
    },
  },
  Member: {
    conditions(source) {
      if (!source.conditions || !source.conditions.length) {
        return;
      }

      return Promise.all(source.conditions.map(({ id }) => conditionModel.find(id)));
    },
    modalities(source) {
      if (!source.modalities || !source.modalities.length) {
        return;
      }

      return Promise.all(source.modalities.map(({ id }) => modalityModel.find(id)));
    },
    specialties(source) {
      if (!source.specialties || !source.specialties.length) {
        return;
      }

      return Promise.all(source.specialties.map(({ id }) => specialtyModel.find(id)));
    },
    licenses(source) {
      if (!source.licenses || !source.licenses.length) {
        return;
      }

      return Promise.all(source.licenses.map(({ id }) => licenseModel.find(id)));
    },
  },
};
