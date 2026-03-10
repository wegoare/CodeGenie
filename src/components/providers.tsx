// 'use client'

// import { ReactNode } from 'react'
// import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
// import { ConvexProviderWithClerk } from 'convex/react-clerk'
// import { ClerkProvider, SignInButton, SignOutButton, useAuth, UserButton } from '@clerk/nextjs'
// import { ThemeProvider } from '@/components/Theme-provider'

// if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
//   throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
// }

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

// export default function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider>
//     <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//             <Authenticated>
//               <UserButton/>
//             </Authenticated>
//             <Unauthenticated>
//               <SignInButton/>
//               <SignOutButton/>
//               <AuthLoading>
//                 auth loading..
//               </AuthLoading>
//               {children}
//             </Unauthenticated>
            
      
//     </ConvexProviderWithClerk>
//     </ClerkProvider>
//   )
// }

'use client'

import { ReactNode } from 'react'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, SignInButton, useAuth, UserButton } from '@clerk/nextjs'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>

        <AuthLoading>
          <p>Auth loading...</p>
        </AuthLoading>

        <Unauthenticated>
          <div className="p-4">
            <SignInButton />
          </div>
        </Unauthenticated>

        <Authenticated>
          <div className="p-4 flex justify-end">
            <UserButton />
          </div>

          {children}
        </Authenticated>

      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}