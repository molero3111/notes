import NotesNavbar from "./NotesNavbar";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const RootLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            {/* {navigation.state === 'loading' && 
            <Spinner animation="border" role="status" variant="dark">
                <span className="visually-hidden">Loading...</span>
            </Spinner>} */}
            <NotesNavbar navigationState={navigation.state} />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default RootLayout;