import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import { useThemeStore } from "./store/themeStore";
import { useDashboardStore } from "./store/dashboardStore";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    console.log('Theme changed to:', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <DashboardPage />;
}
