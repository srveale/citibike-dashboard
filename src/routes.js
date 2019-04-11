// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
import DeviceHub from "@material-ui/icons/DeviceHub";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import StationPage from "views/Station/Station.jsx";
import Maps from "views/Maps/Maps.jsx";
import TripCount from "views/TripCount/TripCount.jsx"


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
    icon: DeviceHub,
    component: StationPage,
    layout: "/admin"
  },
  // {
  //   path: "/trip-counts",
  //   name: "Trip Counts",
  //   icon: ThreeDRotation,
  //   component: TripCount,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
