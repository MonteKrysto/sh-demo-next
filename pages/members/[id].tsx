import React from "react";
import { Box, Center, Container, Flex, Spacer } from "@chakra-ui/react";
import { useMembers, useMember } from "../../modules/members/hooks/useMembers";

const Member: React.FC = () => {
  const { data, isFetching, isError } = useMember();

  /** This block is to show we can still use the members data, which is cached,
   * so we don't have to re-fetch it.
   */
  const { data: membersData } = useMembers();

  membersData && console.log("name", membersData);
  /************ */

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error:</div>;
  }
  console.log("data: ", data);
  return (
    <Container maxW='container.lg'>
      <Flex direction='row'>
        <Box>
          <Box w='md' borderWidth='1px' borderRadius='sm' overflow='hidden'>
            <Box as='h1' mt='1' fontWeight='semibold' borderBottom='1px'>
              {data.member.firstname}
            </Box>
          </Box>
        </Box>
        <Spacer />
        <Box>
          <Box w='md' borderWidth='1px' borderRadius='sm' overflow='hidden'>
            <Box as='h1' mt='1' fontWeight='semibold' borderBottom='1px'>
              {data.member.lastname}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Member;
