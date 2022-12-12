import { Link, Navigate, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar(props) {
    const { loginModal, setLoginModal } = props;

    const handleLoginClick = () => {
        setLoginModal(!loginModal)
    }
    
    const handleLogoutClick = () => {
        localStorage.clear();
        window.location = "/dashboard";
    }

    return <nav className="nav">
        <Link className="site-title" to="/">Scheduler</Link>
        <ul>
            <CustomLink to="/faculties">Faculties</CustomLink>
            <CustomLink to="/teachers">Teachers</CustomLink>
            <CustomLink to="/groups">Groups</CustomLink>
            <CustomLink to="/departments">Departments</CustomLink>
            <CustomLink to="/auditoria">Auditoria</CustomLink>
            <CustomLink to="/classTimes">ClassTimes</CustomLink>
            <CustomLink to="/subjects">Subjects</CustomLink>
            {localStorage.getItem("role") ? <CustomLink to="/dashboard">Dashboard</CustomLink> : ''}
        </ul>
        {/* <Link id="login" to="/login">Login</Link> */}
        {localStorage.getItem("role") ? <button id="login" onClick={handleLogoutClick}>Hello, {localStorage.getItem("role")}</button> : <button id="login" onClick={handleLoginClick}>Login</button>}
    </nav>
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}