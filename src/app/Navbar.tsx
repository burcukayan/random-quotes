"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const appRoutes = [
  {
    name: "Home",
    url: "/",
    protectedPage: false,
  },
  {
    name: "My Liked Quotes",
    url: "/user/quotes/liked",
    protectedPage: true,
  },
];

export function TopNav() {
  const { user, isLoading } = useUser();
  console.log("user", user);

  if (isLoading) return <></>;

  return (
    <div className="w-full flex justify-start pl-12 md:pl-24 py-4">
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2 flex-wrap">
        {appRoutes.map(({ name, url, protectedPage }) => {
          if (protectedPage) {
            return !!user ? (
              <NavigationMenuItem key={name}>
                <NavigationMenuLink asChild className="">
                  <Button variant="nav-hover" asChild>
                    <Link href={url}>{name}</Link>
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
            ) : null;
            
          }
          return (
            <NavigationMenuItem key={name}>
              <NavigationMenuLink asChild className="">
                <Button variant="nav-hover" asChild>
                  <Link href={url}>{name}</Link>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}

        {!!user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="">
                <Button variant="nav-hover" asChild>
                  <Link href={"/user/quotes/new"}>Add Quote</Link>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="">
                <Button variant="nav-hover" asChild>
                  <a href="/auth/logout">Log out</a>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="">
                <Button variant="nav-hover" asChild>
                  <a href="/auth/login">Log in</a>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="">
                <Button variant="nav-hover" asChild>
                  <a href="/auth/login?screen_hint=signup">Register</a>
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  );
  
}
