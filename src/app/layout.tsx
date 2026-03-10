// 'use client'

// import { ReactNode } from 'react'
// import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
// import { ConvexProviderWithClerk } from 'convex/react-clerk'
// import { ClerkProvider, SignInButton, useAuth, UserButton } from '@clerk/nextjs'
// import { ThemeProvider } from '@/components/Theme-provider'

// if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
//   throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
// }

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

// export default function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider>
//       <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           disableTransitionOnChange
//         >

//           <AuthLoading>
//             <p>Auth loading...</p>
//           </AuthLoading>

//           <Unauthenticated>
//             <SignInButton />
//           </Unauthenticated>

//           <Authenticated>
//             <div className="p-4 flex justify-end">
//               <UserButton />
//             </div>

//             {children}
//           </Authenticated>

//         </ThemeProvider>
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   )
// }

import ConvexClientProvider from "../components/providers"
import { ThemeProvider } from "@/components/Theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </ThemeProvider>

      </body>
    </html>
  )
}