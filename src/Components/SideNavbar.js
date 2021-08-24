import './Style.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import insertIcon from '../assets/img/insert.svg';
import searchIcon from '../assets/img/search.svg';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import axios from "axios";
import {useEffect, useState} from "react";


function SideNavbar(props) {

    return (
        <div className="record">
            <SideNav
                className={"sidenav"}
                onSelect={(selected) => {
                    props.setCurrentPage(selected);
                }}
                onToggle={(expanded) => {
                    props.setExpanded(expanded)
                }}

            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="insert">
                    <NavItem eventKey="insert">
                        <NavIcon>
                            <div className="sidenav-icon"
                                 style={{
                                     fontSize: '1.75em',
                                     backgroundImage: `url(${insertIcon})`
                                 }} />
                        </NavIcon>
                        <NavText>
                            插入数据
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="search">
                        <NavIcon>
                            <div
                                className="sidenav-icon"
                                style={{
                                    fontSize: '1.75em',
                                    backgroundImage: `url(${searchIcon})`
                                }} />
                        </NavIcon>
                        <NavText>
                            数据查询
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default SideNavbar;
