"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ModeToggle";

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

  if (isLoading) return <></>;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {appRoutes.map(({ name, url, protectedPage }) => {
          if (protectedPage) {
            return !!user ? (
              <NavigationMenuItem key={name}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={url}>{name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null;
          }
          return (
            <NavigationMenuItem key={name}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={url}>{name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}

        {!!user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={'/user/quotes/new'}>Add Quote</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/auth/logout">Log out</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/auth/login">Log in</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/auth/login?screen_hint=signup">Register</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}

        <NavigationMenuItem className="ml-2 flex items-center">
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
