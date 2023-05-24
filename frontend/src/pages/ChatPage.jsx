import { Box } from "@chakra-ui/layout";
import SideDrawer from "../components/navbar/Navbar";                // CAMBIA IN NAVBAR
import MyChats from "../components/Chat/MyChats";
import Chatbox from "../components/Chat/Chatbox";

const ChatPage = () => {
    return (
        <div style={{ width: "100%"}}>
        <SideDrawer />
        <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {<MyChats />}
            {<Chatbox />}
        </Box>
    </div>
    )
}

export default ChatPage;

