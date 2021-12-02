import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet, Router } from "react-location";
import { Box, ChakraProvider } from "@chakra-ui/react";
// import { location, routes } from "./router";
import { theme } from "../theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      {/* <Router routes={routes} location={location}> */}
      <QueryClientProvider client={queryClient}>
        <Box bg='tomato' w='100%' p={4} color='white'>
          This is the Box
        </Box>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* </Router> */}
    </ChakraProvider>
  );
}

export default MyApp;
