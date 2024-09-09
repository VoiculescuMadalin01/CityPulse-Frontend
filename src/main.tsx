import React from "react"
import ReactDOM from "react-dom/client"
import "@/styles/globals.css"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "./store/contexts/AuthContext"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./store/contexts/ThemeProviderContext"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { toast } from "sonner"

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			if (query?.meta?.errorMessage) {
				toast.error("Error", {
					description: query.meta.errorMessage as string,
				})
			}
		},
	}),
})

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter basename='/'>
				<AuthProvider>
					<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
						<App />
					</ThemeProvider>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
)
