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

export interface SetScoreProps {
  deployment: "dev" | "prod";
  label: string;
  title: string;
  players: string[];
  scores: number[];
}

export interface DeployLeaderboardDialogType {
  admin: string;
  label: string;
}

export interface DialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}
