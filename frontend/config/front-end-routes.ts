import { UserProfileEnum } from "../enums/UserProfileEnum";


export const FrontEndRoutes = {
  DASHBOARD: {
    route: "/dashboard",
    profiles: [UserProfileEnum.DOCTOR, UserProfileEnum.RECEPTION]
  },
  CENSO: {
    IMPORT: {
      route: "/internacao/import",
      profiles: [UserProfileEnum.RECEPTION, UserProfileEnum.DOCTOR]
    }
  },
  UNAUTHORIZED: {
    route: "/unauthorized",
    profiles: ["*"]
  },
  LOGIN: {
    route: "/",
  },
  API:{
    CENSO:{
      IMPORT: {
        route: "/censo/import"
      }
    },
    INTERNACAO:{
      LIST: {
        route: "/internacoes/list"
      }
    }
  }
};
