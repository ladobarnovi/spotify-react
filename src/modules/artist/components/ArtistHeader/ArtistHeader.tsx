import { IArtist } from "types/artist";
import EntityHeaderWrapper from "components/EntityHeaderWrapper/EntityHeaderWrapper";

interface IProps {
  artist: IArtist;
}

function ArtistHeader({ artist }: IProps) {
  const { name } = artist
  
  return (
    <EntityHeaderWrapper
      image={artist.images[0]}
      title={name}
      isImageRounded={true}
    />
  );
}

export default ArtistHeader;
