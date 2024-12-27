export interface LayoutContextType {
  label: string;
  setLabel: (label: string) => void;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface DeployLeaderboardProps {
  deployment: "dev" | "prod";
  admin: string;
  label: string;
}

export interface CreateLeaderboardProps {
  deployment: "dev" | "prod";
  label: string;
  title: string;
}

export interface AddAdminProps {
  deployment: "dev" | "prod";
  label: string;
  newAdmin: string;
}

export interface GetAdminProps {
  deployment: "dev" | "prod";
  label: string;
}

export interface SetScoreProps {
  deployment: "dev" | "prod";
  label: string;
  title: string;
  players: string;
  scores: number;
}

export interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRefetchAdmin: boolean;
  setIsRefetchAdmin: (isRefetchAdmin: boolean) => void;
}

export interface AddPlayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isRefetchPlayers: boolean;
  setIsRefetchPlayers: (isRefetchPlayers: boolean) => void;
}

export interface AdminDialogType {
  newAdmin: string;
}

export interface PlayersDialogType {
  players: string;
  scores: number;
}

export interface DialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}
