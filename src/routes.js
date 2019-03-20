// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import StationPage from "views/Station/Station.jsx";
import Maps from "views/Maps/Maps.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/station",
    name: "Station",
    rtlName: "خرائط",
    icon: LocationOn,
    component: StationPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
