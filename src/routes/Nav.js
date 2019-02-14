import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-navi";
import { NaviBar } from "navi-bar";
import classNames from "classnames/bind";
import logo from "./logo.svg";
import styles from "./Nav.module.scss";
import { CloseOverlayContext } from "navi-bar/dist/commonjs/CloseOverlay";

const cx = classNames.bind(styles);

const OpenContext = React.createContext();

export const Nav = props => {
  let closeCurrentRef = React.useRef();

  return (
    <OpenContext.Provider value={closeCurrentRef}>
      <NaviBar
        routeMap={props.routeMap}
        tableOfContents={props.tableOfContents}
        renderSection={props => <SidebarSection {...props} />}
        renderPage={props => <SidebarPage {...props} />}
        renderHeading={props => <SidebarHeading {...props} />}
        render={({ children, open, toggleOpen }) => (
          <React.Fragment>
            <NaviBar.CloseOverlay />
            <div
              className={cx("Nav", { open }) + " " + props.className}
              style={props.style}
            >
              <PerfectScrollbar className={cx("Sidebar")}>
                <NavLink href={props.rootPathname} className={cx("brand")}>
                  <img src={logo} className={cx("logo")} alt="logo" />
                  <span className={cx("name")}>Navi</span>
                </NavLink>

                <nav>
                  {children}

                  <section className={cx("page")}>
                    <a
                      href="https://github.com/frontarm/navi"
                      className={cx("link", "github")}
                    >
                      <img
                        src={require("./github-icon.png")}
                        alt="GitHub icon"
                      />
                      GitHub &raquo;
                    </a>
                  </section>
                </nav>
              </PerfectScrollbar>
              <button className={cx("hamburger")} onClick={toggleOpen}>
                <div className={cx("icon")} />
              </button>
            </div>
          </React.Fragment>
        )}
      />
    </OpenContext.Provider>
  );
};

export const SidebarSection = props => {
  let { active, children, data } = props;
  let closeCurrentRef = React.useContext(CloseOverlayContext);
  function closeOpen() {
    setOpen(false);
  }
  function toggleOpen() {
    if (open) {
      closeOpen();
      closeCurrentRef.current = null;
    } else {
      let currentCloseOpen = closeCurrentRef.current;
      if (currentCloseOpen && currentCloseOpen !== closeOpen) {
        currentCloseOpen();
      }
      closeCurrentRef.current = closeOpen;
      setOpen(true);
    }
  }
  let [open, setOpen] = React.useState(() => {
    if (active) {
      closeCurrentRef.current = closeOpen;
    }
    return active;
  });
  if (!data.sectionTitle) {
    open = true;
  }
  return (
    <section className={cx("section", { active, open, closed: !open })}>
      {data.sectionTitle && (
        <button className={cx("heading")} onClick={toggleOpen} type="button">
          {data.sectionTitle}
          <span className={cx("toggle")}>
            <Arrow />
          </span>
        </button>
      )}
      <div className={cx("children")}>{children}</div>
    </section>
  );
};

export const SidebarPage = ({ active, children, data, title }) => (
  <section className={cx("page", { active })}>
    <div className={cx("highlight")} />
    {data.exclusiveTo ? <span className={cx("pro")}>PRO</span> : null}
    <NaviBar.Anchor className={cx("link")}>
      {data.navTitle || title}
    </NaviBar.Anchor>
    {children && data.navTableOfContents !== null && (
      <div className={cx("children")}>{children}</div>
    )}
  </section>
);

export const SidebarHeading = ({
  active,
  descendantActive,
  children,
  title
}) => (
  <section className={cx("heading", { active: active || descendantActive })}>
    <NaviBar.Anchor className={cx("link")}>{title}</NaviBar.Anchor>
  </section>
);

// Pulled from React documentation.
export const Arrow = () => (
  <svg
    viewBox="0 0 926.23699 573.74994"
    version="1.1"
    x="0px"
    y="0px"
    width="10"
    height="10"
  >
    <g transform="translate(904.92214,-879.1482)">
      <path
        d="
  m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,
  -55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,
  0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,
  -174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,
  -174.68583 0.6895,0 26.281,25.03215 56.8701,
  55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864
  -231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,
  -104.0616 -231.873,-231.248 z
  "
        fill="currentColor"
      />
    </g>
  </svg>
);
