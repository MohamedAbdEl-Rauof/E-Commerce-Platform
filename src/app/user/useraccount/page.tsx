import UserAccountContent from "./components/UserAccountContent";
import {Box} from "@mui/material";

const Page = () => {
    return (
        <Box style={{maxWidth: 1200, margin: '2rem auto', padding: '0 1rem'}}>
            <UserAccountContent/>
        </Box>
    )
}
export default Page