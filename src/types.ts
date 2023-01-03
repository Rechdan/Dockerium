import { Project, Team } from "@prisma/client";

export type ApiError = {
  type: "error";
  messages: string[];
  interceptable?: boolean;
};

export type AccountAuthResponse =
  | ApiError
  | {
      type: "success";
    };

export type AccountLoginResponse =
  | ApiError
  | {
      type: "success";
    };

export type AccountSidebarResponse =
  | ApiError
  | {
      type: "success";
      account: {
        id: string;
        isAdmin: boolean;
        name: string;
      };
      projects: Project[];
      teams: Team[];
    };

export type AccountDashboardResponse =
  | ApiError
  | {
      type: "success";
      projects: {
        id: string;
        name: string;
        accounts: {
          account: {
            id: string;
            name: string;
          };
        }[];
      }[];
      teams: {
        id: string;
        name: string;
        members: {
          account: {
            id: string;
            name: string;
          };
        }[];
        projects: {
          project: {
            id: string;
            name: string;
          };
        }[];
      }[];
    };
