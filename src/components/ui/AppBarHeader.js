import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Breadcrumbs } from "@material-ui/core";
import logo from "../../assets/appBarLogo.svg";
import Link from "@material-ui/core/Link";
import { configureAnchors } from "react-scrollable-anchor";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  logo: {
    height: "3.2rem",
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: theme.palette.common.lightGrey,
  },
  link: {
    display: "flex",
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.1rem",
  },
  separator: {
    color: "black",
  },
  breadcrumb: {
    marginLeft: "auto",
  },
  linkHover: {
    display: "inline-block",
    "text-decoration-line": "none",
    "text-decoration-style": "initial",
    "text-decoration-color": "initial",
    "text-decoration": "none",
    "transition-duration": "0.25s",
    "transition-timing-function": "cubic-bezier(0.645, 0.045, 0.355, 1)",
    "transition-delay": "initial",
    "transition-property": "all",
    cursor: "pointer",
    "&:hover, &:focus, &:active": {
      color: theme.palette.common.pink,
      "text-decoration": "none",
    },
  },
}));

export default function AppBarHeader() {
  const classes = useStyles();
  const theme = useTheme();
  configureAnchors({ offset: -theme.mixins.toolbar.minHeight - 10 });

  const linkProps = {
    color: "textPrimary",
    className: classes.link,
    classes: {
      underlineHover: classes.linkHover,
    },
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Link href="/#/">
            <img src={logo} className={classes.logo} alt="Website Logo" />
          </Link>
          <Breadcrumbs
            className={classes.breadcrumb}
            classes={{
              separator: classes.separator,
            }}
          >
            <Link href="/#/" {...linkProps}>
              Home
            </Link>
            <Link href="/#/create/poster" {...linkProps}>
              Posters
            </Link>
            <Link href="/#/create/trailer" {...linkProps}>
              Trailers
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </div>
  );
}
