import { IUser } from "types/user";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";

interface IProps {
  user: IUser;
}

export default function UserHeader({ user }: IProps) {
  return (
    <EntityHeaderWrapper
      title={user.display_name}
      type={"Profile"}
      image={user.images[1]}
      isImageRounded={true}
    />
  )
}