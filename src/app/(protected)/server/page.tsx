import { currentUser } from "@/lib/utils/auth";
import { UserInfo } from "@/components/user-info";

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