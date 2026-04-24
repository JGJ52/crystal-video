import "./navbar.css";
import Button from "@/app/navbar/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faHome} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <>
            <nav>
                <Button href="/">
                    <FontAwesomeIcon icon={faHome} />
                    Home
                </Button>
                <Button href="/settings">
                    <FontAwesomeIcon icon={faGear} />
                    Settings
                </Button>
            </nav>
        </>
    )
}