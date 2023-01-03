import Link from "next/link";

import styled from "styled-components";

import { COLOR_SIDEBAR_ITEM_LINK, COLOR_SIDEBAR_ITEM_LINK_ACTIVE } from "_/consts";

const Navigation = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  gap: 1rem;
`;

export const NavigationTitle = styled.div`
  flex: 0 0 auto;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
`;

export const NavigationLinks = styled.div`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  gap: 2px;
`;

type NavigationLinkProps = {
  $active?: boolean;
};

export const NavigationLink = styled(Link)<NavigationLinkProps>(({ $active }) => ({
  flex: "0 0 auto",
  backgroundColor: $active ? COLOR_SIDEBAR_ITEM_LINK_ACTIVE : COLOR_SIDEBAR_ITEM_LINK,
  borderRadius: "0.5rem",
  flexFlow: "column",
  display: "flex",
  padding: "1rem",
  gap: "0.25rem",
  ...($active ? { fontWeight: 700 } : {}),
  "&:has(+ &)": {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  "& + &": {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
}));

export default Navigation;
