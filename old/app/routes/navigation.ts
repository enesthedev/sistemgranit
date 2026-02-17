import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconPackage,
  IconReport,
  IconSearch,
  IconSettings,
  type Icon,
} from "@tabler/icons-react";
import { ROUTES } from "./config";

export type NavItem = {
  title: string;
  titleKey?: string;
  url: string;
  icon?: Icon;
  isActive?: boolean;
  items?: { title: string; titleKey?: string; url: string }[];
};

export type DocumentItem = {
  name: string;
  nameKey?: string;
  url: string;
  icon: Icon;
};

export const mainNavigation: NavItem[] = [
  {
    title: "İstatistikler",
    titleKey: "nav.statistics",
    url: ROUTES.DASHBOARD,
    icon: IconReport,
  },
  {
    title: "Ürünler",
    titleKey: "nav.products",
    url: ROUTES.PRODUCTS.LIST,
    icon: IconPackage,
  },
  {
    title: "Kategoriler",
    titleKey: "nav.categories",
    url: ROUTES.CATEGORIES.LIST,
    icon: IconDatabase, // IconDatabase kullanabiliriz veya başka bir ikon
  },
];

export const cloudNavigation: NavItem[] = [
  {
    title: "Capture",
    titleKey: "nav.capture",
    icon: IconCamera,
    isActive: true,
    url: "#",
    items: [
      { title: "Active Proposals", titleKey: "nav.activeProposals", url: "#" },
      { title: "Archived", titleKey: "nav.archived", url: "#" },
    ],
  },
  {
    title: "Proposal",
    titleKey: "nav.proposal",
    icon: IconFileDescription,
    url: "#",
    items: [
      { title: "Active Proposals", titleKey: "nav.activeProposals", url: "#" },
      { title: "Archived", titleKey: "nav.archived", url: "#" },
    ],
  },
  {
    title: "Prompts",
    titleKey: "nav.prompts",
    icon: IconFileAi,
    url: "#",
    items: [
      { title: "Active Proposals", titleKey: "nav.activeProposals", url: "#" },
      { title: "Archived", titleKey: "nav.archived", url: "#" },
    ],
  },
];

export const secondaryNavigation: NavItem[] = [
  {
    title: "Settings",
    titleKey: "nav.settings",
    url: ROUTES.SETTINGS,
    icon: IconSettings,
  },
  {
    title: "Get Help",
    titleKey: "nav.getHelp",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Search",
    titleKey: "nav.search",
    url: "#",
    icon: IconSearch,
  },
];

export const documentNavigation: DocumentItem[] = [
  {
    name: "Data Library",
    nameKey: "nav.dataLibrary",
    url: ROUTES.DOCUMENTS.DATA_LIBRARY,
    icon: IconDatabase,
  },
  {
    name: "Reports",
    nameKey: "nav.reports",
    url: ROUTES.DOCUMENTS.REPORTS,
    icon: IconReport,
  },
  {
    name: "Word Assistant",
    nameKey: "nav.wordAssistant",
    url: ROUTES.DOCUMENTS.WORD_ASSISTANT,
    icon: IconFileWord,
  },
];
