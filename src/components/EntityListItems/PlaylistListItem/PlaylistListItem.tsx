import styles from "./PlaylistListItem.module.scss";
import EntityImage from "components/Common/EntityImage/EntityImage";
import { IPlaylist } from "types/playlist";
import { IAlbum } from "types/album";
import { useEffect, useState } from "react";
import { IImage } from "types/common";
import { TEntityType } from "types/entityBase";
import { IArtist } from "types/artist";
import { NavLink } from "react-router-dom";

interface IProps {
  data: IPlaylist | IAlbum | IArtist;
}

function PlaylistListItem({ data }: IProps) {
  const [ name, setName ] = useState<string>();
  const [ owner, setOwner ] = useState<string>();
  const [ image, setImage ] = useState<IImage>();
  const [ url, setUrl ] = useState<string>("");
  const [ entityType, setEntityType ] = useState<TEntityType>();

  useEffect(() => {
    setEntityType(data.type);
    setImage(data.images[0]);
    setName(data.name);

    if (entityType === "album") {
      setOwner((data as IAlbum).artists[0].name);
      setUrl(`/album/${data.id}`);
    }
    else if (entityType === "playlist") {
      setOwner(data.owner.display_name);
      setUrl(`/playlist/${data.id}`);
    }
    else if (entityType === "artist") {
      setUrl(`/artist/${data.id}`);
    }
  }, [ data ]);

  const nodeTitle = (<p className={ styles.title }>{ name }</p>);
  const nodeImage = (<EntityImage isRounded={ entityType === "artist" } image={ image } />);
  const nodeOwner = owner == null ? null : (<span className={ styles.owner }> •  { owner }</span>);
  const nodeDivider = (<span> • </span>);
  const nodeSubtitle = (
    <div className={ styles.subTitle } >
      <span className={ styles.entityType } >{ entityType }</span>
      { nodeOwner }
    </div>
  )

  return (
    <NavLink to={url} className={ styles.playlistListItem }>
      <div className={ styles.imageContainer }>
        { nodeImage }
      </div>
      <div className={ styles.infoContainer }>
        { nodeTitle }
        { nodeSubtitle }
      </div>
    </NavLink>
  )
}

export default PlaylistListItem;
