import { currentUser } from "@/src/utils/auth";
import { UserInfo } from "@/src/components/user-info";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <UserInfo
      label="💻 Server component"
      user={user}
    />
   );
}

export default ServerPage;
