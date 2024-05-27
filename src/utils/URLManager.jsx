import { appURL } from "../App";

const getAbsolutePathUrl = (relativePathUrl = "") =>`${appURL}${relativePathUrl}`;

export default getAbsolutePathUrl;