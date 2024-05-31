import NotesNavbar from "./NotesNavbar";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const RootLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            <NotesNavbar navigationState={navigation.state} />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default RootLayout;