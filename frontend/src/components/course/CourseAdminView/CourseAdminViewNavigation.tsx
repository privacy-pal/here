import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Link,
  Typography,
} from "@mui/material";
import { capitalizeFirstLetter } from "@util/shared/string";
import { usePendingSwaps } from "api/swaps/hooks";
import { View } from "model/general";
import { CoursePermission } from "model/user";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Logo from "@components/shared/Logo";
import NextLink from "next/link";

interface CourseAdminViewNavigationProps {
  access: CoursePermission;
}

export default function CourseAdminViewNavigation({ access }: CourseAdminViewNavigationProps) {
  const router = useRouter();
  const { query } = router;
  const [pendingRequests, _] = usePendingSwaps(query.courseID as string);
  const [open, toggleOpen] = useState(false);

  function navigateTo(view: View) {
    return router.push(`${router.query.courseID}?view=${view}`, undefined, { shallow: true });
  }

  function getNavigationButton(view: View, toggleDrawer?: () => void) {
    return (
      <Button
        sx={{
          flexDirection: "row",
          justifyContent: "flex-start",
          fontWeight: query.view === view ? 700 : 400,
        }}
        color={query.view === view ? "inherit" : "secondary"}
        variant="text"
        onClick={() => {
          if (toggleDrawer) toggleDrawer();
          navigateTo(view);
        }}
      >
        {capitalizeFirstLetter(view)}
      </Button>
    );
  }

  return (
    <>
      <IconButton
        sx={{
          mr: 2,
          display: {
            position: "fixed",
            xs: "block",
            md: "none",
          },
        }}
        onClick={() => toggleOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => toggleOpen(false)}>
        <Box
          sx={{
            width: "max-content",
          }}
        >
          {/* <Stack flexDirection="row" alignItems="center" px={4} py={2}>
            <Box mr={1} width={30} height={30}>
              <Logo />
            </Box>
            <Typography variant="h6">Here</Typography>
          </Stack> */}

          <Stack flexDirection="row" alignItems="center" px={4} py={2}>
            <NextLink href="/">
              <Link
                variant="h6"
                component="button"
                color="inherit"
                underline="hover"
                sx={{ display: "inline-flex", alignItems: "center" }}
              >
                <Box mr={1} width={30} height={30}>
                  <Logo />
                </Box>
                Here
              </Link>
            </NextLink>
          </Stack>

          <Divider />

          <Stack alignItems="start" px={4}>
            {getNavigationButton("sections", () => toggleOpen(false))}
            {getNavigationButton("assignments", () => toggleOpen(false))}
            {getNavigationButton("people", () => toggleOpen(false))}
            {pendingRequests && pendingRequests.length > 0 ? (
              <Badge
                color="primary"
                badgeContent={pendingRequests.length}
                sx={{
                  "& .MuiBadge-badge": {
                    right: -10,
                    top: "50%",
                  },
                }}
              >
                {getNavigationButton("requests", () => toggleOpen(false))}
              </Badge>
            ) : (
              getNavigationButton("requests", () => toggleOpen(false))
            )}
            {access === CoursePermission.CourseAdmin && getNavigationButton("settings", () => toggleOpen(false))}
          </Stack>
        </Box>
      </Drawer>
      <Stack
        alignItems="start"
        sx={{
          position: "fixed",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        {getNavigationButton("sections")}
        {getNavigationButton("assignments")}
        {getNavigationButton("people")}
        {pendingRequests && pendingRequests.length > 0 ? (
          <Badge
            color="primary"
            badgeContent={pendingRequests.length}
            sx={{
              "& .MuiBadge-badge": {
                right: -10,
                top: "50%",
              },
            }}
          >
            {getNavigationButton("requests")}
          </Badge>
        ) : (
          getNavigationButton("requests")
        )}
        {access === CoursePermission.CourseAdmin && getNavigationButton("settings")}
      </Stack>
    </>
  );
}
