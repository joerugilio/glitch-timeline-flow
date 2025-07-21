
export interface SiteConfig {
  site: {
    title: string;
    description: string;
  };
  navigation: {
    brand: string;
    items: NavigationItem[];
  };
}

export interface NavigationItem {
  href: string;
  label: string;
  icon: string;
}
