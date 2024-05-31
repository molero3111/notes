import NotesNavbar from "./NotesNavbar";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
    const navigation = useNavigation();
    return (
        <>
            {navigation.state === 'loading' && <p>Loading...</p>}
            <NotesNavbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};
export default RootLayout;