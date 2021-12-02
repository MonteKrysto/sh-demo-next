import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { Button, Container } from "@chakra-ui/react";
import { useMembers, fetchMembers } from "../../modules/members/hooks/useMembers";
import { DataTable, TableDropdown } from "../../component-lib/DataTable/dataTable";
import { DropDown } from "../../component-lib/DropDown/dropDown";
/**
 * A paginated view of all members in a table format.
 *
 * @returns {JSX.Element}
 */
const Members = () => {
  const [pageCount, setPageCount] = useState(1);
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useMembers({ page: pageCount, limit: 10 });

  /** A counter to keep track of the page we're on.
   * Since this is a mock demo and we are only using a fake API and have no way
   * to know how many pages there are, we have to do a bit of work to figure it out.
   */
  const recordsWeHaveSeen = data && data.members.length * pageCount;

  useEffect(() => {
    // We only need to trigger a prefecth when we scroll through the records, the previous page is stored in the cache.
    const nextPage = pageCount + 1;

    /**
     * I know there are 200 records in the fake API
     */
    if (data && recordsWeHaveSeen < 200) {
      //   // If there are more records to fetch, prefetch the next page.
      queryClient.prefetchQuery(["members", nextPage], () => fetchMembers({ page: nextPage, limit: 10 }));
    }
  }, [data, pageCount, queryClient, recordsWeHaveSeen]);

  // Set the pageCount to the next page so we can trigger the prefetch.
  const handleNext = () => {
    setPageCount(pageCount + 1);
  };

  //Set the pageCount to the previous page so we can trigger the prefetch.  This will load data from the cache.
  const handleBack = () => {
    setPageCount(pageCount - 1);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }
  console.log("data: ", data.members);
  return (
    <>
      <Button onClick={handleBack}>Back</Button>
      <Button
        onClick={handleNext}
        // disabled={isPreviousData || !data?.hasMore}
      >
        Next
      </Button>
      <Container maxW='container.md'>
        <DataTable
          data={data.members}
          caption='test table'
          defaultColumns={["firstname", "lastname", "email"]}
          linkColumns={{ field: "firstname", to: "id", route: "members" }}
        >
          <TableDropdown fieldToUse='columns' isMultiSelect />
        </DataTable>
      </Container>
      <DropDown
        onChange={val => console.log("val: ", val)}
        isMulti
        options={[
          { value: "blue", label: "Blue" },
          { value: "purple", label: "Purple" },
          { value: "red", label: "Red" },
          { value: "orange", label: "Orange" },
          { value: "yellow", label: "Yellow" },
          { value: "green", label: "Green" },
        ]}
        name='test'
        placeholder='test placeholder'
      />
    </>
  );
};

export default Members;
