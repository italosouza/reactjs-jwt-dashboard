// @material-ui/icons
import Person from "@material-ui/icons/Person"
import Unarchive from "@material-ui/icons/Unarchive"

// views
import UserRouter from "views/User/UserRouter"
import Profile from "views/Profile/Profile"

const dashboardRoutes = [
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: Person,
    component: UserRouter
  },
  {
    path: "/profile",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Unarchive,
    component: Profile
  },
  { redirect: true, path: "/", to: "/users", navbarName: "Redirect" }
]

export default dashboardRoutes
