import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './services/auth';
import { UserRegistrationStateEnum, UserRoleEnum } from './api-client';

export enum AuthRouteLoginAccess {
  LoggedIn,
  NotLoggedIn,
  GuestAllowed // both logged in and not logged in are allowed
}

export enum AuthRouteInitialPasswordAccess {
  Created,
  NotCreated
}

export const AuthRoute = ({
  AuthLoginAccess = AuthRouteLoginAccess.NotLoggedIn,
  AuthInitialPasswordAccess = AuthRouteInitialPasswordAccess.Created,
  AuthRoleAccess = undefined,
  AuthRegistrationState = UserRegistrationStateEnum.Approved,
  children
}: {
  AuthLoginAccess?: AuthRouteLoginAccess;
  AuthInitialPasswordAccess?: AuthRouteInitialPasswordAccess;
  AuthRoleAccess?: UserRoleEnum;
  AuthRegistrationState?: UserRegistrationStateEnum;
  children: ReactNode;
}) => {
  const user = useAuthStore((state) => state.user);
  const guestToken = useAuthStore((state) => state.guestToken);

  // handle login access guard
  if (AuthLoginAccess === AuthRouteLoginAccess.LoggedIn && !user) {
    return <Navigate to="/first-signup" replace />;
  }
  if (AuthLoginAccess === AuthRouteLoginAccess.NotLoggedIn && (user || guestToken)) {
    return <Navigate to={getDefaultUserPage()} replace />;
  }

  if (user) {
    // handle user role guard
    if (AuthRoleAccess && AuthRoleAccess !== user.role) {
      return <Navigate to={getDefaultUserPage()} replace />;
    }

    // handle user registration state guard
    if (AuthRegistrationState === UserRegistrationStateEnum.Approved) {
      if (user.registrationState === UserRegistrationStateEnum.Pending) {
        return <Navigate to="/processing-user" replace />;
      }
      if (user.registrationState === UserRegistrationStateEnum.Rejected) {
        return <Navigate to="/logout" replace />;
      }
    } else if (AuthRegistrationState !== user.registrationState) {
      return <Navigate to={getDefaultUserPage()} replace />;
    }

    if (user.registrationState === UserRegistrationStateEnum.Approved) {
      // handle initial password guard
      // eslint-disable-next-line
      if (AuthInitialPasswordAccess === AuthRouteInitialPasswordAccess.Created && user.isInitialPassword) {
        return <Navigate to="/create-password" replace />;
      }
      // eslint-disable-next-line
      if (AuthInitialPasswordAccess === AuthRouteInitialPasswordAccess.NotCreated && !user.isInitialPassword) {
        return <Navigate to={getDefaultUserPage()} replace />;
      }
    }
  }

  function getDefaultUserPage(): string {
    if (!user && guestToken) {
      return '/passenger';
    }

    switch (user?.role) {
      case UserRoleEnum.Admin:
        return '/backoffice';
      case UserRoleEnum.Driver:
        return '/driver';
      case UserRoleEnum.Requester:
        return '/passenger';
      default:
        return '';
    }
  }

  return children;
};

export default AuthRoute;
