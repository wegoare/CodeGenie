import { ShieldAlertIcon } from "lucide-react";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../components/ui/item";
import { Button } from "../../components/ui/button";

export const UnauthenticatedView = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-lg bg-muted">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <ShieldAlertIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Unauthorized Access</ItemTitle>
            <ItemDescription>
              {isSignedIn
                ? "Your session could not be verified. Please sign out and sign back in."
                : "You are not authorized to access this resource."}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            {isSignedIn ? (
              <SignOutButton>
                <Button variant="outline" size="sm">
                  Sign out
                </Button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            )}
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};