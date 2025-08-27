export type LinkMenu = {
  name: string;
  type: "link";
  path: string;
};

export type Menu = {
  name: string;
  type: "link" | "button";
  path?: string;
  onClick?: () => void;
};
